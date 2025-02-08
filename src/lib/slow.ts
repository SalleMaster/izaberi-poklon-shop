export async function slow(delay: number = 1000) {
  if (process.env.NODE_ENV === 'development') {
    await new Promise((resolve) => {
      return setTimeout(resolve, delay)
    })
  }
  return
}
