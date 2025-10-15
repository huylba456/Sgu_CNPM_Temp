export const initialOrders = [
  {
    id: 'o1',
    customerName: 'Mai Anh',
    customerEmail: 'customer@foodfast.io',
    customerAddress: 'Vinhomes Grand Park',
    items: [
      { id: 'p1', name: 'Burger Wagyu Signature', price: 189000, quantity: 1 },
      { id: 'p5', name: 'Tiramisu Espresso', price: 79000, quantity: 2 }
    ],
    total: 347000,
    status: 'in_transit',
    droneId: 'DR-02',
    restaurantId: 'r1',
    placedAt: '2024-05-01T10:15:00Z'
  },
  {
    id: 'o2',
    customerName: 'Hữu Phát',
    customerEmail: 'phat@foodfast.io',
    customerAddress: 'Landmark 81',
    items: [{ id: 'p2', name: 'Combo Sushi Thượng Hạng', price: 259000, quantity: 1 }],
    total: 259000,
    status: 'delivered',
    droneId: 'DR-01',
    restaurantId: 'r2',
    placedAt: '2024-04-28T18:45:00Z'
  },
  {
    id: 'o3',
    customerName: 'Tú Anh',
    customerEmail: 'tuanh@foodfast.io',
    customerAddress: 'Thủ Thiêm Eco',
    items: [
      { id: 'p4', name: 'Salad Detox Xanh', price: 99000, quantity: 2 },
      { id: 'p6', name: 'Burger Gà Sốt Cay', price: 129000, quantity: 1 }
    ],
    total: 327000,
    status: 'processing',
    droneId: null,
    restaurantId: 'r1',
    placedAt: '2024-05-02T08:30:00Z'
  }
];
