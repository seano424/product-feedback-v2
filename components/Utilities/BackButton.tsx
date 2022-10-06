import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ChevronLeftIcon } from '@heroicons/react/solid'
interface Props {
  variant: 'light' | 'dark'
}

const BackButton = ({ variant }: Props) => {
  const router = useRouter()
  const light = variant === 'light'
  return (
    <button
      onClick={() => router.back()}
      type="button"
      className="flex items-center gap-1 text-[14px] font-bold leading-[20px]"
    >
      <ChevronLeftIcon
        className={clsx('h-5 w-5', light ? 'text-white' : 'text-blue-navy')}
      />
      Go Back
    </button>
  )
}

export default BackButton
