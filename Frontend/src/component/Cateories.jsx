import React from 'react';

const categories = [
  {
    id: 1,
    title: "All Sarees",
    image: "https://images.meesho.com/images/products/32676853/utqrd_512.webp",
  },
  {
    id: 2,
    title: "Kurta Sets",
    image: "https://images.meesho.com/images/products/357534558/ebqnk_400.webp",
  },
  
];

export default function Categories() {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-playfair text-rose-600 text-center mb-4">
          Shop By Category
        </h1>
        <p className="text-gray-600 text-center mb-8 font-lato text-sm md:text-base">
          Your Way, Every Day: Effortless Shopping, Category Play!
        </p>
        
        <div className="relative">
          <div 
            id="categoryScroll" 
            className="flex overflow-x-auto scroll-smooth overflow-hidden hide-scrollbar gap-6 py-4 justify-start md:justify-center"
          >
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="flex-none w-36 md:w-48 flex flex-col items-center"
              >
                <div className="border-2 border-rose-600 h-[20vh] md:h-[25vh] rounded-full aspect-square flex items-center justify-center p-2 md:p-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-24 h-24 md:w-32 md:h-32 object-contain"
                  />
                </div>
                <h3 className="text-center mt-2 md:mt-4 font-lato text-gray-800 text-sm md:text-base">
                  {category.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
