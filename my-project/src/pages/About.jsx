import React from 'react';

export default function About() {
  return (
    <section className="bg-white text-slate-700 p-6 md:p-12">
      <div className="max-w-4xl mx-auto grid gap-6 pt-10">
        
        {/* About HavenStay Box */}
        <div className="shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-slate-900 animate-fade-in-up">
            About HavenStay
          </h1>
          <p className="leading-relaxed">
            Welcome to <span className="font-semibold">HavenStay</span>, your ultimate partner in finding the perfect accommodation for every journey. 
            At HavenStay, we understand that where you stay is just as important as where you go. 
            That's why we offer an extensive selection of accommodations, ranging from luxurious hotels and charming bed-and-breakfasts to budget-friendly 
            options and exclusive property rentals. Our platform also includes unique offers and opportunities for property sales, making HavenStay your 
            one-stop destination for all your lodging needs.
          </p>
        </div>

        {/* Our Mission Box */}
        <div className="shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900 animate-fade-in-up delay-100">
            Our Mission
          </h2>
          <p className="leading-relaxed">
            At HavenStay, our mission is to transform the way you experience travel by providing a seamless and stress-free booking process. 
            We believe that finding the right place to stay should be an enjoyable part of your travel planning, not a chore. Our intuitive platform 
            is designed to guide you effortlessly through a diverse range of options, ensuring that you find an accommodation that perfectly matches your 
            preferences, lifestyle, and budget.
          </p>
        </div>

        {/* Why Choose HavenStay Box */}
        <div className="shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900 animate-fade-in-up delay-200">
            Why Choose HavenStay?
          </h2>
          <ul className="list-disc pl-5 leading-relaxed">
            <li><strong>Comprehensive Selection:</strong> Whether you're looking for a short-term rental, a long-term stay, or a permanent home, HavenStay offers a broad spectrum of choices. From the moment you begin your search, our platform provides detailed information, high-quality images, and honest reviews to help you make informed decisions.</li>
            <li><strong>Tailored Experience:</strong> We understand that every traveler is unique. That’s why HavenStay offers personalized recommendations based on your specific needs, whether you’re traveling for business, leisure, or any other purpose. Our advanced search filters and curated lists make it easy to find accommodations that suit your requirements.</li>
            <li><strong>Exclusive Offers:</strong> Take advantage of our special deals and exclusive offers. HavenStay collaborates with trusted partners to bring you discounts and packages that add value to your stay, ensuring you get the best experience at the best price.</li>
            <li><strong>Reliable Customer Support:</strong> Our commitment to you doesn’t end once you’ve made a booking. HavenStay’s dedicated customer support team is available to assist you every step of the way, from the moment you start your search until you’ve checked out and beyond. We’re here to ensure your experience is smooth, secure, and satisfying.</li>
          </ul>
        </div>

        {/* Beyond a Place to Stay Box */}
        <div className="shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900 animate-fade-in-up delay-300">
            Beyond a Place to Stay
          </h2>
          <p className="leading-relaxed">
            At HavenStay, we believe the that your accommodation should be more than just a place to rest your head. It should be a haven that enhances your travel experience, offering comfort, security, and a sense of belonging. Whether you’re seeking a temporary retreat or a permanent residence, HavenStay connects you with properties that feel like home, no matter where you are.
          </p>
        </div>

        {/* Join the HavenStay Community Box */}
        <div className="shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900 animate-fade-in-up delay-400">
            Join the HavenStay Community
          </h2>
          <p className="leading-relaxed">
            Thousands of travelers and homeowners trust HavenStay for their accommodation needs. Join our community today and discover a world of possibilities. 
            With HavenStay, you can explore, book, and enjoy your stay with confidence, knowing that you’re backed by a team that truly cares about your experience.
          </p>
        </div>

        {/* Discover Your Next Stay Box */}
        <div className="shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900 animate-fade-in-up delay-500">
            Discover Your Next Stay
          </h2>
          <p className="leading-relaxed">
            Begin your journey with HavenStay today. Whether you’re planning a weekend getaway, a business trip, or searching for your forever home, 
            we’re here to help you find the perfect place. With HavenStay, your ideal stay is just a few clicks away.
          </p>
        </div>
      </div>
    </section>
  );
}
