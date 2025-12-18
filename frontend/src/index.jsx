/**
 * OrderBean Frontend Application
 * Entry point for the frontend application
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorDisplay from './components/ErrorDisplay';
import './styles/App.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('❌ Root element not found!');
  // React를 사용할 수 없으므로 기본 DOM 조작 사용
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-display';
  errorDiv.innerHTML = '<h2>Root element not found!</h2><p>Check index.html</p>';
  document.body.appendChild(errorDiv);
} else {
  let reactRoot = null;
  
  try {
    reactRoot = ReactDOM.createRoot(rootElement);
    
    reactRoot.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('❌ Error initializing React app:', error);
    
    // React를 사용하여 에러 표시
    if (reactRoot) {
      reactRoot.render(
        <ErrorDisplay 
          error={error} 
          title="앱 초기화 오류"
        />
      );
    } else {
      // React를 사용할 수 없는 경우에만 기본 DOM 조작 사용
      rootElement.innerHTML = '<div class="error-display"><h2>앱 초기화 오류</h2><p>앱을 초기화하는 중 오류가 발생했습니다.</p></div>';
    }
  }
}

// 전역 에러 핸들러 - React 패턴 사용
let globalErrorRoot = null;

const renderGlobalError = (error, title) => {
  const root = document.getElementById('root');
  if (!root) return;
  
  // React root가 이미 있는지 확인
  if (!globalErrorRoot) {
    try {
      globalErrorRoot = ReactDOM.createRoot(root);
    } catch (e) {
      // React를 사용할 수 없는 경우 기본 처리
      root.className = 'error-display';
      root.innerHTML = `<h2>${title}</h2><p>${error?.message || error}</p>`;
      return;
    }
  }
  
  globalErrorRoot.render(
    <ErrorDisplay 
      error={error} 
      title={title}
    />
  );
};

window.addEventListener('error', (event) => {
  console.error('🚨 Global error:', event.error);
  
  if (event.error && !document.querySelector('.error-display')) {
    renderGlobalError(
      new Error(event.message),
      'JavaScript 오류'
    );
  }
}, true);

window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled promise rejection:', event.reason);
  
  if (!document.querySelector('.error-display')) {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason));
    
    renderGlobalError(error, 'Promise 오류');
  }
});
