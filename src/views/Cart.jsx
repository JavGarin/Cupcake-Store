import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, updateCartQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (!cartItems.length) return <p>Tu carrito está vacío.</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tu Carrito</h2>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.cupcake_id}
            className="bg-white shadow p-4 rounded flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">${item.price} c/u</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    updateCartQuantity(item.cupcake_id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className="bg-gray-200 px-2 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateCartQuantity(item.cupcake_id, item.quantity + 1)
                  }
                  className="bg-gray-200 px-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.cupcake_id)}
              className="text-red-500 hover:underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="text-right mt-4 text-xl font-semibold">
        Total: ${total}
      </div>
    </div>
  );
};

export default Cart;
