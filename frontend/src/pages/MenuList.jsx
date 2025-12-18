/**
 * MenuList 페이지
 * TDD GREEN 단계: 와이어프레임 기반 스타일링 적용
 */

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MenuCard from '../components/MenuCard';
import Cart from '../components/Cart';
import { getMenus } from '../services/menuService';
import { getDefaultMenus } from '../data/menuData';
import '../styles/App.css';

const MenuList = () => {
  console.log('📄 MenuList component rendering...');
  const [menus, setMenus] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('🔄 MenuList useEffect running...');
    const loadMenus = async () => {
      try {
        console.log('📡 Loading menus from API...');
        const data = await getMenus();
        console.log('✅ Menus loaded from API:', data);
        setMenus(data.menus || []);
      } catch (error) {
        console.warn('⚠️ 메뉴 API 로드 실패, 기본 메뉴 사용:', error.message);
        // 에러 발생 시 임의의 메뉴 데이터 사용
        console.log('📋 Using default menus');
        const defaultMenus = getDefaultMenus();
        console.log('📋 Default menus:', defaultMenus);
        setMenus(defaultMenus);
        setError(null); // 기본 메뉴를 사용하므로 에러로 표시하지 않음
      } finally {
        setLoading(false);
        console.log('✅ Loading completed');
      }
    };

    loadMenus();
  }, []);

  const handleAddToCart = (item) => {
    const menu = menus.find(m => m.id === item.menu_id);
    if (!menu) return;

    // 기존 장바구니에 동일한 메뉴와 옵션이 있는지 확인
    const existingItemIndex = cartItems.findIndex(
      cartItem => 
        cartItem.menu_id === menu.id && 
        JSON.stringify(cartItem.customizations) === JSON.stringify(item.customizations)
    );

    const price = menu.price + (item.customizations?.extra_shot ? 500 : 0);

    if (existingItemIndex >= 0) {
      // 기존 항목의 수량 증가
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      // 새 항목 추가
      const cartItem = {
        id: Date.now(),
        menu_id: menu.id,
        menu_name: menu.name,
        quantity: 1,
        price: price,
        customizations: item.customizations
      };
      setCartItems([...cartItems, cartItem]);
    }
  };

  const handleOrder = () => {
    // 주문 처리 로직
    console.log('주문하기:', cartItems);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`주문이 완료되었습니다!\n총 ${totalItems}개 항목\n총 금액: ${totalPrice.toLocaleString()}원`);
    setCartItems([]);
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  console.log('🔄 MenuList render - loading:', loading, 'menus count:', menus.length);

  if (loading) {
    console.log('⏳ Showing loading state...');
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <Header />
        <div className="loading" style={{ 
          padding: '40px', 
          textAlign: 'center',
          fontSize: '18px',
          color: '#666'
        }}>
          <div>로딩 중...</div>
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#999' }}>
            메뉴를 불러오는 중입니다...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('❌ Showing error state:', error);
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <Header />
        <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
          <h2>오류가 발생했습니다</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  console.log('✅ Rendering menu list with', menus.length, 'menus');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Header />
      <div className="menu-list-container">
        {menus.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
            <p>표시할 메뉴가 없습니다.</p>
          </div>
        ) : (
          <div className="menu-grid">
            {menus.map((menu) => {
              console.log('🎴 Rendering menu card:', menu.name);
              return (
                <MenuCard
                  key={menu.id}
                  menu={menu}
                  onAddToCart={handleAddToCart}
                />
              );
            })}
          </div>
        )}
      </div>
      <Cart
        items={cartItems}
        onOrder={handleOrder}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default MenuList;

