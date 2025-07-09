import { TimelineItem } from '@/types/timeline.interface'
import { useState } from 'react'
import Image from 'next/image'


interface Props {
  array: TimelineItem[]
  showedItems?: number
}

const Timeline: React.FC<Props> = ({ array, showedItems = 2 }) => {
  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  return (
    <>
      <div style={{ maxHeight: showAll ? 'none' : 'min-content', overflow: 'hidden', transition: 'all 2s ease-in-out' }} className={`overflow-hidden transition-all ${showAll ? 'max-h-none pb-6' : 'max-h-40'}`}>
        {array.slice(0, showAll ? array.length : showedItems).map((timelineItem: TimelineItem, index) => {
          return (
            <div key={index} className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[7rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-cyan-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[7rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold w-24 h-8 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full p-2">{timelineItem.hour instanceof Date ? timelineItem.hour.toLocaleString() : timelineItem.hour}</time>
                <div className="text-lg font-medium dark:text-white">{timelineItem.title}</div>
              </div>
              <div className={`z-10 w-fit flex text-md font-medium dark:text-white bg-muted rounded-full px-2 py-1 mb-2 border ${timelineItem.imageSrc !== "" ? "absolute right-1 top-6 sm:top-[60px]" : ""}`}>
                <span className=" mr-2">{timelineItem.emojis}</span>
                <span>{timelineItem.place}</span>
              </div>
              {timelineItem.imageSrc !== "" ?
                <div className="relative">
                  <Image
                    src={timelineItem.imageSrc !== "" ? timelineItem.imageSrc : "/icon-512x512.png"}
                    alt={timelineItem.title}
                    width={400}
                    height={400}
                    className="rounded-2xl object-cover object-top w-full h-[30vh]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[100%] bg-gradient-to-t from-muted from-10% to-transparent rounded-xl"></div>
                  <div className="p-2 absolute bottom-0 left-0 text-sm sm:text-md">{timelineItem.comment}</div>
                </div>
                :
                <div className="text-sm sm:text-md">{timelineItem.comment}</div>
              }
            </div>
          )
        })}
      </div>
      {!showAll && (
        <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-muted to-transparent rounded-2xl"></div>
      )}
      {array.length > showedItems && (
        <button className="border text-emerald-400 cursor-pointer hover:underline p-2 rounded-full absolute right-0" onClick={toggleShowAll} style={{ zIndex: 2 }}>
          {showAll ? '➖ Réduire' : '➕ En voir plus'}
        </button>
      )}
    </>
  )
}

export default Timeline