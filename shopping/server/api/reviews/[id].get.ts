// 获取产品评论API
export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, 'id')
  
  if (!productId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Product ID is required'
    })
  }

  // 模拟评论数据
  const reviews = [
    {
      id: 1,
      productId: 1,
      userId: 1,
      userName: 'John Doe',
      rating: 5,
      comment: 'Excellent quality marble! Very satisfied with the purchase.',
      createdAt: '2024-01-15T10:30:00Z',
      helpful: 12
    },
    {
      id: 2,
      productId: 1,
      userId: 2,
      userName: 'Jane Smith',
      rating: 4,
      comment: 'Good product, fast shipping. Would recommend.',
      createdAt: '2024-01-10T14:20:00Z',
      helpful: 8
    },
    {
      id: 3,
      productId: 2,
      userId: 3,
      userName: 'Mike Johnson',
      rating: 5,
      comment: 'Perfect for our construction project. High quality material.',
      createdAt: '2024-01-08T09:15:00Z',
      helpful: 15
    }
  ]

  const productReviews = reviews.filter(review => review.productId === parseInt(productId))

  // 计算平均评分
  const averageRating = productReviews.length > 0 
    ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length
    : 0

  // 计算评分分布
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: productReviews.filter(review => review.rating === rating).length,
    percentage: productReviews.length > 0 
      ? (productReviews.filter(review => review.rating === rating).length / productReviews.length) * 100
      : 0
  }))

  return {
    reviews: productReviews,
    summary: {
      totalReviews: productReviews.length,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution
    }
  }
})