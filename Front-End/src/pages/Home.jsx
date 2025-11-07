import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import logo from '../assets/images/e-market-logo.jpeg';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data = {}, loading, error } = useFetch(`products?page=${currentPage}`);
  const [products, setProducts] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL.replace('/api/v2', '');

  useEffect(() => {
    if (data?.data?.products) {
      setProducts(data.data.products);
    }
  }, [data]);

  const metadata = data?.metadata || {};

  const renderStars = (rating) => (
    <div className="flex gap-1 text-amber-500">
      {[...Array(5)].map((_, index) => (
        <span key={index}>{index < rating ? '★' : '☆'}</span>
      ))}
    </div>
  );

  const renderStockIndicator = (product) => {
    const stockQuantity = product.stock || 0;
    if (stockQuantity === 0) {
      return (
        <div className="inline-flex items-center gap-2 text-sm font-medium text-red-500">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          Rupture de stock
        </div>
      );
    }
    if (stockQuantity > 0 && stockQuantity <= 10) {
      return (
        <div className="inline-flex items-center gap-2 text-sm font-medium text-amber-500">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          Stock limité ({stockQuantity} restants)
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-2 text-sm font-medium text-green-500">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        En stock ({stockQuantity} disponibles)
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section ... */}

      {/* Products Section */}
      <section className="container mx-auto px-5 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
          🔥 Produits populaires
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>Erreur lors du chargement des produits: {error}</p>
          </div>
        )}

        {loading ? (
          // Skeleton loader...
          <div>Chargement...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                const isInStock = product.stock > 0;
                const averageRating = product.averageRating || 0;

                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={
                          product.imageUrls.length > 0
                            ? `${baseUrl}${product.imageUrls[0]}`
                            : logo
                        }
                        alt={product.title}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                    </Link>

                    <div className="p-5">
                      <Link to={`/product/${product._id}`}>
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
                          {product.title}
                        </h3>
                      </Link>

                      {renderStars(Math.round(averageRating))}

                      <p className="text-sm text-gray-600 mt-2 mb-3">
                        {product.description}
                      </p>

                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-2xl font-bold text-blue-600">
                          {product.price.toFixed(2)}€
                        </span>
                      </div>

                      {renderStockIndicator(product)}

                      <button
                        disabled={!isInStock}
                        className={`w-full mt-3 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                          isInStock
                            ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:-translate-y-0.5 hover:shadow-md'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isInStock ? 'Ajouter au panier' : 'Indisponible'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {!loading && metadata?.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={!metadata.hasPreviousPage}
                  className={`px-5 py-2 rounded-lg font-medium transition-all ${
                    metadata.hasPreviousPage
                      ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  ← Précédent
                </button>

                <span className="text-gray-700 font-medium">
                  Page {metadata.currentPage} / {metadata.totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, metadata.totalPages)
                    )
                  }
                  disabled={!metadata.hasNextPage}
                  className={`px-5 py-2 rounded-lg font-medium transition-all ${
                    metadata.hasNextPage
                      ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Suivant →
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Features + Newsletter */}
    </div>
  );
};

export default Home;
