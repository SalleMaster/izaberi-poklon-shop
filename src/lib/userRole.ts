import getSession from '@/lib/getSession'

const getUserRole = async () => {
  const session = await getSession()
  const user = session?.user

  return user?.role
}

export default getUserRole
