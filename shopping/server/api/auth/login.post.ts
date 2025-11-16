// 用户登录API
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // 简单的验证
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required'
    })
  }

  // 模拟用户数据库
  const users = [
    { id: 1, email: 'demo@example.com', name: 'Demo User', password: 'demo123' },
    { id: 2, email: 'admin@example.com', name: 'Admin User', password: 'admin123', role: 'admin' }
  ]

  // 查找用户
  const user = users.find(u => u.email === email && u.password === password)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password'
    })
  }

  // 生成简单的token（实际应用中应该使用JWT等）
  const token = btoa(JSON.stringify({ 
    userId: user.id, 
    email: user.email, 
    role: user.role || 'user',
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24小时过期
  }))

  return {
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || 'user'
    }
  }
})