import NavBottom from './_components/nav-bottom/NavBottom'
import NavTop from './_components/nav-top/NavTop'

export default function Header() {
  return (
    <header className='sticky top-0 bg-background shadow-sm z-10'>
      <nav>
        <NavTop />
        <NavBottom />
      </nav>
    </header>
  )
}
