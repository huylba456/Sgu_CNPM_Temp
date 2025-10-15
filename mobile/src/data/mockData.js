export const categories = ['Burger', 'Sushi', 'Pizza', 'Healthy', 'Dessert'];

export const products = [
  {
    id: 'p1',
    name: 'Burger Wagyu Signature',
    category: 'Burger',
    price: 189000,
    description: 'Burger Wagyu nướng than hoa cùng sốt truffle.',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b',
    restaurant: 'FastGrill Station',
    rating: 4.8,
    deliveryTime: 12
  },
  {
    id: 'p2',
    name: 'Combo Sushi Thượng Hạng',
    category: 'Sushi',
    price: 259000,
    description: '12 miếng sushi cá hồi, cá ngừ, bạch tuộc.',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f22',
    restaurant: 'Sora Sushi Bay',
    rating: 4.9,
    deliveryTime: 15
  },
  {
    id: 'p3',
    name: 'Pizza Hải sản Pesto',
    category: 'Pizza',
    price: 219000,
    description: 'Tôm, mực, pesto, phô mai mozzarella.',
    image: 'https://images.unsplash.com/photo-1548365328-9f5471e97c42',
    restaurant: 'La Piazza Drone Hub',
    rating: 4.7,
    deliveryTime: 10
  }
];

export const orders = [
  {
    id: 'o1',
    items: [
      { id: 'p1', name: 'Burger Wagyu Signature', quantity: 1, price: 189000 },
      { id: 'p3', name: 'Pizza Hải sản Pesto', quantity: 1, price: 219000 }
    ],
    total: 408000,
    status: 'in_transit',
    droneId: 'DR-02',
    placedAt: '2024-05-01T10:15:00Z'
  },
  {
    id: 'o2',
    items: [{ id: 'p2', name: 'Combo Sushi Thượng Hạng', quantity: 1, price: 259000 }],
    total: 259000,
    status: 'delivered',
    droneId: 'DR-01',
    placedAt: '2024-04-29T18:30:00Z'
  }
];

export const mockUsers = [
  { id: 'u1', name: 'Mai Anh', email: 'customer@foodfast.io', role: 'customer' },
  { id: 'u2', name: 'Ngọc Bích', email: 'admin@foodfast.io', role: 'admin' },
  { id: 'u3', name: 'Đức Huy', email: 'restaurant@foodfast.io', role: 'restaurant', restaurantId: 'r1' }
];

export const restaurants = [
  {
    id: 'r1',
    name: 'FastGrill Station',
    revenue: 205000000,
    activeDrones: 4,
    rating: 4.6
  }
];
