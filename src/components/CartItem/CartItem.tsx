
import { useQuery } from 'react-query';
import { UseShopingCartContext } from '../context/context';
import { ServerTypes } from '../servertypes/serverTypes';
import { dataProductsById } from '../services/api';

interface CartItemProps {
  id: number;
  qty: number;
}

const CartItem = ({ id, qty }: CartItemProps) => {
  const { handleIncreaseQty, handleDecreaseQty, handleRemoveQty } = UseShopingCartContext();

  const { data, isLoading, isError } = useQuery<ServerTypes>({
    queryKey: ['product', id],
    queryFn: () => dataProductsById(id),
  });

  if (isLoading) {
    return (
      <div className="flex p-4 mb-4 border rounded-lg bg-white">
        <div className="animate-spin w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full mr-4"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-4 mb-4 border rounded-lg bg-red-50 text-red-600">
        <p>Couldn’t load product</p>
      </div>
    );
  }

  return (
    <div className="flex items-center p-4 mb-4 border rounded-lg bg-white">
      <img
        src={data.image}
        alt={data.title}
        className="w-16 h-16 object-cover rounded-md mr-4"
      />
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="text-base font-medium">{data.title}</h3>
        <p className="text-gray-600">${data.price.toFixed(2)}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDecreaseQty(id)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span>{qty}</span>
          <button
            onClick={() => handleIncreaseQty(id)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            aria-label="Increase quantity"
          >
            +
          </button>
          <button
            onClick={() => handleRemoveQty(id)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            aria-label="Remove from cart"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;