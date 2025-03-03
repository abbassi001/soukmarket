
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, UserCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect based on role
    if (user) {
      navigate(user.role === 'seller' ? '/dashboard' : '/products');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      await signIn(email, password);
    } else {
      await signUp(email, password, name, role);
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-souk-50">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-2xl font-bold text-souk-900 mb-6 text-center">
              {isLogin ? 'Connexion' : 'Créer un compte'}
            </h1>
            
            <div className="flex border-b border-souk-200 mb-6">
              <button
                className={`flex-1 py-3 font-medium text-center transition-colors ${
                  isLogin ? 'text-souk-700 border-b-2 border-souk-700' : 'text-souk-500'
                }`}
                onClick={() => setIsLogin(true)}
              >
                Connexion
              </button>
              <button
                className={`flex-1 py-3 font-medium text-center transition-colors ${
                  !isLogin ? 'text-souk-700 border-b-2 border-souk-700' : 'text-souk-500'
                }`}
                onClick={() => setIsLogin(false)}
              >
                Inscription
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-souk-700">
                      Nom complet
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-souk-500">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        id="name"
                        className="pl-10 w-full px-4 py-3 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                        placeholder="Votre nom complet"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={!isLogin}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="role" className="block text-sm font-medium text-souk-700">
                      Type de compte
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        className={`p-3 flex items-center justify-center border rounded-md cursor-pointer ${
                          role === 'buyer' 
                            ? 'bg-souk-100 border-souk-700 text-souk-900' 
                            : 'border-souk-300 text-souk-700'
                        }`}
                        onClick={() => setRole('buyer')}
                      >
                        <User size={18} className="mr-2" />
                        Acheteur
                      </button>
                      <button
                        type="button"
                        className={`p-3 flex items-center justify-center border rounded-md cursor-pointer ${
                          role === 'seller' 
                            ? 'bg-souk-100 border-souk-700 text-souk-900' 
                            : 'border-souk-300 text-souk-700'
                        }`}
                        onClick={() => setRole('seller')}
                      >
                        <UserCircle size={18} className="mr-2" />
                        Vendeur
                      </button>
                    </div>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-souk-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-souk-500">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="pl-10 w-full px-4 py-3 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-souk-700">
                    Mot de passe
                  </label>
                  {isLogin && (
                    <Link to="/forgot-password" className="text-sm text-souk-600 hover:text-souk-800">
                      Mot de passe oublié?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-souk-500">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="pl-10 w-full px-4 py-3 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                    placeholder={isLogin ? "Votre mot de passe" : "Choisir un mot de passe"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-souk-700 hover:bg-souk-800 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center button-hover"
              >
                {isLogin ? 'Se connecter' : 'Créer un compte'}
                <ArrowRight size={18} className="ml-2" />
              </button>
            </form>
            
            <div className="mt-6 text-center text-sm text-souk-600">
              {isLogin ? (
                <p>
                  Nouveau sur Souk Market?{' '}
                  <button 
                    className="text-souk-700 font-medium hover:text-souk-900 hover-underline"
                    onClick={() => setIsLogin(false)}
                  >
                    Créer un compte
                  </button>
                </p>
              ) : (
                <p>
                  Déjà un compte?{' '}
                  <button 
                    className="text-souk-700 font-medium hover:text-souk-900 hover-underline"
                    onClick={() => setIsLogin(true)}
                  >
                    Se connecter
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
