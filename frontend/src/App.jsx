import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import MenuList from './pages/MenuList';
import AdminDashboard from './pages/AdminDashboard';
import TestPage from './TestPage';
import { ROUTES } from './constants';
import './styles/App.css';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.TEST} element={<TestPage />} />
          <Route path={ROUTES.HOME} element={<MenuList />} />
          <Route path={ROUTES.MENUS} element={<MenuList />} />
          <Route path={ROUTES.ADMIN} element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
