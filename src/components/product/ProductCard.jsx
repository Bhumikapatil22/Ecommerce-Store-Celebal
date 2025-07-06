import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../features/cart/cartSlice'
import { useState } from 'react'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const [isAdded, setIsAdded] = useState(false)
  const cartItems = useSelector(state => state.cart.items)

  useState(() => {
    const inCart = cartItems.some(item => item.id === product.id)
    if (inCart) setIsAdded(true)
  }, [cartItems, product.id])

  const handleAddToCart = () => {
    dispatch(addItem(product))
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain"
        />
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.title}</h3>
          <p className="text-gray-600 mt-1 line-clamp-2">{product.description}</p>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            <Link
              to={`/products/${product.id}`}
              className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors"
            >
              View Details
            </Link>
            <button
              onClick={handleAddToCart}
              className={`px-3 py-1 text-white text-sm font-medium rounded transition-colors cursor-pointer ${isAdded
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-green-500 hover:bg-green-600'
                }`}
              disabled={isAdded}
            >
              {isAdded ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard