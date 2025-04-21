import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import { UseShopingCartContext } from '../../components/context/context';

const Cart = () => {
  const { stateContext } = UseShopingCartContext();

  return (
    <div className="container mx-auto px-4 py-10">
      {stateContext.length === 0 ? (
        <div className="flex flex-col items-center py-10">
          <h2 className="text-xl font-semibold text-gray-600">Your cart is empty</h2>
          <Link
            to="/products"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {stateContext.map((item) => (
            <CartItem key={item.id} {...item}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;