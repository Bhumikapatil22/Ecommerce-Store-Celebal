import { useState } from 'react'
import { useGetAllProductsQuery } from '../services/productsApi'
import ProductList from '../components/product/ProductList'
import LoadingSpinner from '../components/common/LoadingSpinner'
import SearchBar from '../components/common/SearchBar'

const ProductsPage = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery()
  const [searchTerm, setSearchTerm] = useState('')

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>Error loading products</div>

  const filteredProducts = products?.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <ProductList products={filteredProducts} />
    </div>
  )
}

export default ProductsPage