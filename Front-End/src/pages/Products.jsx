import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import logo from '../assets/images/e-market-logo.jpeg';
import { Alert, Badge, Button, Card, LoadingSpinner, Pagination, StarRating } from '../components/common';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

  // ✅ Get category from URL query param
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') || '';

  // ✅ Build API URL dynamically
  const apiUrl = category
    ? `products?page=${currentPage}&category=${category}`
    : `products?page=${currentPage}`;

  const { data = {}, loading, error } = useFetch(apiUrl);
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

  // ✅ Add to Cart logic (simple placeholder, can be connected to context or API)
  const handleAddToCart = (product) => {
    console.log('Added to cart:', product.title);
    // Example: cartContext.addItem(product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section (Optional, can add banner or category title) */}
      {category && (
        <div className="bg-white shadow-md py-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Produits de la catégorie : <span className="text-blue-600">{category}</span>
          </h1>
        </div>
      )}

      {/* Products Section */}
      <section className="container mx-auto px-5 py-16">
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
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => {
                  const isInStock = product.stock > 0;
                  const averageRating = product.averageRating || 0;

                  return (
                    <Card key={product._id} hover padding="none">
                      <Link to={`/product/${product.slug}`}>
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
                          onClick={() => handleAddToCart(product)}
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
            ) : (
              <p className="text-center text-gray-600 mt-10">
                Aucun produit trouvé dans cette catégorie.
              </p>
            )}

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

export default Products;
