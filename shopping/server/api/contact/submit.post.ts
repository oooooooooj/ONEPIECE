export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, subject, message } = body || {}
  if (!name || !email || !subject || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email' })
  }
  if (String(message).length > 500) {
    throw createError({ statusCode: 400, statusMessage: 'Message too long' })
  }
  return { ok: true }
})