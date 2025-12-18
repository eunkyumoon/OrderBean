/**
 * AdminDashboard 페이지
 * 관리자 대시보드 화면
 */

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../styles/App.css';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // 초기 데이터 로드
    const loadData = async () => {
      try {
        // 임시 데이터 설정
        setOrders([
          {
            id: 1,
            date: '7월 31일 13:00',
            items: [{ name: '아메리카노(ICE)', quantity: 1 }],
            total: 4000,
            status: '접수 대기'
          }
        ]);

        setInventory([
          { id: 1, name: '아메리카노(ICE)', stock: 10 },
          { id: 2, name: '아메리카노(HOT)', stock: 10 },
          { id: 3, name: '카페라떼', stock: 10 }
        ]);

        setLoading(false);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 통계 계산
  const totalOrders = orders.length;
  const receivedOrders = orders.filter(o => o.status === '접수').length;
  const makingOrders = orders.filter(o => o.status === '제조 중').length;
  const completedOrders = orders.filter(o => o.status === '제조 완료').length;

  const handleAcceptOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: '접수' } : order
    ));
  };

  const handleInventoryChange = (itemId, delta) => {
    setInventory(inventory.map(item => {
      if (item.id === itemId) {
        const newStock = Math.max(0, item.stock + delta);
        return { ...item, stock: newStock };
      }
      return item;
    }));
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <Header />
        <div className="admin-loading">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <Header />
      
      <div className="admin-container">
        {/* 주문 통계 */}
        <section className="admin-section">
          <h2 className="admin-section-title">관리자 대시보드</h2>
          <div className="admin-stats-card">
            <div className="admin-stats">
              총 주문 {totalOrders} / 주문 접수 {receivedOrders} / 제조 중 {makingOrders} / 제조 완료 {completedOrders}
            </div>
          </div>
        </section>

        {/* 재고 현황 */}
        <section className="admin-section">
          <h2 className="admin-section-title">재고 현황</h2>
          <div className="admin-inventory-grid">
            {inventory.map(item => (
              <div key={item.id} className="admin-inventory-card">
                <div className="admin-inventory-name">{item.name}</div>
                <div className="admin-inventory-stock">{item.stock}개</div>
                <div className="admin-inventory-controls">
                  <button 
                    className="admin-inventory-btn"
                    onClick={() => handleInventoryChange(item.id, 1)}
                  >
                    +
                  </button>
                  <button 
                    className="admin-inventory-btn"
                    onClick={() => handleInventoryChange(item.id, -1)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 주문 현황 */}
        <section className="admin-section">
          <h2 className="admin-section-title">주문 현황</h2>
          <div className="admin-orders-list">
            {orders.map(order => (
              <div key={order.id} className="admin-order-card">
                <div className="admin-order-info">
                  <div className="admin-order-date">{order.date}</div>
                  <div className="admin-order-items">
                    {order.items.map((item, idx) => (
                      <div key={idx}>
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </div>
                  <div className="admin-order-total">{order.total.toLocaleString()}원</div>
                </div>
                {order.status === '접수 대기' && (
                  <button 
                    className="admin-order-action-btn"
                    onClick={() => handleAcceptOrder(order.id)}
                  >
                    주문 접수
                  </button>
                )}
                {order.status === '접수' && (
                  <div className="admin-order-status">접수됨</div>
                )}
              </div>
            ))}
            {orders.length === 0 && (
              <div className="admin-no-orders">주문이 없습니다.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;

