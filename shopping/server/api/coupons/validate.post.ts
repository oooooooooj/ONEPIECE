// 优惠券验证API
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { code } = body

  // 模拟优惠券数据
  const coupons = [
    { 
      code: 'SAVE10', 
      discountPercent: 0.1, 
      description: '10% discount',
      valid: true,
      expiresAt: '2025-12-31'
    },
    { 
      code: 'WELCOME20', 
      discountPercent: 0.2, 
      description: '20% welcome discount',
      valid: true,
      expiresAt: '2025-12-31'
    },
    { 
      code: 'VIP15', 
      discountPercent: 0.15, 
      description: '15% VIP discount',
      valid: true,
      expiresAt: '2025-12-31'
    },
    { 
      code: 'EXPIRED', 
      discountPercent: 0.1, 
      description: 'Expired coupon',
      valid: false,
      expiresAt: '2024-01-01'
    }
  ]

  const coupon = coupons.find(c => c.code === code?.toUpperCase())

  if (!coupon) {
    return {
      valid: false,
      message: 'Invalid coupon code'
    }
  }

  if (!coupon.valid) {
    return {
      valid: false,
      message: 'Coupon has expired'
    }
  }

  // 检查是否过期
  const now = new Date()
  const expiresAt = new Date(coupon.expiresAt)
  if (now > expiresAt) {
    return {
      valid: false,
      message: 'Coupon has expired'
    }
  }

  return {
    valid: true,
    discountPercent: coupon.discountPercent,
    description: coupon.description,
    message: `Coupon applied: ${coupon.description}`
  }
})