import React from 'react';

const TestPage = () => {
  return (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', fontSize: '32px', marginBottom: '20px' }}>
        ✅ React 앱이 정상적으로 작동합니다!
      </h1>
      <p style={{ color: '#666', fontSize: '18px', marginBottom: '20px' }}>
        이 메시지가 보인다면 React가 정상적으로 렌더링되고 있습니다.
      </p>
      <div style={{ 
        backgroundColor: '#28A745', 
        color: 'white', 
        padding: '15px 30px', 
        borderRadius: '5px',
        display: 'inline-block',
        fontSize: '16px',
        fontWeight: 'bold'
      }}>
        OrderBean - 커피 주문
      </div>
    </div>
  );
};

export default TestPage;

