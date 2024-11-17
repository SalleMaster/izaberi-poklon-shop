export const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timeOutId: NodeJS.Timeout
  return function (...args: any[]) {
    if (timeOutId) {
      clearTimeout(timeOutId)
    }
    timeOutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export const debouncePromise = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number
) => {
  let timeOutId: NodeJS.Timeout
  let resolveList: ((value: any) => void)[] = []

  return function (...args: any[]) {
    if (timeOutId) {
      clearTimeout(timeOutId)
    }

    return new Promise((resolve) => {
      resolveList.push(resolve)
      timeOutId = setTimeout(async () => {
        const result = await fn(...args)
        resolveList.forEach((res) => res(result))
        resolveList = []
      }, delay)
    })
  } as T
}

export const throttlePromise = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number
) => {
  let lastCall = 0
  let timeoutId: NodeJS.Timeout | null = null
  let resolveList: ((value: any) => void)[] = []

  return function (...args: any[]) {
    const now = Date.now()

    return new Promise((resolve) => {
      resolveList.push(resolve)

      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }

      if (now - lastCall >= delay) {
        lastCall = now
        fn(...args).then((result) => {
          resolveList.forEach((res) => res(result))
          resolveList = []
        })
      } else {
        timeoutId = setTimeout(
          () => {
            lastCall = Date.now()
            fn(...args).then((result) => {
              resolveList.forEach((res) => res(result))
              resolveList = []
            })
          },
          delay - (now - lastCall)
        )
      }
    })
  } as T
}
