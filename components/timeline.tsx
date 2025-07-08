import { TimelineItem } from '@/types/timeline.interface'
import { useState } from 'react'


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
      <div style={{ maxHeight: showAll ? 'none' : '300px', overflow: 'hidden', transition: 'max-height 2s ease' }} className={`overflow-hidden transition-all ${showAll ? 'max-h-none pb-6' : 'max-h-40'}`}>
        {array.slice(0, showAll ? array.length : showedItems).map((timelineItem: TimelineItem, index) => {
          return (
            <div key={index} className="relative pl-8 sm:pl-32 py-1 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[7rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-cyan-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[7rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold w-24 h-8 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full p-2">{timelineItem.createdAt instanceof Date ? timelineItem.createdAt.toLocaleString() : timelineItem.createdAt}</time>
                <div className="text-lg font-medium dark:text-white">{timelineItem.status}</div>
              </div>
              <div className="text-textBdc text-sm">{timelineItem.comment}</div>
            </div>
          )
        })}
      </div>
      {!showAll && (
        <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-anthraciteBdc to-transparent rounded-2xl"></div>
      )}
      {array.length > showedItems && (
        <button className="text-emerald-400 hover:underline self-start pl-4 absolute bottom-[-10]" onClick={toggleShowAll} style={{ zIndex: 2 }}>
          {showAll ? 'Réduire' : 'En voir plus'}
        </button>
      )}
    </>
  )
}

export default Timeline