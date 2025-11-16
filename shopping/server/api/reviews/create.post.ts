// 创建产品评论API
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { productId, rating, comment } = body
  
  // 获取认证信息
  const headers = getHeaders(event)
  const token = headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    })
  }

  // 验证输入
  if (!productId || !rating || !comment) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Product ID, rating, and comment are required'
    })
  }

  if (rating < 1 || rating > 5) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Rating must be between 1 and 5'
    })
  }

  if (comment.length < 10 || comment.length > 500) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Comment must be between 10 and 500 characters'
    })
  }

  // 模拟用户数据（实际应用中应该从token解析）
  const user = {
    id: 1,
    name: 'Current User'
  }

  // 创建新评论
  const newReview = {
    id: Date.now(), // 使用时间戳作为ID
    productId: parseInt(productId),
    userId: user.id,
    userName: user.name,
    rating,
    comment,
    createdAt: new Date().toISOString(),
    helpful: 0
  }

  return {
    success: true,
    message: 'Review created successfully',
    review: newReview
  }
})