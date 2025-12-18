import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import MenuList from './pages/MenuList';
import AdminDashboard from './pages/AdminDashboard';
import TestPage from './TestPage';
import './styles/App.css';

console.log('📦 App.jsx loaded');

function App() {
  console.log('🔄 App component rendering...');
  
  try {
    return (
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/test" element={<TestPage />} />
            <Route path="/" element={<MenuList />} />
            <Route path="/menus" element={<MenuList />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('❌ Error in App component:', error);
    return (
      <div style={{ padding: '20px', color: 'red', backgroundColor: '#ffe6e6' }}>
        <h2>App Component Error</h2>
        <p>{error.message}</p>
        <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>{error.stack}</pre>
      </div>
    );
  }
}

export default App;
