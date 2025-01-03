import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [bookingDate, setBookingDate] = useState(''); // State for booking date
  const [bookingTime, setBookingTime] = useState(''); // State for booking time
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/backend/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, bookingDate, bookingTime }), // Include booking date and time
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className='p-20 max-w-2xl mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg outline-none'
          id='email'
          onChange={handleChange}
        />
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            className='border p-3 rounded-lg outline-none w-full'
            id='password'
            onChange={handleChange}
          />
          <button
            type='button'
            className='absolute right-3 top-3 text-gray-600'
            onClick={togglePasswordVisibility}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        
        {/* Date Input */}
        {/* <input
          type='date'
          className='border p-3 rounded-lg outline-none'
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
        /> */}
        
        {/* Time Input */}
        {/* <input
          type='time'
          className='border p-3 rounded-lg outline-none'
          value={bookingTime}
          onChange={(e) => setBookingTime(e.target.value)}
        /> */}

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
