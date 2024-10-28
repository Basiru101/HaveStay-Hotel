import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/backend/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleWhatsAppClick = () => {
    if (window.confirm('Do you want to continue with WhatsApp chat?')) {
      const whatsappUrl = `https://wa.me/237673081612?text=Hello, I am interested in ${listing.name}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message
          </Link>

          <button
            onClick={handleWhatsAppClick}
            className='bg-green-500 text-white text-center p-3 flex items-center justify-center gap-2 uppercase rounded-lg hover:opacity-95'
          >
            <img className='w-6' src='/images/whatsapp-icon.webp' alt='WhatsApp Icon' />
            Continue to Chat
          </button>
        </div>
      )}
    </>
  );
}
