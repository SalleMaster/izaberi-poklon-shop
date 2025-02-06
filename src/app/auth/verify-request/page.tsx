import { redirect } from 'next/navigation'
import getSession from '@/lib/getSession'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function VerifyPage() {
  const session = await getSession()
  const user = session?.user

  if (user) {
    redirect('/')
  }
  return (
    <div className='flex'>
      <Card className='w-full md:max-w-96 mx-auto'>
        <CardHeader>
          <CardTitle>Email verifikacija</CardTitle>
          <CardDescription>
            Poslali smo Vam email sa linkom za verifikaciju.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Molimo proverite Vaš inbox i kliknite na link kako biste verifikovali
          Vaš nalog.
        </CardContent>
      </Card>
    </div>
  )
}
