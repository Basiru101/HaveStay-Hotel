import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const urlParams = new URLSearchParams(location.search);

      try {
        const res = await fetch(`/backend/listing/get?${urlParams.toString()}`);
        const data = await res.json();

        console.log('Fetched data:', data); // Log the fetched data to inspect the format

        if (Array.isArray(data)) {
          setListings(data);
          setShowMore(data.length > 8);
        } else {
          console.error('Unexpected data format:', data);
          setListings([]); // Set listings to an empty array if the format is unexpected
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    setSidebardata((prevData) => ({
      ...prevData,
      [id]: id === 'sort_order' ? value.split('_')[0] : checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    Object.entries(sidebardata).forEach(([key, value]) => urlParams.set(key, value));
    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', numberOfListings);
    const res = await fetch(`/backend/listing/get?${urlParams.toString()}`);
    const data = await res.json();

    if (Array.isArray(data) && data.length < 9) {
      setShowMore(false);
    }
    setListings((prevListings) => [...prevListings, ...data]);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          {/* Search Term Input */}
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          {/* Type Filters */}
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            {['all', 'rent', 'sale'].map((type) => (
              <div className='flex gap-2' key={type}>
                <input
                  type='checkbox'
                  id={type}
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata.type === type}
                />
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </div>
            ))}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          {/* Amenities Filters */}
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            {['parking', 'furnished'].map((amenity) => (
              <div className='flex gap-2' key={amenity}>
                <input
                  type='checkbox'
                  id={amenity}
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata[amenity]}
                />
                <span>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>
              </div>
            ))}
          </div>

          {/* Sort Options */}
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>

          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>

      {/* Listing Results */}
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && <p className='text-xl text-slate-700'>No listing found!</p>}
          {loading && <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>}
          {!loading &&
            listings.map((listing) => <ListingItem key={listing._id} listing={listing} />)}
          {showMore && (
            <button onClick={onShowMoreClick} className='text-green-700 hover:underline p-7 text-center w-full'>
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
