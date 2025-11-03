import NavTop from './_components/nav-top/NavTop'
import NavBottom from './_components/nav-bottom/NavBottom'

export default function Header() {
  return (
    <header className='sticky top-0 bg-background shadow-xs z-10'>
      <nav>
        <NavTop />
        <NavBottom />
      </nav>
    </header>
  )
}
