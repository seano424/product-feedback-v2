import Categories from './Categories'
import Statuses from './Statuses'
import Image from 'next/image'

const TopDeck = () => {
  return (
    <div className="fixed top-10 hidden h-56 w-full lg:block">
      <div className="container flex h-full justify-between gap-10">
        <div className="relative w-1/3 rounded-xl shadow-xl">
          <Image
            src="/images/background/tablet-header.png"
            alt="background image"
            layout="fill"
            className="rounded-xl"
          />
        </div>
        <div className="w-1/3 rounded-xl shadow-xl">
          <Categories />
        </div>
        <div className="w-1/3 rounded-xl shadow-xl">
          <Statuses />
        </div>
      </div>
    </div>
  )
}

export default TopDeck
