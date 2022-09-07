import Link from 'next/link'

export default function Header() {
  return (
    <nav className="bg-[#FAE6E9]">
      <div className="container flex items-center justify-between py-4">
        <Link href="/">
          <a className="text-xl font-bold">My Little Starter Kit</a>
        </Link>
        <Link href="http://github.com/seano424/starter-kit">
          <a target="_blank" className="button">
            See source
          </a>
        </Link>
      </div>
    </nav>
  )
}
