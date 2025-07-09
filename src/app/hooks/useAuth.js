import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos de usuario
    // En una aplicación real, esto vendría de tu API de autenticación
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Simular llamada a API para obtener datos del usuario
          const userData = {
            id: 'user123',
            name: 'Usuario Demo',
            email: 'usuario@demo.com',
            avatar: null // Se generará dinámicamente
          };
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    try {
      // Simular login
      const userData = {
        id: 'user123',
        name: credentials.name || 'Usuario Demo',
        email: credentials.email || 'usuario@demo.com',
        avatar: credentials.avatar || null
      };
      
      localStorage.setItem('authToken', 'demo-token');
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Hook simplificado para usar sin provider (para demo)
export const useAuthSimple = () => {
  const [user] = useState({
    id: 'user123',
    name: 'Usuario Demo',
    email: 'usuario@demo.com',
    avatar: null
  });

  return { user };
};