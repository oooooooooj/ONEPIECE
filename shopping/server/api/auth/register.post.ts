// 用户注册API
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password, name } = body

  // 简单的验证
  if (!email || !password || !name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  // 模拟用户数据库
  const users = [
    { id: 1, email: 'demo@example.com', name: 'Demo User', password: 'demo123' },
    { id: 2, email: 'admin@example.com', name: 'Admin User', password: 'admin123', role: 'admin' }
  ]

  // 检查邮箱是否已存在
  const existingUser = users.find(u => u.email === email)
  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email already registered'
    })
  }

  // 创建新用户
  const newUser = {
    id: users.length + 1,
    email,
    name,
    password, // 在实际应用中应该加密
    role: 'user',
    createdAt: new Date().toISOString()
  }

  // 模拟保存用户
  users.push(newUser)

  return {
    success: true,
    message: 'Registration successful',
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role
    }
  }
})