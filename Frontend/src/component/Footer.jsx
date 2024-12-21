import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-rose-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-playfair mb-4">About Us</h3>
            <p className="font-lato text-rose-100">
              Discover unique designs and quality fashion at Mytalorzone. Your one-stop destination for all your style needs.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair mb-4">Quick Links</h3>
            <ul className="space-y-2 font-lato">
              <li><a href="#" className="hover:text-rose-200">Home</a></li>
              <li><a href="#" className="hover:text-rose-200">Shop</a></li>
              <li><a href="#" className="hover:text-rose-200">Collections</a></li>
              <li><a href="#" className="hover:text-rose-200">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair mb-4">Customer Service</h3>
            <ul className="space-y-2 font-lato">
              <li><a href="#" className="hover:text-rose-200">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-rose-200">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-rose-200">FAQs</a></li>
              <li><a href="#" className="hover:text-rose-200">Size Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair mb-4">Connect With Us</h3>
            <ul className="space-y-2 font-lato">
              <li><a href="#" className="hover:text-rose-200">Instagram</a></li>
              <li><a href="#" className="hover:text-rose-200">Facebook</a></li>
              <li><a href="#" className="hover:text-rose-200">Twitter</a></li>
              <li><a href="#" className="hover:text-rose-200">Pinterest</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-rose-800 mt-8 pt-8 text-center font-lato">
          <p>&copy; {new Date().getFullYear()} Mytalorzone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}