import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LoadingPage from '../component/Loading.jsx';
import ProductGrid from '../component/ProductGrid.jsx';
import useShowToast from '../hooks/showToast';
import { useRecoilState } from 'recoil';
import cartAtom from '../Atom/cartAtom.js';

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams();
  const showToast = useShowToast();
  const [cart, setCart] = useRecoilState(cartAtom);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Scroll to top whenever the product ID changes
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const getProduct = async () => {
      try {
        const res = await fetch(`/api/p/product/${id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",  
          },
          credentials: "include", 
      });
        const data = await res.json();
        console.log('Fetched Product Data:', data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]); // Re-run when `id` changes

  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        showToast('Error', 'Please login to add product to cart', 'error');
        return;
      }

      const res = await fetch(`/api/p/product/${product._id}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({ quantity }),
      });

      const data = await res.json();
      setCart(data);
      showToast('Success', 'Product added to the cart', 'success');
    } catch (error) {
      console.error(error);
      showToast('Error', 'Failed to add product to the cart', 'error');
    }
  };

  if (loading) return <LoadingPage />;

  if (!product || !product.pimage || !Array.isArray(product.pimage) || product.pimage.length === 0) {
    return (
      <div className="text-center text-gray-600">
        <p>Product or images not found.</p>
      </div>
    );
  }

  const { pname, pprice, pbio, pimage } = product;

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative">
          <img
            src={pimage[currentImage]}
            alt={pname}
            className="w-full h-[600px] object-cover rounded-lg"
          />
          <button
            onClick={() => setCurrentImage((prev) => (prev - 1 + pimage.length) % pimage.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronLeft size={24} className="text-rose-800" />
          </button>
          <button
            onClick={() => setCurrentImage((prev) => (prev + 1) % pimage.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronRight size={24} className="text-rose-800" />
          </button>
        </div>

        <div>
          <h1 className="text-4xl font-bold text-rose-800 mb-4">{pname}</h1>
          <p className="text-2xl text-rose-600 mb-6">${pprice}</p>
          <p className="text-gray-600 mb-8">{pbio}</p>

          <div className="mb-6">
            <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 border border-gray-300 rounded-md p-2 text-gray-700"
            />
          </div>

          <button
            className="bg-rose-600 text-white py-2 px-6 rounded-full text-lg font-bold hover:bg-rose-700 transition duration-300"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <ProductGrid />
    </div>
  );
}
