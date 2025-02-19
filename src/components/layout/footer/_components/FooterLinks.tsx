type FooterLinkGroupProps = {
  title: string
  links: { href: string; target?: string; label: string }[]
}

export default function FooterLinks({ title, links }: FooterLinkGroupProps) {
  return (
    <div>
      <h2 className='font-semibold mb-2.5'>{title}</h2>
      <ul className='space-y-2.5'>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} target={link.target ?? ''} className='text-sm'>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
