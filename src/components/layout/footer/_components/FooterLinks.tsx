import Link from 'next/link'

type FooterLinkGroupProps = {
  title: string
  links: { href: string; label: string; external?: boolean }[]
}

export default function FooterLinks({ title, links }: FooterLinkGroupProps) {
  return (
    <div>
      <h2 className='font-semibold mb-2.5'>{title}</h2>
      <ul className='space-y-2.5'>
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={link.label}
                className='text-sm'
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                aria-label={link.label}
                className='text-sm'
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
