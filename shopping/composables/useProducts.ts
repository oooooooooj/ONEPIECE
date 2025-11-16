export interface Product {
  id: number
  name: string
  price: number
  image: string
  materialType: 'Stone' | 'Wood' | 'Metal'
  description?: string
  sku?: string
  attributes?: {
    color?: 'White' | 'Black' | 'Gray' | 'Brown' | 'Silver'
    size?: 'S' | 'M' | 'L'
  }
}

// 模拟产品数据
const allProducts: Product[] = [
  // Stone products - 高质量石材图片
  { id: 1, name: 'Marble Slab - White', price: 299.99, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  { id: 2, name: 'Granite Countertop - Black', price: 450.00, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  { id: 3, name: 'Quartz Tile - Gray', price: 189.99, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  { id: 4, name: 'Limestone Block - Beige', price: 320.00, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  { id: 5, name: 'Travertine Tile - Cream', price: 275.50, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  { id: 6, name: 'Slate Panel - Dark Gray', price: 199.99, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  { id: 7, name: 'Marble Slab - Carrara', price: 380.00, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  { id: 8, name: 'Granite Slab - Red', price: 420.00, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  
  // Wood products - 高质量木材图片
  { id: 9, name: 'Oak Hardwood Flooring', price: 125.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  { id: 10, name: 'Maple Wood Panel', price: 180.00, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  { id: 11, name: 'Cedar Plank - Natural', price: 95.50, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  { id: 12, name: 'Pine Timber Beam', price: 220.00, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  { id: 13, name: 'Walnut Hardwood', price: 350.00, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  { id: 14, name: 'Bamboo Flooring', price: 145.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  { id: 15, name: 'Teak Wood Panel', price: 480.00, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  { id: 16, name: 'Cherry Hardwood', price: 290.00, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  
  // Metal products - 高质量金属图片
  { id: 17, name: 'Stainless Steel Sheet', price: 150.00, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' },
  { id: 18, name: 'Aluminum Panel - Silver', price: 175.99, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' },
  { id: 19, name: 'Copper Sheet - Patina', price: 320.00, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' },
  { id: 20, name: 'Brass Panel - Gold', price: 280.50, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' },
  { id: 21, name: 'Steel Beam - Black', price: 450.00, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' },
  { id: 22, name: 'Titanium Sheet', price: 550.00, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' },
  { id: 23, name: 'Zinc Panel - Blue', price: 195.99, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' },
  { id: 24, name: 'Iron Sheet - Rustic', price: 165.00, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' },
  
  // Additional products to reach 48 total (4 pages x 12 products)
  { id: 25, name: 'Marble Slab - Calacatta', price: 520.00, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  { id: 26, name: 'Granite Tile - Brown', price: 180.00, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  { id: 27, name: 'Quartz Slab - White', price: 380.00, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  { id: 28, name: 'Sandstone Block', price: 240.00, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  { id: 29, name: 'Mahogany Hardwood', price: 420.00, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  { id: 30, name: 'Ash Wood Panel', price: 195.00, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  { id: 31, name: 'Birch Flooring', price: 155.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  { id: 32, name: 'Pine Wood Beam', price: 110.00, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  { id: 33, name: 'Steel Sheet - Galvanized', price: 140.00, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' },
  { id: 34, name: 'Aluminum Panel - Anodized', price: 210.00, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' },
  { id: 35, name: 'Bronze Sheet', price: 380.00, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' },
  { id: 36, name: 'Nickel Panel', price: 290.00, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' },
  { id: 37, name: 'Onyx Slab - Black', price: 480.00, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  { id: 38, name: 'Jade Stone Tile', price: 350.00, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  { id: 39, name: 'Ebony Hardwood', price: 550.00, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  { id: 40, name: 'Rosewood Panel', price: 440.00, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  { id: 41, name: 'Chrome Steel Sheet', price: 220.00, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' },
  { id: 42, name: 'Tungsten Panel', price: 480.00, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' },
  { id: 43, name: 'Soapstone Slab', price: 320.00, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  { id: 44, name: 'Basalt Tile', price: 195.00, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', materialType: 'Stone' },
  { id: 45, name: 'Hickory Hardwood', price: 280.00, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  { id: 46, name: 'Cypress Wood', price: 165.00, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', materialType: 'Wood' },
  { id: 47, name: 'Platinum Sheet', price: 650.00, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' },
  { id: 48, name: 'Silver Panel', price: 420.00, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', materialType: 'Metal' }
]

export const useProducts = () => {
  const getProducts = (filters?: {
    materialType?: 'Stone' | 'Wood' | 'Metal' | 'All'
    priceRange?: '0-500' | '500-1000' | 'All'
    color?: 'White' | 'Black' | 'Gray' | 'Brown' | 'Silver' | 'All'
    size?: 'S' | 'M' | 'L' | 'All'
  }) => {
    const enriched = allProducts.map((p) => {
      const colorsByMaterial: Record<Product['materialType'], Product['attributes']['color']> = {
        Stone: 'Gray',
        Wood: 'Brown',
        Metal: 'Silver'
      }
      const computedSku = p.sku ?? `BC-${String(p.id).padStart(4, '0')}`
      const computedAttrs = {
        color: p.attributes?.color ?? colorsByMaterial[p.materialType],
        size: p.attributes?.size ?? (p.id % 3 === 0 ? 'L' : p.id % 3 === 1 ? 'M' : 'S')
      }
      return { ...p, sku: computedSku, attributes: computedAttrs }
    })

    let filtered = [...enriched]

    if (filters?.materialType && filters.materialType !== 'All') {
      filtered = filtered.filter(p => p.materialType === filters.materialType)
    }

    if (filters?.priceRange && filters.priceRange !== 'All') {
      const [min, max] = filters.priceRange.split('-').map(Number)
      filtered = filtered.filter(p => p.price >= min && p.price <= max)
    }

    if (filters?.color && filters.color !== 'All') {
      filtered = filtered.filter(p => p.attributes?.color === filters.color)
    }

    if (filters?.size && filters.size !== 'All') {
      filtered = filtered.filter(p => p.attributes?.size === filters.size)
    }

    return filtered
  }

  const getProductById = (id: number) => {
    return allProducts.find(p => p.id === id)
  }

  return {
    allProducts,
    getProducts,
    getProductById
  }
}

