import { Link } from 'react-router-dom'
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
          
            <Link to="/" className="flex items-center">
              <span className="font-semibold text-gray-500 text-lg">FakeStore</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Home</Link>
              <Link to="/products" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Products</Link>
              <Link to="/cart" className="py-4 px-2 flex items-center text-gray-500 font-semibold hover:text-green-500 transition duration-300">
                <ShoppingCartIcon className="h-5 w-5 mr-1" />
                Cart
              </Link>
            </div>


            <div className="md:hidden flex items-center">
              <Link to="/cart" className="mr-4 flex items-center text-gray-500 hover:text-green-500">
                <ShoppingCartIcon className="h-6 w-6" />
              </Link>
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-green-500 focus:outline-none"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>


        <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="font-semibold text-gray-500 text-lg">FakeStore</Link>
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-green-500 focus:outline-none"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to="/"
              className="text-gray-500 font-semibold hover:text-green-500 transition duration-300"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-500 font-semibold hover:text-green-500 transition duration-300"
              onClick={toggleMenu}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="text-gray-500 font-semibold hover:text-green-500 transition duration-300 flex items-center"
              onClick={toggleMenu}
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Cart
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar