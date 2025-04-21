import { useParams } from 'react-router-dom';
import { UseShopingCartContext } from '../../components/context/context';
import { ServerTypes } from '../../components/servertypes/serverTypes';
import { dataProductsById } from '../../components/services/api';
import { useQuery } from 'react-query';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { handleIncreaseQty, handleDecreaseQty, showQty } = UseShopingCartContext();
  const productId = Number(id);

  const { data, isLoading, isError } = useQuery<ServerTypes>({
    queryKey: ['product', id],
    queryFn: () => dataProductsById(productId),
  });

  if (isLoading) {
    return (
      <div className="flex p-4">
        <div className="animate-spin w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full mr-4"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-4 text-red-600">
        <p>Couldn’t load product</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 mt-36">
      <div className="flex flex-wrap gap-4">
        <img
          src={data.image}
          alt={data.title}
          className="w-full md:w-80 h-80 object-cover rounded"
        />
        <div className="flex-1 flex flex-col gap-2 space-y-6">
          <h1 className="text-xl font-bold">{data.title}</h1>
          <p className="text-2xl text-green-600">${data.price.toFixed(2)}</p>
          <p className="text-gray-600">{data.details}</p>
          <div className="flex gap-2 mt-4  justify-end">
            {showQty(productId) === 0 ? (
              <button
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-right"
                onClick={() => handleIncreaseQty(productId)}
                aria-label="Add to cart"
              >
                Add to Cart
              </button>
            ) : (
              <>
                <button
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => handleDecreaseQty(productId)}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span>{showQty(productId)}</span>
                <button
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => handleIncreaseQty(productId)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;