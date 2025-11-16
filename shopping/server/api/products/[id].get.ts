export default defineEventHandler(async (event) => {
  const rawId = getRouterParam(event, 'id')
  if (!rawId) {
    throw createError({ statusCode: 400, statusMessage: 'Product ID is required' })
  }

  const id = parseInt(rawId)
  if (!Number.isFinite(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid product ID' })
  }

  const { useProducts } = await import('~/composables/useProducts')
  const { getProducts } = useProducts()
  const products = getProducts({})
  const product = products.find(p => p.id === id)

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  return product
})