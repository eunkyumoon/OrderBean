/**
 * Header 컴포넌트
 * TDD GREEN 단계: 와이어프레임 기반 스타일링 적용
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/App.css';

const Header = () => {
  const location = useLocation();
  const isOrderPage = location.pathname === '/' || location.pathname === '/menus';
  const isAdminPage = location.pathname === '/admin';

  return (
    <header className="header">
      <div className="header-logo">OrderBean - 커피 주문</div>
      <nav className="header-nav">
        <Link 
          to="/" 
          className={`nav-button ${isOrderPage ? 'active' : ''}`}
        >
          주문하기
        </Link>
        <Link 
          to="/admin" 
          className={`nav-button ${isAdminPage ? 'active' : ''}`}
        >
          관리자
        </Link>
      </nav>
    </header>
  );
};

export default Header;

