import clsx from 'clsx'
import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/solid'

interface Props {
  variant: 'light' | 'dark'
}

const BackButton = ({ variant }: Props) => {
  const light = variant === 'light'
  return (
    <Link href="/">
      <a className="flex items-center gap-1 text-[14px] font-bold leading-[20px]">
        <ChevronLeftIcon
          className={clsx('h-5 w-5', light ? 'text-white' : 'text-blue-navy')}
        />
        Go Back
      </a>
    </Link>
  )
}

export default BackButton
