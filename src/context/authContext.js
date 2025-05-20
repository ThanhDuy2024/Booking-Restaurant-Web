// import { useContext, createContext, useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
//
// const AuthContext = createContext(undefined);
//
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//
//   const isAuthenticated = !!user;
//
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const storedUser = localStorage.getItem('user');
//
//     if (token && storedUser) {
//       try {
//         const decodedToken = jwtDecode(token);
//         const isTokenExpired = decodedToken.exp * 1000 < Date.now();
//
//         if (!isTokenExpired) {
//           setUser(JSON.parse(storedUser));
//         } else {
//           logout();
//         }
//       } catch (error) {
//         console.error('Invalid token:', error);
//         logout();
//       }
//     }
//
//     setIsLoading(false);
//   }, []);
//
//   const login = (token, userData) => {
//     localStorage.setItem('authToken', token);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData);
//   };
//
//   const logout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user');
//     setUser(null);
//   };
//
//   const hasRole = (role) => {
//     return user?.role === role;
//   };
//
//   return (
//     <AuthContext.Provider
//       value={{ user, isAuthenticated, isLoading, login, logout, hasRole }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
//
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
