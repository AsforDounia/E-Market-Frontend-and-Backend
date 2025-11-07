# 📋 Guide de Développement Frontend E-Market - Sprint 3

## 🎯 Vue d'ensemble du projet

Ce guide vous accompagne étape par étape dans la création d'une interface utilisateur moderne pour E-Market avec React + Vite, connectée à l'API backend développée au Sprint 2.

---

## 📅 Planning du Sprint

### Phase 1 : Conception (Jour 1-2)
### Phase 2 : Configuration & Setup (Jour 2-3)
### Phase 3 : Authentification (Jour 3-5)
### Phase 4 : Produits (Jour 5-7)
### Phase 5 : Amélioration & Tests (Jour 8-10)

---

## 🎨 PHASE 1 : CONCEPTION UI/UX (Design)

### Étape 1.1 : Créer le compte Figma
- [ ] Créer un compte sur [Figma](https://www.figma.com/)
- [ ] Installer le plugin Figma Desktop (optionnel)

### Étape 1.2 : Analyser les besoins
- [ ] Lister toutes les pages nécessaires :
  - Page d'accueil (liste produits)
  - Page détail produit
  - Page login
  - Page register
  - Page 404 (bonus)
- [ ] Définir la palette de couleurs
- [ ] Choisir la typographie

### Étape 1.3 : Créer les maquettes
- [ ] Créer un nouveau projet Figma "E-Market Frontend"
- [ ] Définir les frames (Desktop : 1440px, Tablet : 768px, Mobile : 375px)
- [ ] Concevoir les composants réutilisables :
  - Header (avec menu navigation)
  - Footer
  - Card produit
  - Bouton primaire/secondaire
  - Formulaire login/register
  - Loader
  - Message d'erreur/succès

### Étape 1.4 : Maquettes des pages

#### Page d'accueil (Home)
- [ ] Header avec logo + navigation (Home, Products, Login/Logout)
- [ ] Section hero (optionnel)
- [ ] Grille de produits (cards)
- [ ] Footer

#### Page Détail Produit
- [ ] Breadcrumb (Home > Products > Product Name)
- [ ] Image produit principale
- [ ] Galerie d'images (miniatures)
- [ ] Informations produit (nom, prix, description, stock)
- [ ] Bouton "Ajouter au panier" (désactivé pour ce brief)

#### Page Login
- [ ] Formulaire centré
- [ ] Champs : Email, Password
- [ ] Bouton "Se connecter"
- [ ] Lien vers Register
- [ ] Message d'erreur

#### Page Register
- [ ] Formulaire centré
- [ ] Champs : Nom, Email, Password, Confirm Password
- [ ] Bouton "S'inscrire"
- [ ] Lien vers Login

### Étape 1.5 : Validation du design
- [ ] Partager le lien Figma avec le formateur/équipe
- [ ] Exporter un PDF du design
- [ ] Préparer les assets (logo, icônes)

---

## ⚙️ PHASE 2 : CONFIGURATION & SETUP

### Étape 2.1 : Initialisation du projet React

```bash
# Se placer dans le dossier Front-End
cd Front-End

# Créer le projet avec Vite
npm create vite@latest . -- --template react

# Installer les dépendances
npm install
```

### Étape 2.2 : Installer les dépendances principales

```bash
# Routing
npm install react-router-dom

# HTTP Client
npm install axios

# Styling (choisir une option)
npm install tailwindcss @tailwindcss/vite


# Formulaires & Validation
npm install react-hook-form yup @hookform/resolvers

# Notifications
npm install react-toastify

# Utilitaires
npm install classnames
```

### Étape 2.3 : Configuration TailwindCSS (si choisi)

```bash
# Initialiser Tailwind
npx tailwindcss init -p
```

Modifier `tailwind.config.js` :
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Ajouter dans `src/index.css` :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Étape 2.4 : Structure du projet

```
src/
├── assets/              # Images, fonts, icons
├── components/          # Composants réutilisables
│   ├── common/          # Composants génériques
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Loader.jsx
│   │   └── ErrorMessage.jsx
│   ├── layout/          # Layout components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   └── products/        # Composants produits
│       ├── ProductCard.jsx
│       └── ProductDetail.jsx
├── pages/               # Pages principales
│   ├── Home.jsx
│   ├── ProductDetails.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── NotFound.jsx
├── context/             # Context API
│   └── AuthContext.jsx
├── services/            # API calls
│   ├── api.js           # Configuration Axios
│   ├── authService.js
│   └── productService.js
├── hooks/               # Custom hooks
│   └── useAuth.js
├── utils/               # Fonctions utilitaires
│   └── helpers.js
├── App.jsx
├── main.jsx
└── index.css
```

Créer la structure :
```bash
# Créer les dossiers
New-Item -ItemType Directory -Path "src/components/common", "src/components/layout", "src/components/products", "src/pages", "src/context", "src/services", "src/hooks", "src/utils", "src/assets" -Force
```

### Étape 2.5 : Configuration de l'environnement

Créer `.env` à la racine du Front-End :
```env
VITE_API_URL=http://localhost:5000/api/v2
```

Créer `.env.example` :
```env
VITE_API_URL=http://localhost:5000/api/v2
```

### Étape 2.6 : Configuration Axios

Créer `src/services/api.js` :
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Étape 2.7 : Git Setup

```bash
# Initialiser Git (si pas déjà fait)
git init

# Créer .gitignore
@"
node_modules
dist
.env
.DS_Store
coverage
*.log
"@ | Out-File -FilePath .gitignore -Encoding utf8

# Premier commit
git add .
git commit -m "Initial frontend setup with Vite + React"
```

---

## 🔐 PHASE 3 : AUTHENTIFICATION

### Étape 3.1 : Créer le AuthContext

Créer `src/context/AuthContext.jsx` :
```javascript
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si un utilisateur est connecté au chargement
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Connexion réussie !');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur de connexion');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      toast.success('Inscription réussie ! Vous pouvez vous connecter.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de l'inscription");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.info('Déconnexion réussie');
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

### Étape 3.2 : Créer le hook useAuth

Créer `src/hooks/useAuth.js` :
```javascript
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  
  return context;
};
```

### Étape 3.3 : Créer le service d'authentification

Créer `src/services/authService.js` :
```javascript
import api from './api';

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const logout = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    await api.post('/auth/logout', { token });
  }
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
```

### Étape 3.4 : Créer la page Login

Créer `src/pages/Login.jsx` :
```javascript
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().min(6, 'Minimum 6 caractères').required('Mot de passe requis'),
});

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                {...register('email')}
                type="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input
                {...register('password')}
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>

          <div className="text-center">
            <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
              Pas encore de compte ? S'inscrire
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
```

### Étape 3.5 : Créer la page Register

Créer `src/pages/Register.jsx` :
```javascript
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Nom requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().min(6, 'Minimum 6 caractères').required('Mot de passe requis'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('Confirmation requise'),
});

const Register = () => {
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...userData } = data;
      await registerUser(userData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Inscription
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <label htmlFor="name" className="sr-only">Nom</label>
              <input
                {...register('name')}
                type="text"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nom complet"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                {...register('email')}
                type="email"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input
                {...register('password')}
                type="password"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirmer mot de passe</label>
              <input
                {...register('confirmPassword')}
                type="password"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmer le mot de passe"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Inscription...' : "S'inscrire"}
            </button>
          </div>

          <div className="text-center">
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              Déjà un compte ? Se connecter
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
```

### Étape 3.6 : Créer le composant ProtectedRoute

Créer `src/components/common/ProtectedRoute.jsx` :
```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

---

## 🛍️ PHASE 4 : GESTION DES PRODUITS

### Étape 4.1 : Créer le service produits

Créer `src/services/productService.js` :
```javascript
import api from './api';

export const getAllProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await api.get('/products/search', { params: { q: query } });
  return response.data;
};
```

### Étape 4.2 : Créer le composant ProductCard

Créer `src/components/products/ProductCard.jsx` :
```javascript
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link 
      to={`/products/${product._id}`}
      className="group"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <img
            src={product.images?.[0] || '/placeholder.jpg'}
            alt={product.name}
            className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xl font-bold text-indigo-600">
              {product.price} DH
            </p>
            <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? 'En stock' : 'Rupture'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
```

### Étape 4.3 : Créer la page Home (liste produits)

Créer `src/pages/Home.jsx` :
```javascript
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ProductCard from '../components/products/ProductCard';
import Loader from '../components/common/Loader';
import * as productService from '../services/productService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data.products || data);
    } catch (err) {
      setError(err.message);
      toast.error('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchProducts}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Nos Produits
      </h1>
      
      {products.length === 0 ? (
        <p className="text-center text-gray-500">Aucun produit disponible</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
```

### Étape 4.4 : Créer la page ProductDetails

Créer `src/pages/ProductDetails.jsx` :
```javascript
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';
import * as productService from '../services/productService';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productService.getProductById(id);
      setProduct(data.product || data);
    } catch (err) {
      toast.error('Produit introuvable');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <a href="/" className="text-indigo-600 hover:text-indigo-800">Accueil</a>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <span className="text-gray-500">Produits</span>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <span className="text-gray-700">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="aspect-w-1 aspect-h-1 w-full mb-4">
            <img
              src={product.images?.[selectedImage] || '/placeholder.jpg'}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded ${
                    selectedImage === index ? 'border-indigo-600' : 'border-gray-300'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-20 object-cover rounded" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informations */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          
          <p className="text-3xl font-bold text-indigo-600 mb-4">
            {product.price} DH
          </p>

          <div className="mb-4">
            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
              product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.category && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500">Catégorie</h3>
              <p className="text-gray-900">{product.category.name}</p>
            </div>
          )}

          <button
            disabled={product.stock === 0}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {product.stock > 0 ? 'Ajouter au panier' : 'Indisponible'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
```

---

## 🎨 PHASE 5 : COMPOSANTS LAYOUT

### Étape 5.1 : Créer le Header

Créer `src/components/layout/Header.jsx` :
```javascript
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              E-Market
            </Link>
            <div className="ml-10 flex space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Accueil
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700">
                  Bonjour, {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
```

### Étape 5.2 : Créer le Footer

Créer `src/components/layout/Footer.jsx` :
```javascript
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">E-Market</h3>
            <p className="text-gray-400">
              Votre marketplace en ligne pour tous vos besoins.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Accueil</a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">À propos</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">Email: contact@emarket.com</p>
            <p className="text-gray-400">Tel: +212 XXX-XXXX</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2025 E-Market. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

### Étape 5.3 : Créer le Layout

Créer `src/components/layout/Layout.jsx` :
```javascript
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
```

---

## 🧩 PHASE 6 : COMPOSANTS COMMUNS

### Étape 6.1 : Créer le composant Loader

Créer `src/components/common/Loader.jsx` :
```javascript
const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );
};

export default Loader;
```

### Étape 6.2 : Créer la page 404

Créer `src/pages/NotFound.jsx` :
```javascript
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          Page non trouvée
        </h2>
        <p className="mt-2 text-gray-600">
          La page que vous recherchez n'existe pas.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
```

---

## 🔗 PHASE 7 : CONFIGURATION DU ROUTING

### Étape 7.1 : Configurer App.jsx

Modifier `src/App.jsx` :
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
```

---

## 🧪 PHASE 8 : TESTS & VALIDATION

### Étape 8.1 : Tester l'authentification
- [ ] S'inscrire avec un nouveau compte
- [ ] Se connecter avec le compte créé
- [ ] Vérifier que le token est stocké dans localStorage
- [ ] Se déconnecter et vérifier la suppression du token

### Étape 8.2 : Tester les produits
- [ ] Afficher la liste des produits
- [ ] Cliquer sur un produit pour voir les détails
- [ ] Vérifier la navigation entre les pages
- [ ] Tester avec des produits en stock et en rupture

### Étape 8.3 : Tester la navigation
- [ ] Tester tous les liens du Header
- [ ] Tester les liens du Footer
- [ ] Tester la page 404
- [ ] Tester le breadcrumb sur la page produit

### Étape 8.4 : Tester le responsive
- [ ] Tester sur mobile (375px)
- [ ] Tester sur tablette (768px)
- [ ] Tester sur desktop (1440px)
- [ ] Vérifier que tous les éléments sont accessibles

---

## 🎁 PHASE 9 : FONCTIONNALITÉS BONUS

### Étape 9.1 : Mode sombre (Dark Mode)

Créer `src/context/ThemeContext.jsx` :
```javascript
import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

Ajouter un bouton toggle dans le Header.

### Étape 9.2 : Recherche de produits

Ajouter une barre de recherche dans le Header :
```javascript
const [searchQuery, setSearchQuery] = useState('');
const navigate = useNavigate();

const handleSearch = (e) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    navigate(`/search?q=${searchQuery}`);
  }
};
```

### Étape 9.3 : Pagination

Ajouter la pagination dans la page Home pour gérer un grand nombre de produits.

### Étape 9.4 : Filtres

Ajouter des filtres par catégorie, prix, disponibilité.

---

## 📦 PHASE 10 : DÉPLOIEMENT

### Étape 10.1 : Préparer le build

```bash
# Build de production
npm run build

# Tester le build localement
npm run preview
```

### Étape 10.2 : Variables d'environnement de production

Créer `.env.production` :
```env
VITE_API_URL=https://votre-api-production.com/api/v2
```

### Étape 10.3 : Déploiement sur Vercel/Netlify

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel
```

Ou via Netlify :
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Déployer
netlify deploy --prod
```

---

## ✅ CHECKLIST FINALE

### Documentation
- [ ] README.md avec instructions d'installation
- [ ] Lien Figma / PDF du design
- [ ] Variables d'environnement documentées
- [ ] Architecture du projet documentée

### Code
- [ ] Code propre et commenté
- [ ] Structure de dossiers claire
- [ ] Pas de console.log en production
- [ ] Gestion des erreurs complète

### Fonctionnalités
- [ ] Inscription fonctionnelle
- [ ] Connexion fonctionnelle
- [ ] Déconnexion fonctionnelle
- [ ] Liste des produits affichée
- [ ] Détails produits fonctionnels
- [ ] Routes protégées
- [ ] Page 404

### UI/UX
- [ ] Design responsive
- [ ] Messages de succès/erreur
- [ ] Loader pendant les requêtes
- [ ] Navigation fluide
- [ ] Accessibilité basique

### Git
- [ ] Commits réguliers et clairs
- [ ] Branches pour chaque feature
- [ ] README complet
- [ ] .gitignore configuré

---

## 📚 RESSOURCES UTILES

### Documentation officielle
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)

### Outils Design
- [Figma](https://www.figma.com/)
- [Penpot](https://penpot.app/)
- [Heroicons](https://heroicons.com/) (icônes)
- [Unsplash](https://unsplash.com/) (images)

### Inspiration
- [Dribbble](https://dribbble.com/)
- [Behance](https://www.behance.net/)
- [Awwwards](https://www.awwwards.com/)

---

## 🎯 CONSEILS PRATIQUES

1. **Commencez par le design** : Ne codez pas sans maquette claire
2. **Commits réguliers** : Commitez après chaque fonctionnalité
3. **Testez en continu** : Ne laissez pas les bugs s'accumuler
4. **Responsive first** : Pensez mobile dès le début
5. **Lisez la doc** : La documentation est votre meilleure amie
6. **Demandez de l'aide** : N'hésitez pas si vous êtes bloqué
7. **Restez simple** : Ne sur-complexifiez pas le code
8. **Amusez-vous** : Le développement doit rester un plaisir !

---

## 📝 LIVRABLES ATTENDUS

1. **Code source** sur GitHub
2. **Lien Figma** ou PDF du design
3. **README.md** complet avec :
   - Description du projet
   - Instructions d'installation
   - Captures d'écran
   - Technologies utilisées
4. **Application déployée** (Vercel/Netlify)
5. **Présentation** du projet (5-10 min)

---

**Bon courage et bon développement ! 🚀**
