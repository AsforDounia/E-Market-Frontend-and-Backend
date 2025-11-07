import { useState, useEffect } from 'react';
import api from '../services/api';

/**
 * Hook personnalisé pour récupérer des données depuis une API
 * @param {string} endpoint - L'endpoint de l'API à appeler (ex: 'products', 'users/123')
 * @param {object} options - Options de la requête fetch (méthode, headers, body, etc.)
 * @returns {object} - Objet contenant data, loading et error
 */
const useFetch = (endpoint, options = {}) => {
  // État pour stocker les données récupérées
  const [data, setData] = useState(null);
  
  // État pour indiquer le chargement en cours
  const [loading, setLoading] = useState(true);
  
  // État pour gérer les erreurs potentielles
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données
    const fetchData = async () => {
      // On commence le chargement
      setLoading(true);
      setError(null);

      try {
        // Appel à l'API en utilisant le service api
        const response = await api.get(endpoint);
        setData(response.data);
        
      } catch (err) {
        // Gestion des erreurs
        setError(err.message || 'Une erreur est survenue');
        console.error('Erreur lors du fetch:', err);
        
      } finally {
        // Dans tous les cas, on arrête le chargement
        setLoading(false);
      }
    };

    // Ne fetch que si l'endpoint est fourni
    if (endpoint) {
      fetchData();
    }
  }, [endpoint]); // On refetch si l'endpoint change

  // On retourne un objet avec les trois états
  return { data, loading, error };
};

export default useFetch;