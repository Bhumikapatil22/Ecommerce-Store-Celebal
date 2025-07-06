import { useSelector, useDispatch } from 'react-redux'
import { removeItem, updateQuantity, clearCart } from '../features/cart/cartSlice'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const { items } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity, 0
  )

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return
    dispatch(updateQuantity({ id, quantity }))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-gray-600 mb-4">Your cart is empty</h2>
          <Link 
            to="/products"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200">
                {items.map(item => (
                  <div key={item.id} className="p-4 flex">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-20 h-20 object-contain"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        <button 
                          onClick={() => dispatch(removeItem(item.id))}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button 
              onClick={() => dispatch(clearCart())}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Clear Cart
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button className="mt-6 w-full py-3 bg-green-500 text-white font-medium rounded hover:bg-green-600 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage