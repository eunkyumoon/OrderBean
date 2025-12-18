/**
 * OrderBean Frontend Application
 * Entry point for the frontend application
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.css';

console.log('🚀 index.jsx loaded');
console.log('📦 React version:', React.version);

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('❌ Root element not found!');
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'padding: 20px; color: red; font-size: 24px; background: yellow; position: fixed; top: 0; left: 0; right: 0; z-index: 9999;';
  errorDiv.textContent = 'Root element not found! Check index.html';
  document.body.appendChild(errorDiv);
} else {
  console.log('✅ Root element found');
  
  try {
    console.log('🔄 Creating React root...');
    const root = ReactDOM.createRoot(rootElement);
    
    console.log('🔄 Rendering App component...');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('✅ React app initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing React app:', error);
    console.error('Error stack:', error.stack);
    
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-size: 20px; background: #ffe6e6; border: 2px solid red; position: fixed; top: 0; left: 0; right: 0; z-index: 9999;">
        <h2>Error Initializing React App</h2>
        <p><strong>Error:</strong> ${error.message}</p>
        <pre style="background: #f5f5f5; padding: 10px; overflow: auto; text-align: left; max-height: 400px;">${error.stack}</pre>
        <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 10px; cursor: pointer;">새로고침</button>
      </div>
    `;
  }
}

// 전역 에러 핸들러
window.addEventListener('error', (event) => {
  console.error('🚨 Global error:', event.error);
  console.error('Error message:', event.message);
  console.error('Error filename:', event.filename);
  console.error('Error lineno:', event.lineno);
  
  // 화면에 에러 표시
  const root = document.getElementById('root');
  if (root && !root.innerHTML.includes('Error') && !root.innerHTML.includes('앱 로드')) {
    const errorHtml = `
      <div style="padding: 20px; color: red; font-size: 20px; background: #ffe6e6; border: 2px solid red; position: fixed; top: 0; left: 0; right: 0; z-index: 9999;">
        <h2>JavaScript Error</h2>
        <p><strong>Error:</strong> ${event.message}</p>
        <p><strong>File:</strong> ${event.filename || 'unknown'}</p>
        <p><strong>Line:</strong> ${event.lineno || 'unknown'}</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 10px; cursor: pointer;">새로고침</button>
      </div>
    `;
    root.innerHTML = errorHtml;
  }
}, true);

window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled promise rejection:', event.reason);
  
  const root = document.getElementById('root');
  if (root && !root.innerHTML.includes('Error') && !root.innerHTML.includes('앱 로드')) {
    root.innerHTML = `
      <div style="padding: 20px; color: red; font-size: 20px; background: #ffe6e6; border: 2px solid red; position: fixed; top: 0; left: 0; right: 0; z-index: 9999;">
        <h2>Promise Rejection Error</h2>
        <p><strong>Error:</strong> ${event.reason?.message || event.reason}</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 10px; cursor: pointer;">새로고침</button>
      </div>
    `;
  }
});
