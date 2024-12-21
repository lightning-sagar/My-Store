import React from 'react';

export default function Testimonials() {
  const testimonials = [
    { id: 1, name: "Priya S.", comment: "I love the unique designs from Mytalorzone. The quality is amazing!" },
    { id: 2, name: "Anita R.", comment: "The traditional wear collection is simply stunning. I always get compliments when I wear their outfits." },
    { id: 3, name: "Meera K.", comment: "Great variety of western and fusion wear. Perfect for all occasions!" },
  ];

  return (
    <div className="bg-rose-100 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-rose-800 mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
              <p className="text-rose-800 font-semibold">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

