/**
 * 임의의 커피 메뉴 데이터
 * REFACTOR 단계: 메뉴 데이터를 별도 파일로 분리
 */

export const getDefaultMenus = () => [
  {
    id: 1,
    name: '아메리카노(ICE)',
    description: '시원한 아이스 아메리카노',
    price: 4000,
    image_url: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    options: {
      shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
      syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
    }
  },
  {
    id: 2,
    name: '아메리카노(HOT)',
    description: '따뜻한 핫 아메리카노',
    price: 4000,
    image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop&auto=format',
    options: {
      shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
      syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
    }
  },
  {
    id: 3,
    name: '카페라떼',
    description: '부드러운 우유와 에스프레소의 조화',
    price: 5000,
    image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop&auto=format',
    options: {
      shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
      syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
    }
  },
  {
    id: 4,
    name: '카푸치노',
    description: '에스프레소와 스팀 밀크, 우유 거품의 완벽한 조합',
    price: 5500,
    image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop&auto=format',
    options: {
      shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
      syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
    }
  },
  {
    id: 5,
    name: '바닐라라떼',
    description: '부드러운 바닐라 시럽이 들어간 라떼',
    price: 6000,
    image_url: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    options: {
      shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
      syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
    }
  },
  {
    id: 6,
    name: '카라멜마키아토',
    description: '카라멜 시럽과 에스프레소의 달콤한 만남',
    price: 6500,
    image_url: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop&auto=format',
    options: {
      shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
      syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
    }
  },
  {
    id: 7,
    name: '콜드브루',
    description: '차갑게 우려낸 부드러운 커피',
    price: 4500,
    image_url: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    options: {
      shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
      syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
    }
  },
  {
    id: 8,
    name: '에스프레소',
    description: '진한 에스프레소 샷',
    price: 3500,
    image_url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=400&fit=crop&auto=format',
    options: {
      shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
      syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
    }
  },
  {
    id: 9,
    name: '헤이즐넛라떼',
    description: '고소한 헤이즐넛 시럽이 들어간 라떼',
    price: 6000,
    image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop&auto=format',
    options: {
      shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
      syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
    }
  }
];
