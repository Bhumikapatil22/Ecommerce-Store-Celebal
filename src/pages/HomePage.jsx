import { useGetAllProductsQuery } from '../services/productsApi'
import ProductList from '../components/product/ProductList'
import LoadingSpinner from '../components/common/LoadingSpinner'

const HomePage = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery()

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>Error loading products</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
      <ProductList products={products?.slice(0, 8)} />
    </div>
  )
}

export default HomePage