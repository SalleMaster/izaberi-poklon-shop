import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function VerifyPage() {
  return (
    <div className='flex'>
      <Card className='w-full md:max-w-96 mx-auto'>
        <CardHeader>
          <CardTitle>Email verifikacija</CardTitle>
          <CardDescription>
            Poslali smo Vam email sa linkom za verifikaciju.
          </CardDescription>
          <CardDescription>
            Molimo proverite Vaš inbox i kliknite na link kako biste
            verifikovali Vaš nalog.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
