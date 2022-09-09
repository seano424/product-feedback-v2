import Categories from './Categories'
import Statuses from './Statuses'
import Image from 'next/image'

const TopDeck = () => {
  return (
    <div className="fixed top-10 z-10 hidden h-56 w-full lg:block xl:left-10 xl:top-0 xl:mt-10 xl:h-full xl:w-80">
      <div className="container flex h-full justify-between gap-10 xl:flex-col xl:justify-start xl:px-0">
        <div className="relative w-1/3 rounded-xl shadow-xl xl:h-40 xl:w-full">
          <Image
            src="/images/background/tablet-header.png"
            alt="background image"
            layout="fill"
            className="rounded-xl"
          />
          <div className="container absolute inset-0 flex flex-col justify-end pb-10">
            <div className="flex flex-col gap-2 text-white">
              <h2 className="h2">Frontend Mentor</h2>
              <p className="body-1">Feedback Board</p>
            </div>
          </div>
        </div>
        <div className="w-1/3 rounded-xl shadow-xl  xl:w-full xl:border xl:border-gray-light">
          <Categories />
        </div>
        <div className="w-1/3 rounded-xl shadow-xl  xl:w-full xl:border xl:border-gray-light">
          <Statuses />
        </div>
      </div>
    </div>
  )
}

export default TopDeck
