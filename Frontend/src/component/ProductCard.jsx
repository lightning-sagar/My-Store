import React, { useState, useEffect, useRef } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import usePreviewImg from '../hooks/usePrevImg.jsx';

function ProductCard() {
  const [productDetails, setProductDetails] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
  });
  const [imgUrls, setImgUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);
  const { handleImageChange, imgUrl } = usePreviewImg('');

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (imgUrl) {
      if (imgUrls.length < 5) {
        setImgUrls((prevUrls) => [...prevUrls, imgUrl]);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [imgUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Product details:', productDetails, 'Images:', imgUrls);
    try {
      const res = await fetch('/api/p/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...productDetails, pimage: imgUrls }),
        credentials: 'include',
      });
      const data = await res.json();
      console.log(data);
      window.location.href = '/';
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setImgUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 sm:p-8 space-y-6"
      >
        <h3 className="text-2xl font-semibold text-center text-gray-800">Add New Product</h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={productDetails.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              Product Images (up to 5)
            </label>
            <div className="mt-2 flex items-center space-x-3">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="flex items-center justify-center w-10 h-10 bg-teal-500 text-white rounded-full hover:bg-teal-600"
                disabled={imgUrls.length >= 5}
              >
                <Upload size={20} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-4">
              {Array(5)
                .fill('')
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 animate-pulse rounded-lg"
                  ></div>
                ))}
            </div>
          ) : (
            imgUrls.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-4">
                {imgUrls.map((url, index) => (
                  <div key={url} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price $
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={productDetails.price}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              placeholder="Enter product price"
            />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              name="stock"
              value={productDetails.stock}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              placeholder="Enter available stock"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={productDetails.description}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
            placeholder="Enter product description"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-2 bg-rose-500 text-white font-semibold rounded-md hover:bg-rose-600"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default ProductCard;
