import { redirect } from 'next/navigation'
import getSession from '@/lib/getSession'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { NotificationAlert } from '@/components/custom/NotificationAlert'

export default async function VerifyPage() {
  const session = await getSession()
  const user = session?.user

  if (user) {
    redirect('/')
  }
  return (
    <div className='flex flex-col gap-6'>
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
      <NotificationAlert
        description='Ukoliko ne vidite email u Vašem glavnom inbox-u, proverite
          "Promotions" i "Spam" folder, ili pokušajte ponovo da se prijavite.'
        variant='info'
        className='w-full md:max-w-96 mx-auto'
      />
    </div>
  )
}
