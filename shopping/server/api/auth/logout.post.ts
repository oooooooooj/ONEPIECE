// 用户登出API
export default defineEventHandler(async (event) => {
  return {
    success: true,
    message: 'Logout successful'
  }
})