import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Contact({ listing }) {
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/backend/user/listings/${currentUser?._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/backend/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="admin-create">
      <h1 className="mt-10 text-xl font-bold m-auto">Manage Admin Listings</h1>
      <Link
        className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
        to={'/create-listing'}
      >
        Create Listing
      </Link>

      <button
        onClick={handleShowListings}
        className="bg-blue-500 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
      >
        Show Listings
      </button>

      <p className="text-red-700 mt-5">
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {/* Display listings if available */}
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col items-center">
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
                <button
                  onClick={() => handleListingDelete(listing._id)} className="text-red-700 uppercase">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
