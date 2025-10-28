// import { auth } from '@/auth-old'
// import { cache } from 'react'

// export default cache(auth)

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { cache } from 'react'

export default cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  })
})
