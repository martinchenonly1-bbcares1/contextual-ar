export const mockData = {
  models: [
    {
      id: 'model1',
      name: 'Alex',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      bodyType: 'Athletic',
      skinTone: 'Light'
    },
    {
      id: 'model2',
      name: 'Jordan',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
      bodyType: 'Slim',
      skinTone: 'Medium'
    },
    {
      id: 'model3',
      name: 'Sam',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400',
      bodyType: 'Curvy',
      skinTone: 'Dark'
    }
  ],

  garments: [
    {
      id: 'jacket1',
      name: 'Tech Bomber',
      brand: 'CYBER WEAR',
      price: 299,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      category: 'Outerwear'
    },
    {
      id: 'dress1',
      name: 'Neon Dress',
      brand: 'FUTURE FASHION',
      price: 189,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
      category: 'Dresses'
    },
    {
      id: 'hoodie1',
      name: 'Urban Hoodie',
      brand: 'STREET CORE',
      price: 129,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
      category: 'Tops'
    },
    {
      id: 'coat1',
      name: 'Matrix Coat',
      brand: 'NEO STYLE',
      price: 449,
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400',
      category: 'Outerwear'
    }
  ],

  results: {
    snowy: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800',
    cyberpunk: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800',
    forest: 'https://images.unsplash.com/photo-1445510861639-5651173bc5d5?w=800'
  },

  beforeImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800'
};

export const exploreData = {
  men: {
    'Suits': [
      { id: 'men-suit-1', name: 'Classic Black Suit', brand: 'HUGO BOSS', price: 899, image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=400' },
      { id: 'men-suit-2', name: 'Navy Business Suit', brand: 'ARMANI', price: 1299, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400' },
      { id: 'men-suit-3', name: 'Grey Slim Fit', brand: 'ZARA', price: 399, image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400' }
    ],
    'Shirts': [
      { id: 'men-shirt-1', name: 'White Oxford Shirt', brand: 'RALPH LAUREN', price: 129, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400' },
      { id: 'men-shirt-2', name: 'Blue Linen Shirt', brand: 'UNIQLO', price: 59, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400' },
      { id: 'men-shirt-3', name: 'Striped Casual Shirt', brand: 'H&M', price: 39, image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400' }
    ],
    'Padded Jackets': [
      { id: 'men-padded-1', name: 'Quilted Puffer', brand: 'THE NORTH FACE', price: 299, image: 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=400' },
      { id: 'men-padded-2', name: 'Lightweight Down', brand: 'UNIQLO', price: 129, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400' },
      { id: 'men-padded-3', name: 'Hooded Puffer', brand: 'ZARA', price: 159, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400' }
    ],
    'Knitwear': [
      { id: 'men-knit-1', name: 'Cable Knit Sweater', brand: 'RALPH LAUREN', price: 189, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400' },
      { id: 'men-knit-2', name: 'Merino Wool Jumper', brand: 'COS', price: 129, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400' },
      { id: 'men-knit-3', name: 'Cashmere V-Neck', brand: 'UNIQLO', price: 99, image: 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=400' }
    ],
    'Hoodies': [
      { id: 'men-hoodie-1', name: 'Classic Pullover', brand: 'NIKE', price: 79, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400' },
      { id: 'men-hoodie-2', name: 'Zip-Up Hoodie', brand: 'ADIDAS', price: 89, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400' },
      { id: 'men-hoodie-3', name: 'Oversized Hoodie', brand: 'FEAR OF GOD', price: 299, image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400' }
    ],
    'Dress Pants': [
      { id: 'men-dress-1', name: 'Wool Trousers', brand: 'HUGO BOSS', price: 249, image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400' },
      { id: 'men-dress-2', name: 'Slim Fit Pants', brand: 'ZARA', price: 79, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400' },
      { id: 'men-dress-3', name: 'Pleated Trousers', brand: 'COS', price: 129, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400' }
    ],
    'Casual Pants': [
      { id: 'men-casual-1', name: 'Cargo Pants', brand: 'CARHARTT', price: 89, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400' },
      { id: 'men-casual-2', name: 'Jogger Pants', brand: 'NIKE', price: 69, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400' },
      { id: 'men-casual-3', name: 'Khaki Chinos', brand: 'GAP', price: 59, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400' }
    ],
    'Down Jackets': [
      { id: 'men-down-1', name: 'Expedition Parka', brand: 'CANADA GOOSE', price: 1299, image: 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=400' },
      { id: 'men-down-2', name: 'Light Down Jacket', brand: 'UNIQLO', price: 99, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400' },
      { id: 'men-down-3', name: 'Hooded Down Coat', brand: 'THE NORTH FACE', price: 399, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' }
    ],
    'Sweaters': [
      { id: 'men-sweater-1', name: 'Crew Neck Sweater', brand: 'J.CREW', price: 89, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400' },
      { id: 'men-sweater-2', name: 'Fair Isle Sweater', brand: 'RALPH LAUREN', price: 159, image: 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=400' },
      { id: 'men-sweater-3', name: 'Quarter Zip Sweater', brand: 'UNIQLO', price: 69, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400' }
    ],
    'Shell Jackets': [
      { id: 'men-shell-1', name: 'Waterproof Shell', brand: 'ARCTERYX', price: 499, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400' },
      { id: 'men-shell-2', name: 'Windbreaker', brand: 'PATAGONIA', price: 199, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' },
      { id: 'men-shell-3', name: 'Hardshell Jacket', brand: 'THE NORTH FACE', price: 349, image: 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=400' }
    ],
    'Jeans': [
      { id: 'men-jeans-1', name: 'Slim Fit Jeans', brand: 'LEVIS', price: 89, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' },
      { id: 'men-jeans-2', name: 'Straight Leg Jeans', brand: 'WRANGLER', price: 69, image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400' },
      { id: 'men-jeans-3', name: 'Skinny Jeans', brand: 'ZARA', price: 59, image: 'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=400' }
    ],
    'Denim Sets': [
      { id: 'men-denim-set-1', name: 'Classic Denim Set', brand: 'LEVIS', price: 179, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400' },
      { id: 'men-denim-set-2', name: 'Black Denim Combo', brand: 'DIESEL', price: 249, image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400' },
      { id: 'men-denim-set-3', name: 'Vintage Wash Set', brand: 'WRANGLER', price: 159, image: 'https://images.unsplash.com/photo-1598032895397-b9c0c8c6e8f0?w=400' }
    ],
    'Varsity Jackets': [
      { id: 'men-varsity-1', name: 'Classic Letterman', brand: 'CHAMPION', price: 149, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400' },
      { id: 'men-varsity-2', name: 'Wool Varsity', brand: 'GOLDEN BEAR', price: 399, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' },
      { id: 'men-varsity-3', name: 'Satin Bomber', brand: 'ALPHA INDUSTRIES', price: 179, image: 'https://images.unsplash.com/photo-1548126032-079d4e2cf76d?w=400' }
    ],
    'Jackets': [
      { id: 'men-jacket-1', name: 'Leather Jacket', brand: 'SCHOTT', price: 699, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400' },
      { id: 'men-jacket-2', name: 'Bomber Jacket', brand: 'ALPHA INDUSTRIES', price: 199, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' },
      { id: 'men-jacket-3', name: 'Denim Jacket', brand: 'LEVIS', price: 89, image: 'https://images.unsplash.com/photo-1548126032-079d4e2cf76d?w=400' }
    ],
    'Trench Coats': [
      { id: 'men-trench-1', name: 'Classic Trench', brand: 'BURBERRY', price: 1899, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400' },
      { id: 'men-trench-2', name: 'Modern Trench', brand: 'COS', price: 299, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' },
      { id: 'men-trench-3', name: 'Double-Breasted Coat', brand: 'ZARA', price: 159, image: 'https://images.unsplash.com/photo-1548126032-079d4e2cf76d?w=400' }
    ],
    'Sun Protection': [
      { id: 'men-sun-1', name: 'UV Protection Jacket', brand: 'UNIQLO', price: 59, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' },
      { id: 'men-sun-2', name: 'Lightweight Windbreaker', brand: 'COLUMBIA', price: 79, image: 'https://images.unsplash.com/photo-1548126032-079d4e2cf76d?w=400' },
      { id: 'men-sun-3', name: 'Packable Sun Jacket', brand: 'PATAGONIA', price: 129, image: 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=400' }
    ]
  },
  women: {
    'Knitwear': [
      { id: 'women-knit-1', name: 'Cashmere Sweater', brand: 'EVERLANE', price: 149, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400' },
      { id: 'women-knit-2', name: 'Ribbed Cardigan', brand: 'COS', price: 119, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400' },
      { id: 'women-knit-3', name: 'Turtleneck Knit', brand: 'UNIQLO', price: 69, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400' }
    ],
    'Ski Wear': [
      { id: 'women-ski-1', name: 'Insulated Ski Jacket', brand: 'THE NORTH FACE', price: 449, image: 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=400' },
      { id: 'women-ski-2', name: 'Waterproof Ski Suit', brand: 'PATAGONIA', price: 599, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400' },
      { id: 'women-ski-3', name: 'Thermal Ski Pants', brand: 'COLUMBIA', price: 199, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' }
    ],
    'Casual Pants': [
      { id: 'women-casual-1', name: 'Wide Leg Pants', brand: 'ZARA', price: 69, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400' },
      { id: 'women-casual-2', name: 'Linen Trousers', brand: 'COS', price: 99, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400' },
      { id: 'women-casual-3', name: 'Jogger Pants', brand: 'LULULEMON', price: 98, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400' }
    ],
    'Jackets': [
      { id: 'women-jacket-1', name: 'Leather Biker Jacket', brand: 'ALL SAINTS', price: 449, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400' },
      { id: 'women-jacket-2', name: 'Denim Jacket', brand: 'LEVIS', price: 89, image: 'https://images.unsplash.com/photo-1548126032-079d4e2cf76d?w=400' },
      { id: 'women-jacket-3', name: 'Blazer Jacket', brand: 'ZARA', price: 129, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' }
    ],
    'Padded Jackets': [
      { id: 'women-padded-1', name: 'Puffer Jacket', brand: 'THE NORTH FACE', price: 299, image: 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=400' },
      { id: 'women-padded-2', name: 'Quilted Coat', brand: 'BARBOUR', price: 349, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400' },
      { id: 'women-padded-3', name: 'Lightweight Puffer', brand: 'UNIQLO', price: 99, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400' }
    ],
    'Shell Jackets': [
      { id: 'women-shell-1', name: 'Waterproof Shell', brand: 'ARCTERYX', price: 499, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400' },
      { id: 'women-shell-2', name: 'Windbreaker', brand: 'PATAGONIA', price: 199, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' },
      { id: 'women-shell-3', name: 'Rain Jacket', brand: 'COLUMBIA', price: 129, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400' }
    ],
    'Cargo Pants': [
      { id: 'women-cargo-1', name: 'Utility Cargo Pants', brand: 'CARHARTT', price: 99, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400' },
      { id: 'women-cargo-2', name: 'High Waist Cargo', brand: 'ZARA', price: 59, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400' },
      { id: 'women-cargo-3', name: 'Relaxed Cargo Pants', brand: 'H&M', price: 39, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400' }
    ],
    'Sweatpants': [
      { id: 'women-sweat-1', name: 'Cotton Sweatpants', brand: 'NIKE', price: 69, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400' },
      { id: 'women-sweat-2', name: 'Fleece Joggers', brand: 'ADIDAS', price: 59, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400' },
      { id: 'women-sweat-3', name: 'High Waist Joggers', brand: 'LULULEMON', price: 98, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400' }
    ],
    'Suits': [
      { id: 'women-suit-1', name: 'Power Suit', brand: 'HUGO BOSS', price: 799, image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=400' },
      { id: 'women-suit-2', name: 'Tailored Suit', brand: 'ZARA', price: 299, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400' },
      { id: 'women-suit-3', name: 'Linen Suit', brand: 'COS', price: 349, image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400' }
    ],
    'Jeans': [
      { id: 'women-jeans-1', name: 'Skinny Jeans', brand: 'LEVIS', price: 89, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400' },
      { id: 'women-jeans-2', name: 'Mom Jeans', brand: 'ZARA', price: 59, image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400' },
      { id: 'women-jeans-3', name: 'Wide Leg Jeans', brand: 'H&M', price: 49, image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400' }
    ],
    'Dresses': [
      { id: 'women-dress-1', name: 'Midi Dress', brand: 'ZARA', price: 79, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400' },
      { id: 'women-dress-2', name: 'Maxi Dress', brand: 'H&M', price: 59, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400' },
      { id: 'women-dress-3', name: 'Wrap Dress', brand: 'COS', price: 129, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400' }
    ],
    'Sweaters': [
      { id: 'women-sweater-1', name: 'Crew Neck Sweater', brand: 'EVERLANE', price: 89, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400' },
      { id: 'women-sweater-2', name: 'V-Neck Sweater', brand: 'UNIQLO', price: 59, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400' },
      { id: 'women-sweater-3', name: 'Turtleneck Sweater', brand: 'COS', price: 99, image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400' }
    ],
    'Capes & Ponchos': [
      { id: 'women-cape-1', name: 'Wool Cape', brand: 'BURBERRY', price: 899, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400' },
      { id: 'women-cape-2', name: 'Knit Poncho', brand: 'ZARA', price: 89, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' },
      { id: 'women-cape-3', name: 'Cashmere Cape', brand: 'COS', price: 299, image: 'https://images.unsplash.com/photo-1548126032-079d4e2cf76d?w=400' }
    ]
  }
};
