/**
 * MenuCard 컴포넌트
 * TDD GREEN 단계: 와이어프레임 기반 스타일링 적용
 */

import React, { useState } from 'react';
import { CUSTOMIZATION_PRICES, CUSTOMIZATION_LABELS } from '../constants';
import '../styles/App.css';

const MenuCard = ({ menu, onAddToCart }) => {
  const [extraShot, setExtraShot] = useState(false);
  const [extraSyrup, setExtraSyrup] = useState(false);

  const handleAddToCart = () => {
    const customizations = {
      extra_shot: extraShot,
      extra_syrup: extraSyrup
    };

    onAddToCart({
      menu_id: menu.id,
      customizations
    });
  };

  return (
    <div className="menu-card">
      <div className="menu-card-image">
        {menu.image_url ? (
          <img src={menu.image_url} alt={menu.name} />
        ) : (
          <span></span>
        )}
      </div>
      <h3 className="menu-card-name">{menu.name}</h3>
      <p className="menu-card-price">{menu.price.toLocaleString()}원</p>
      <p className="menu-card-description">{menu.description || '간단한 설명...'}</p>
      
      <div className="menu-card-options">
        <label className="menu-card-option">
          <input
            type="checkbox"
            checked={extraShot}
            onChange={(e) => setExtraShot(e.target.checked)}
          />
          {CUSTOMIZATION_LABELS.EXTRA_SHOT} (+{CUSTOMIZATION_PRICES.EXTRA_SHOT.toLocaleString()}원)
        </label>
        
        <label className="menu-card-option">
          <input
            type="checkbox"
            checked={extraSyrup}
            onChange={(e) => setExtraSyrup(e.target.checked)}
          />
          {CUSTOMIZATION_LABELS.EXTRA_SYRUP} (+{CUSTOMIZATION_PRICES.EXTRA_SYRUP.toLocaleString()}원)
        </label>
      </div>
      
      <button className="menu-card-button" onClick={handleAddToCart}>
        담기
      </button>
    </div>
  );
};

export default MenuCard;

