import type { Task } from "../types/types"

interface IListItem {
  item: Task;
  listIdx: number;
  toggleItemStatus: (idx: number, taskId: string) => void;
  removeItem: (idx: number, taskId: string) => void;
}

export default function ListItem({item, listIdx, toggleItemStatus, removeItem}: IListItem) {
  return (
    <div className="flex items-center">
      <div 
        className={`w-5 h-5 flex items-center justify-center ${item.status === 'completed' && 'bg-black dark:bg-white'} border rounded-full group`}
        onClick={() => {toggleItemStatus(listIdx, item.id)}}
      >
        <svg className={`${item.status === 'pending' ? 'stroke-black hidden group-hover:block' : 'stroke-white dark:stroke-black'}`} width="16px" height="16px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 12.5L10.167 17L19.5 8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="flex-1 flex items-center border-b border-gray-200 group">
        <p
          className={`flex-1 px-2 py-3 ${item.status === 'completed' && 'text-gray-700 dark:text-gray-300 line-through'} hover:bg-gray-100 dark:hover:bg-gray-800 break-all`}
          >
          {item.task}
        </p>
        <svg 
          className="invisible group-hover:visible" 
          fill="#000000" 
          width="18px" 
          height="18px" 
          viewBox="-2.94 0 31.716 31.716" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {removeItem(listIdx, item.id)}}
        >
          <g transform="translate(-355.957 -579)">
            <path d="M376.515,610.716H361.231a2.361,2.361,0,0,1-2.358-2.359V584.1a1,1,0,0,1,2,0v24.255a.36.36,0,0,0,.358.359h15.284a.36.36,0,0,0,.358-.359V584.1a1,1,0,0,1,2,0v24.255A2.361,2.361,0,0,1,376.515,610.716Z"/>
            <path d="M365.457,604.917a1,1,0,0,1-1-1v-14a1,1,0,0,1,2,0v14A1,1,0,0,1,365.457,604.917Z"/>
            <path d="M372.29,604.917a1,1,0,0,1-1-1v-14a1,1,0,0,1,2,0v14A1,1,0,0,1,372.29,604.917Z"/>
            <path d="M380.79,585.1H356.957a1,1,0,0,1,0-2H380.79a1,1,0,0,1,0,2Z"/>
            <path d="M372.79,581h-7.917a1,1,0,1,1,0-2h7.917a1,1,0,0,1,0,2Z"/>
          </g>
        </svg>
      </div>
    </div>
  )
}
