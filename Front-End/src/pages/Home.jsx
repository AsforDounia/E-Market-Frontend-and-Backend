import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import logo from '../assets/images/e-market-logo.jpeg';
import { Alert, Badge, Button, Card, LoadingSpinner, Pagination, StarRating } from '../components/common';

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

  const renderStockIndicator = (product) => {
    const stockQuantity = product.stock || 0;
    
    if (stockQuantity === 0) {
      return <Badge variant="danger" dot>Rupture de stock</Badge>;
    }
    if (stockQuantity > 0 && stockQuantity <= 10) {
      return <Badge variant="warning" dot>Stock limité ({stockQuantity} restants)</Badge>;
    }
    return <Badge variant="success" dot>En stock ({stockQuantity} disponibles)</Badge>;
  };

  const getProductImage = (imageUrls) => {
    if (!imageUrls || imageUrls.length === 0) return logo;
    const primaryImage = imageUrls.find((img) => img.isPrimary);
    const imageUrl = primaryImage ? primaryImage.imageUrl : imageUrls[0].imageUrl;
    return `${baseUrl}${imageUrl}`;
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
          <Alert 
            type="error" 
            message={`Erreur lors du chargement des produits: ${error}`}
          />
        )}

        {loading ? (
          <LoadingSpinner size="lg" text="Chargement des produits..." />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                const isInStock = product.stock > 0;
                const averageRating = product.averageRating || 0;

                return (
                  <Card key={product._id} hover padding="none">
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={getProductImage(product.imageUrls)}
                        alt={product.title}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                        crossOrigin="anonymous"
                      />
                    </Link>

                    <div className="p-5">
                      <Link to={`/product/${product._id}`}>
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
                          {product.title}
                        </h3>
                      </Link>

                      <StarRating rating={averageRating} showValue />

                      <p className="text-sm text-gray-600 mt-2 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-2xl font-bold text-blue-600">
                          {product.price.toFixed(2)}€
                        </span>
                      </div>

                      {renderStockIndicator(product)}

                      <Button
                        fullWidth
                        disabled={!isInStock}
                        variant={isInStock ? 'primary' : 'secondary'}
                        className="mt-3"
                      >
                        {isInStock ? 'Ajouter au panier' : 'Indisponible'}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            {!loading && metadata?.totalPages > 1 && (
              <Pagination
                currentPage={metadata.currentPage}
                totalPages={metadata.totalPages}
                hasNextPage={metadata.hasNextPage}
                hasPreviousPage={metadata.hasPreviousPage}
                onPageChange={setCurrentPage}
                className="mt-10"
              />
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
