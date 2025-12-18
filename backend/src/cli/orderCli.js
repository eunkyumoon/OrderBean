/**
 * OrderBean 콘솔 주문 프로그램
 * 인터랙티브 CLI를 통한 주문 처리
 */
const readline = require('readline');
const menuService = require('../services/menuService');
const orderService = require('../services/orderService');
const { calculateTotalPrice } = require('../utils/orderUtils');

// 장바구니
let cart = [];
let currentUserId = 1; // 테스트용 사용자 ID
let currentStoreId = 1; // 테스트용 매장 ID

// readline 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * 질문 함수
 */
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

/**
 * 메뉴 목록 표시
 */
async function displayMenus() {
  console.log('\n========== 메뉴 목록 ==========');
  const result = await menuService.getMenus({});
  
  result.menus.forEach((menu, index) => {
    console.log(`\n${index + 1}. ${menu.name}`);
    console.log(`   가격: ${menu.price.toLocaleString()}원`);
    console.log(`   설명: ${menu.description || '간단한 설명...'}`);
    
    if (menu.options) {
      console.log(`   옵션:`);
      if (menu.options.shots) {
        console.log(`     - 샷: ${menu.options.shots.min}~${menu.options.shots.max}개 (추가당 ${menu.options.shots.price_per_shot}원)`);
      }
      if (menu.options.milk) {
        console.log(`     - 우유 종류: ${menu.options.milk.types.join(', ')}`);
      }
      if (menu.options.syrup) {
        console.log(`     - 시럽: ${menu.options.syrup.types.join(', ')} (추가당 ${menu.options.syrup.pumps.price_per_pump}원)`);
      }
    }
  });
  
  console.log('\n================================\n');
  return result.menus;
}

/**
 * 장바구니 표시
 */
function displayCart() {
  console.log('\n========== 장바구니 ==========');
  
  if (cart.length === 0) {
    console.log('장바구니가 비어있습니다.');
    console.log('================================\n');
    return;
  }
  
  let total = 0;
  cart.forEach((item, index) => {
    const itemName = item.menu_name;
    const options = [];
    
    if (item.customizations) {
      if (item.customizations.shots && item.customizations.shots > 1) {
        options.push(`샷 ${item.customizations.shots}개`);
      }
      if (item.customizations.milk && item.customizations.milk !== '일반우유') {
        options.push(item.customizations.milk);
      }
      if (item.customizations.syrup) {
        if (item.customizations.syrup.type) {
          options.push(`${item.customizations.syrup.type} 시럽`);
        }
        if (item.customizations.syrup.pumps > 0) {
          options.push(`${item.customizations.syrup.pumps}펌프`);
        }
      }
    }
    
    const optionText = options.length > 0 ? ` (${options.join(', ')})` : '';
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    console.log(`${itemName}${optionText} X ${item.quantity}`);
    console.log(`  ${itemTotal.toLocaleString()}원`);
  });
  
  console.log(`\n총 금액: ${total.toLocaleString()}원`);
  console.log('================================\n');
}

/**
 * 메뉴 선택 및 옵션 설정
 */
async function selectMenu(menus) {
  const menuChoice = await question('메뉴를 선택하세요 (번호 입력, 0: 취소): ');
  const menuIndex = parseInt(menuChoice) - 1;
  
  if (menuChoice === '0') {
    return null;
  }
  
  if (menuIndex < 0 || menuIndex >= menus.length) {
    console.log('잘못된 선택입니다.');
    return null;
  }
  
  const selectedMenu = menus[menuIndex];
  console.log(`\n선택한 메뉴: ${selectedMenu.name} (${selectedMenu.price.toLocaleString()}원)`);
  
  // 수량 입력
  const quantity = await question('수량을 입력하세요 (기본: 1): ');
  const qty = parseInt(quantity) || 1;
  
  // 옵션 설정
  const customizations = {};
  
  if (selectedMenu.options) {
    // 샷 옵션
    if (selectedMenu.options.shots) {
      const addShot = await question(`샷 추가하시겠습니까? (+${selectedMenu.options.shots.price_per_shot}원) (y/n, 기본: n): `);
      if (addShot.toLowerCase() === 'y') {
        const shots = await question(`샷 개수 (기본: ${selectedMenu.options.shots.default}, 최대: ${selectedMenu.options.shots.max}): `);
        const shotCount = parseInt(shots) || selectedMenu.options.shots.default;
        if (shotCount > selectedMenu.options.shots.default) {
          customizations.shots = shotCount;
        }
      }
    }
    
    // 우유 종류
    if (selectedMenu.options.milk) {
      console.log(`\n우유 종류 옵션: ${selectedMenu.options.milk.types.join(', ')}`);
      const milk = await question(`우유 종류 선택 (기본: ${selectedMenu.options.milk.default}, 엔터: 기본값): `);
      if (milk && selectedMenu.options.milk.types.includes(milk)) {
        customizations.milk = milk;
      }
    }
    
    // 시럽 옵션
    if (selectedMenu.options.syrup) {
      const addSyrup = await question(`시럽 추가하시겠습니까? (+${selectedMenu.options.syrup.pumps.price_per_pump}원) (y/n, 기본: n): `);
      if (addSyrup.toLowerCase() === 'y') {
        console.log(`시럽 종류: ${selectedMenu.options.syrup.types.join(', ')}`);
        const syrupType = await question('시럽 종류 선택: ');
        if (syrupType && selectedMenu.options.syrup.types.includes(syrupType)) {
          const pumps = await question(`펌프 수 (기본: 0, 최대: ${selectedMenu.options.syrup.pumps.max}): `);
          const pumpCount = parseInt(pumps) || 0;
          if (pumpCount > 0) {
            customizations.syrup = {
              type: syrupType,
              pumps: pumpCount
            };
          }
        }
      }
    }
  }
  
  // 가격 계산
  let itemPrice = selectedMenu.price;
  if (customizations.shots && selectedMenu.options?.shots) {
    const extraShots = customizations.shots - selectedMenu.options.shots.default;
    itemPrice += extraShots * selectedMenu.options.shots.price_per_shot;
  }
  if (customizations.syrup && selectedMenu.options?.syrup) {
    itemPrice += customizations.syrup.pumps * selectedMenu.options.syrup.pumps.price_per_pump;
  }
  
  return {
    menu_id: selectedMenu.id,
    menu_name: selectedMenu.name,
    quantity: qty,
    customizations: Object.keys(customizations).length > 0 ? customizations : undefined,
    price: itemPrice
  };
}

/**
 * 장바구니에 추가
 */
function addToCart(item) {
  if (!item) return;
  
  cart.push(item);
  console.log(`\n✅ ${item.menu_name} ${item.quantity}개가 장바구니에 추가되었습니다.`);
}

/**
 * 주문 처리
 */
async function processOrder() {
  if (cart.length === 0) {
    console.log('\n장바구니가 비어있습니다.');
    return;
  }
  
  displayCart();
  
  const confirm = await question('주문하시겠습니까? (y/n): ');
  if (confirm.toLowerCase() !== 'y') {
    console.log('주문이 취소되었습니다.');
    return;
  }
  
  try {
    const orderData = {
      store_id: currentStoreId,
      items: cart.map(item => ({
        menu_id: item.menu_id,
        quantity: item.quantity,
        customizations: item.customizations
      })),
      payment_method: 'card',
      payment_info: {
        card_id: 1
      }
    };
    
    console.log('\n주문 처리 중...');
    const order = await orderService.createOrder(currentUserId, orderData);
    
    console.log('\n✅ 주문이 완료되었습니다!');
    console.log(`주문 번호: ${order.id}`);
    console.log(`주문 상태: ${order.status}`);
    console.log(`총 금액: ${order.total_price.toLocaleString()}원`);
    
    // 장바구니 비우기
    cart = [];
    
  } catch (error) {
    console.log(`\n❌ 주문 처리 중 오류가 발생했습니다: ${error.message}`);
  }
}

/**
 * 메인 메뉴
 */
async function showMainMenu() {
  console.log('\n========== OrderBean 주문 시스템 ==========');
  console.log('1. 메뉴 보기');
  console.log('2. 장바구니 보기');
  console.log('3. 주문하기');
  console.log('4. 종료');
  console.log('==========================================\n');
  
  const choice = await question('선택하세요 (1-4): ');
  
  switch (choice) {
    case '1':
      const menus = await displayMenus();
      const item = await selectMenu(menus);
      addToCart(item);
      await showMainMenu();
      break;
      
    case '2':
      displayCart();
      await showMainMenu();
      break;
      
    case '3':
      await processOrder();
      await showMainMenu();
      break;
      
    case '4':
      console.log('\n주문 시스템을 종료합니다. 감사합니다!');
      rl.close();
      break;
      
    default:
      console.log('잘못된 선택입니다.');
      await showMainMenu();
      break;
  }
}

/**
 * 프로그램 시작
 */
function start() {
  console.log('\n☕ OrderBean 주문 시스템에 오신 것을 환영합니다!');
  showMainMenu();
}

// 프로그램 실행
if (require.main === module) {
  start();
}

module.exports = { start };

