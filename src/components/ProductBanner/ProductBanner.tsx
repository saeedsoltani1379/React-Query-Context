import { useState, useEffect } from "react";
import { ServerTypes } from "../servertypes/serverTypes";
import { Link } from "react-router-dom";
import WellCome from "../WellCome/WellCome";

interface Props {
  products: ServerTypes[];
}

function ProductBanner({ products }: Props) {
  const [index, setIndex] = useState(0);
  const itemsPerSlide = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1 < products.length ? prev + 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, [products.length]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1 < products.length ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 >= 0 ? prev - 1 : products.length - 1));
  };

  return (
    <div>
      <div className="my-12 px-4 bg-gray-900 py-10 rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Featured Products</h2>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevSlide}
            className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600"
          >
            ❮
          </button>

          <div className="flex gap-4 overflow-hidden">
            {products.slice(index, index + itemsPerSlide).map((item) => (
              <Link
                key={item.id}
                to={`/products/productDetail/${item.id}`}
                className="bg-gray-800 rounded-lg p-4 w-64 hover:bg-gray-700 transition-colors duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-contain mb-3 rounded"
                />
                <h3 className="text-base font-semibold text-white truncate">{item.title}</h3>
                <p className="text-gray-300 font-bold">{item.price}$</p>
              </Link>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600"
          >
            ❯
          </button>
        </div>
      </div>
      <WellCome />
    </div>
  );
}

export default ProductBanner;