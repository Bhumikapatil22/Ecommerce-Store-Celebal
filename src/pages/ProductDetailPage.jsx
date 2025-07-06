import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../services/productsApi'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/cart/cartSlice'
const ProductDetailPage = () => {
  const { id } = useParams()
  const { data: product, isLoading, error } = useGetProductByIdQuery(id)
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addItem(product))
  }
  if (isLoading) return <LoadingSpinner />
  if (error) return <div>Error loading product</div>

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2 p-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-gray-600 ml-2">{product.rating.count} reviews</span>
          </div>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
          </div>
          <div className="flex space-x-4">
            <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-green-500 text-white font-medium rounded hover:bg-green-600 transition-colors">
              Add to Cart
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-100 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage