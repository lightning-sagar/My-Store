import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import productAtom from '../Atom/productAtom.js';
import Loading from "../component/Loading.jsx";

export default function ProductGrid() {
  const [products, setProducts] = useRecoilState(productAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch('/api/p/product', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [setProducts]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-rose-800 mb-8 sm:mb-12">
        Our Latest Collection
      </h2>
      {!loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105">
                <img
                  src={product.pimage[1]}
                  alt={product.pname}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-rose-800 truncate">
                    {product.pname}
                  </h3>
                  <p className="text-sm sm:text-base text-rose-600 mt-2">
                    ${product.pprice.toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
