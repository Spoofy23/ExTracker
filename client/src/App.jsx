import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { useContext, Suspense, lazy } from 'react';
import { AuthContext } from './context/AuthContext';
import './index.css';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Expenses = lazy(() => import('./pages/Expenses'));
const Budgets = lazy(() => import('./pages/Budgets'));
const GenericPage = lazy(() => import('./pages/GenericPage'));

const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
    <div className="spinner" style={{ border: '4px solid rgba(255,255,255,0.1)', borderLeftColor: 'var(--primary-color)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className={`app-container ${user ? 'has-navbar' : ''}`}>
      {user && <Navbar />}
      <main className="main-content" style={{ padding: user ? '2rem' : '0' }}>
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/expenses" 
                element={
                  <ProtectedRoute>
                    <Expenses />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/budgets" 
                element={
                  <ProtectedRoute>
                    <Budgets />
                  </ProtectedRoute>
                } 
              />
              {/* Generic Routes for Landing Page Nav */}
              <Route path="/features" element={<GenericPage />} />
              <Route path="/pricing" element={<GenericPage />} />
              <Route path="/security" element={<GenericPage />} />
              <Route path="/company" element={<GenericPage />} />
              <Route path="/about" element={<GenericPage />} />
              <Route path="/blog" element={<GenericPage />} />
              <Route path="/contact" element={<GenericPage />} />
              <Route path="/privacy" element={<GenericPage />} />
              <Route path="/terms" element={<GenericPage />} />
              <Route path="/product" element={<GenericPage />} />
              <Route path="/legal" element={<GenericPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
