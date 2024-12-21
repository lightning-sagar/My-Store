import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import userAtom from '../Atom/userAtom.js';

const Dashboard = () => {
  const user = useRecoilValue(userAtom);

  const [cartData, setCartData] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/p/cart', {
          method: "GET",
          headers: {
              "Content-Type": "application/json",  
          },
          credentials: "include", 
      });
        const data = await res.json();
        setCartData(data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
      setLoading(false);
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (cartData) {
        setLoading(true);
        try {
          const details = await Promise.all(
            cartData.items.map(async (item) => {
              const res = await fetch(`/api/p/product/${item.product}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",  
                },
                credentials: "include", 
            });
              const productData = await res.json();
              return { ...item, ...productData };
            })
          );
          setProductDetails(details);
        } catch (error) {
          console.error("Failed to fetch product details:", error);
        }
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [cartData]);

  const calculateTotalPrice = () =>
    productDetails.reduce((total, item) => total + item.pprice * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <img
                src={user.pimage ||"data:image/png;base64,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"}
                alt={`${user.fname} ${user.lname}`}
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h2 className="text-2xl font-playfair text-rose-800">
                {user.fname} {user.lname}
              </h2>
              <p className="text-gray-600 font-lato">@{user.username}</p>
            </div>
            <div className="mt-6 space-y-4">
              <UserInfoItem icon={<Mail className="w-5 h-5" />} label="Email" value={user.email} />
              <UserInfoItem icon={<Phone className="w-5 h-5" />} label="Phone" value={user.phone} />
              {user.address&&(
                <UserInfoItem
                icon={<MapPin className="w-5 h-5" />}
                label="Address"
                value={`${user.address} ${user.city} ${user.country} ${user.pincode}`}
              />
              )
              }
              
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-playfair text-rose-800 mb-4">Shopping Cart</h3>
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin h-8 w-8 border-4 border-gray-400 border-t-transparent rounded-full"></div>
              </div>
            ) : productDetails.length > 0 ? (
              <>
                <ul className="divide-y divide-gray-200">
                  {productDetails.map((item, index) => (
                    <li key={index} className="py-4 flex justify-between items-center">
                      <div className="flex">
                        <img
                          src={item.pimage[0]}
                          alt={item.pname}
                          className="w-12 h-12 rounded-md object-cover mr-4"
                        />
                        <div>
                          <p className="font-lato text-gray-800">{item.pname}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-lato text-rose-600">
                        ${(item.pprice * item.quantity).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-right">
                  <p className="font-playfair text-lg text-rose-800">
                    Total: ${calculateTotalPrice().toFixed(2)}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-600 font-lato">Your cart is empty</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserInfoItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    {icon}
    <div className="ml-2">
      <p className="text-sm text-gray-600 font-lato">{label}</p>
      <p className="font-lato">{value}</p>
    </div>
  </div>
);

export default Dashboard;
