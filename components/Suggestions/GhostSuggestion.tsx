import { ArrowUp, Comments } from '@/icons/index'

const GhostSuggestion = () => {
  return (
    <section>
      <div className="flex w-full items-center justify-between rounded-xl bg-white/80 p-5 opacity-40 shadow-xl">
        <div className="flex w-full items-center gap-10">
          <div className="button-small hidden items-center gap-2 text-blue-navy lg:flex">
            <ArrowUp />
            10
          </div>
          <div className="flex w-full flex-col items-start gap-3">
            <p className="h3">Lorem ipsum dolor sit </p>
            <p className="body-1 text-gray">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam,
              quia.
            </p>
            <div className="button-small">UI</div>
            <div className="flex w-full items-center justify-between lg:hidden">
              <button className="button-small flex items-center gap-2 text-blue-navy">
                <ArrowUp />
                10
              </button>
              <div className="flex items-center gap-2">
                <Comments />
                100
              </div>
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Comments />
          88
        </div>
      </div>
    </section>
  )
}

export default GhostSuggestion
