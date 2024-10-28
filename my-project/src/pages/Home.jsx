import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import L from "leaflet"; // Import Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Import React Leaflet components
import "leaflet/dist/leaflet.css"; // Ensure Leaflet CSS is imported
import "../index.css"; // Ensure this line is added if not already present
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation, Autoplay]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/backend/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/backend/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/backend/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  // Example coordinates for HavenStay
  const position = [4.0511, 9.7679]; // Douala coordinates

  return (
    <div>
      {/* Top Section */}
      <div className="flex flex-col gap-10 p-40 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl animate-type">
          Discover Your <span className="text-blue-500">Perfect Stay</span>
          <br />
          with <span className="text-blue-600">HavenStay</span>
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm animate-fadeInUp">
          HavenStay is your gateway to finding the perfect place to stay, be it
          a hotel, an apartment, or a unique local stay.
          <br />
          We provide a vast array of properties tailored to meet your individual
          needs and preferences.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline animate-fadeInUp"
        >
          Start your journey...
        </Link>
      </div>

      {/* Swiper Section */}
      <Swiper navigation autoplay={{ delay: 3000, disableOnInteraction: false }}>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px] rounded-lg shadow-lg transition-transform transform hover:scale-105"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Flex Container for Map and Hotel Info */}
      <div className="flex flex-col md:flex-row justify-between p-5">
        {/* Map Section */}
        <MapContainer center={position} zoom={12} style={{ height: "400px", width: "100%", flex: "1" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>HavenStay - Discover the best stays in Cameroon!</Popup>
          </Marker>
        </MapContainer>

        {/* Hotel Information Section */}
        <div className="flex flex-col justify-center p-5">
          <h2 className="text-2xl font-semibold text-slate-600">HavenStay Hotel</h2>
          <p className="text-gray-500">HavenStay hotel in Douala, Cameroon Littoral, BP 3644, Cameroon</p>
          <p className="text-gray-500">T+237 21330278</p>
          <p className="text-gray-500">T+237 650241933</p>
          <p className="text-gray-500">E: reservasions@havenstaydouala.com</p>
        </div>
      </div>

      {/* Recent Rentals Section */}
      {rentListings && rentListings.length > 0 && (
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-600">Recent Rentals</h2>
            <Link className="text-sm text-blue-800 hover:underline" to={"/search?type=rent"}>
              Show more rentals
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {rentListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}

       {/* listing results for offer, sale and rent */}

       <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
