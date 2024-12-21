import React, { useEffect, useState } from 'react';
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { useRecoilState } from 'recoil';
import cartAtom from '../Atom/cartAtom.js';

function Cart() {
  const [showIcons, setShowIcons] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartData, setCartData] = useRecoilState(cartAtom)
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const getCartItem = async () => {
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
    getCartItem();
  }, []);

  useEffect(() => {
    const getProductDetails = async () => {
      if (cartData && Array.isArray(cartData.items)) {
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
          console.log("Failed to fetch product details:", error);
        }
        setLoading(false);
      }
    };
    getProductDetails();
  }, [cartData]);

  const toggleCart = () => {
    setShowCart((prev) => !prev);
    if (showChat) {
      setShowChat(false);
    }
  };



  const handleQuantityChange = (productId, quantity) => {
    const updatedDetails = productDetails.map((item) => {
      if (item.product === productId) {
        return { ...item, quantity: Number(quantity) };
      }
      return item;
    });
    setProductDetails(updatedDetails);
  };

  const handleDeleteProduct = (productId) => {
    const updatedDetails = productDetails.filter((item) => item.product !== productId);
    setProductDetails(updatedDetails);

    const deleteP = async () => {
      try {
        await fetch(`/api/p/${productId}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",  
          },
          credentials: "include", 
      });
      } catch (error) {
        console.log(error);
      }
    };
    deleteP();
  };

  const calculateTotalPrice = () => productDetails.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col items-center fixed bottom-10 left-10 z-[1000]">
      <div className="flex flex-col mb-4">
        <button
          className="p-4 mb-2 rounded-full text-2xl bg-rose-200 hover:bg-gray-400"
          onClick={toggleCart}
        >
          <AiOutlineShoppingCart />
        </button>
      </div>
      {showCart && (
        <div className="fixed bottom-16 right-4 w-full max-w-xs p-4 bg-white shadow-lg rounded-md overflow-y-auto max-h-[calc(100vh-150px)]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">Cart Details</h2>
            <button onClick={toggleCart} className="text-rose-500 hover:text-rose-800">
              <AiOutlineClose />
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin h-8 w-8 border-4 border-gray-400 border-t-transparent rounded-full"></div>
            </div>
          ) : productDetails.length > 0 ? (
            <>
              {productDetails.map((item, index) => (
                <div key={index} className="mb-4 p-3 border rounded-md">
                  <div className="flex justify-between items-center">
                    {/* Safeguard for missing images */}
                    <img 
                      src={item.pimage && item.pimage.length > 0 ? item.pimage[0] : 'default-image-url.jpg'} 
                      alt={item.pname} 
                      className="w-12 h-12 object-cover" 
                    />
                    <button onClick={() => handleDeleteProduct(item.product)} className="text-gray-500 hover:text-gray-800">
                      <AiOutlineClose />
                    </button>
                  </div>
                  <h3 className="font-bold mt-2">{item.pname}</h3>
                  <p>Price: ${item.pprice}</p>
                  <div className="flex items-center mt-2">
                    <span>Quantity:</span>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      max={item.pstock}
                      onChange={(e) => handleQuantityChange(item.product, e.target.value)}
                      className="w-16 ml-2 p-1 border rounded-md"
                    />
                  </div>
                  <p className="mt-2">Total: ${item.pprice * item.quantity}</p>
                </div>
              ))}
              <div className="fixed bottom-16 w-full max-w-xs p-4 bg-white rounded-md">
                <div className="flex items-center">
                  <span className="font-bold">Total Price: ${calculateTotalPrice()}</span>
                  <button className="bg-rose-500 ml-5 text-white px-4 py-1 rounded-md hover:bg-rose-600" onClick={() => alert('Proceeding to buy')}>
                    Buy
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p>No items in cart</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
