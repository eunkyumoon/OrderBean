/**
 * ErrorDisplay 컴포넌트
 * 에러 메시지를 표시하는 재사용 가능한 컴포넌트
 */

import React from 'react';
import '../styles/App.css';

const ErrorDisplay = ({ error, onRetry, title = '오류가 발생했습니다' }) => {
  const errorMessage = error?.message || error || '알 수 없는 오류가 발생했습니다.';
  const errorStack = error?.stack;

  return (
    <div className="error-display">
      <h2 className="error-display-title">{title}</h2>
      <p className="error-display-message">{errorMessage}</p>
      {errorStack && (
        <pre className="error-display-stack">{errorStack}</pre>
      )}
      {onRetry && (
        <button 
          className="error-display-retry-button"
          onClick={onRetry}
        >
          다시 시도
        </button>
      )}
      <button 
        className="error-display-reload-button"
        onClick={() => window.location.reload()}
      >
        새로고침
      </button>
    </div>
  );
};

export default ErrorDisplay;

