import { useContext, useState } from "react";
import Navbar from "./components/Navbar"
import { ThemeContext } from "./contexts/ThemeContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ListItem from "./components/ListItem";

export default function App() {
  
  const context = useContext(ThemeContext);
  const { lists, addList, addItem, removeItem, toggleItemStatus } = useLocalStorage();
  
  const [newTask, setNewTask] = useState('');
  const [newList, setNewList] = useState('');
  const [listIdx, setListIdx] = useState(0);
  const [filter, setFilter] = useState<'none' | 'all' | 'pending' | 'completed'>('none');
  const [showFilters, setShowFilters] = useState(false);

  function handleCreateList(e: React.KeyboardEvent<HTMLInputElement>){
    if(e.key === 'Enter'){
      addList(newList);
      setNewList('');
    }
  }

  function handleAddItem(){
    const task = newTask.split(' ').join('');
    if(task !== ''){
      addItem(listIdx, newTask);
      setNewTask('');
    }
  }

  return (
    <div className={`relative ${context?.theme} dark:bg-black`}>
      <Navbar lists={lists} addList={addList} listIdx={listIdx} setListIdx={setListIdx} />
      <main className="h-[calc(100vh-52px)] bg-gray-100 dark:text-white dark:bg-gray-800">
        <div className="pt-6 px-6 md:px-10 xl:px-0 xl:w-6xl mx-auto flex gap-5">
          {/* My Lists */}
          <div className="w-3xs px-3 py-1 hidden md:block bg-white dark:bg-black shadow-sm">
            <p className="mb-3 text-xl font-semibold">My Lists</p>
            <div>
              {
                lists.map((list, idx) => {
                  return (
                    <div 
                      key={idx} 
                      className={`pl-1 flex items-center gap-2 ${idx === listIdx && 'bg-blue-50 dark:bg-gray-600'}`}
                    >
                      <svg className="stroke-black dark:stroke-white" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 6L21 6.00078M8 12L21 12.0008M8 18L21 18.0007M3 6.5H4V5.5H3V6.5ZM3 12.5H4V11.5H3V12.5ZM3 18.5H4V17.5H3V18.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p 
                        className="px-1 py-2 font-semibold"
                        onClick={() => {setListIdx(idx)}}
                        >
                        {list.title}
                      </p>
                    </div>
                  )
                })
              }
              <div className="flex items-center">
                <svg className=" stroke-black dark:stroke-white" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20M12 4V20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input 
                  className="w-full px-1 py-2 outline-0"
                  type="text"
                  placeholder="New List"
                  value={newList}
                  onChange={(e) => {setNewList(e.target.value)}}
                  onKeyDown={handleCreateList}
                />
              </div>
            </div>
          </div>

          {/* List Items */}
          <div className="flex-1">
            <div className="mb-3 flex justify-between">
              <p className="text-xl font-semibold">{lists[listIdx]?.title}</p>
              <div className="relative">
                <button 
                  className="px-2 py-1 flex items-center gap-1 rounded hover:bg-white dark:hover:bg-gray-700"
                  onClick={() => {setShowFilters(prev => !prev)}}
                  onBlur={() => {setShowFilters(false)}}
                >
                  <svg className=" stroke-black dark:stroke-white" width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>Filter</p>
                </button>
                {
                  showFilters &&
                  <div className="absolute -right-6 p-0.5 bg-white dark:bg-black shadow-sm rounded">
                    <p 
                      className="mb-1 py-0.5 text-center font-semibold border-b border-gray-200"
                    >
                      Filter by
                    </p>
                    <p 
                      className={`px-2 py-0.5 flex items-center gap-2 ${filter === 'all' && 'bg-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                      onMouseDown={(e) => {e.preventDefault()}}
                      onClick={() => {setFilter('all')}}
                    >
                      <svg className="stroke-black dark:stroke-white" width="16px" height="16px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
                        <line fill="none" strokeWidth="2" strokeMiterlimit="10" x1="25" y1="24" x2="47" y2="24"/>
                        <line fill="none" strokeWidth="2" strokeMiterlimit="10" x1="25" y1="34" x2="47" y2="34"/>
                        <line fill="none" strokeWidth="2" strokeMiterlimit="10" x1="25" y1="44" x2="47" y2="44"/>
                        <line fill="none" strokeWidth="2" strokeMiterlimit="10" x1="25" y1="54" x2="47" y2="54"/>
                        <line fill="none" strokeWidth="2" strokeMiterlimit="10" x1="21" y1="24" x2="17" y2="24"/>
                        <line fill="none" strokeWidth="2" strokeMiterlimit="10" x1="21" y1="34" x2="17" y2="34"/>
                        <line fill="none" strokeWidth="2" strokeMiterlimit="10" x1="21" y1="44" x2="17" y2="44"/>
                        <line fill="none" strokeWidth="2" strokeMiterlimit="10" x1="21" y1="54" x2="17" y2="54"/>
                        <polyline fill="none" strokeWidth="2" strokeMiterlimit="10" points="23,8 10,8 10,63 54,63 54,8 41,8 "/>
                        <polygon fill="none" strokeWidth="2" strokeMiterlimit="10" points="36,5 36,1 28,1 28,5 24,5 22,13 42,13 40,5 
                        "/>
                      </svg>
                      <span>All</span>
                    </p>
                    <p 
                      className={`px-2 py-0.5 flex items-center gap-2 ${filter === 'pending' && 'bg-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                      onMouseDown={(e) => {e.preventDefault()}}
                      onClick={() => {setFilter('pending')}}
                    >
                      <svg className="stroke-black dark:stroke-white" width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Pending</span>
                    </p>
                    <p 
                      className={`px-2 py-0.5 flex items-center gap-2 ${filter === 'completed' && 'bg-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                      onMouseDown={(e) => {e.preventDefault()}}
                      onClick={() => {setFilter('completed')}}
                    >
                      <svg className="stroke-black dark:stroke-white" width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 12.6111L8.92308 17.5L20 6.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Completed</span>
                    </p>
                  </div>
                }
              </div>
            </div>
            
            {
              filter !== 'none' &&
              <div className="mb-0.5 flex items-center justify-end gap-2">
                <p>
                  Filtered by <span className="capitalize">{filter}</span>
                </p>
                <svg 
                  className="fill-black dark:fill-white"
                  width="16px" 
                  height="16px" 
                  viewBox="0 0 1024 1024" 
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {setFilter('none')}}
                >
                  <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                </svg>
              </div>
            }

            {/* Add Task Input */}
            <div className="mb-5 px-5 flex items-center bg-white dark:bg-black border border-gray-100 shadow-sm">
              <svg className=" stroke-black dark:stroke-white" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12H20M12 4V20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input 
                className="flex-1 px-2 py-3 outline-0" 
                type='text' 
                placeholder='Add a task' 
                value={newTask}
                onChange={(e) => {setNewTask(e.target.value)}}
                onKeyDown={(e) => {
                  if(e.key === 'Enter'){
                    handleAddItem();
                  }
                }}
              />
              <button 
                className="px-2 py-1 font-semibold text-gray-700 dark:text-white border border-gray-300 dark:border-white rounded hover:text-black hover:border-black dark:hover:text-black dark:hover:bg-white"
                onClick={handleAddItem}
              >
                Add
              </button>
            </div>

            {/* Tasks */}
            {
              lists[listIdx]?.tasks.length > 0 &&
              <div className="px-5 bg-white dark:bg-black border border-gray-100 shadow-sm">
                {
                  filter !== 'completed' &&
                  lists[listIdx]?.tasks.map((item) => {
                    if(item.status === 'pending'){
                      return (
                        <ListItem 
                          key={item.id}
                          item={item} 
                          listIdx={listIdx} 
                          toggleItemStatus={toggleItemStatus} 
                          removeItem={removeItem} 
                        />
                      );
                    }
                    return null;
                  })
                }
                {
                  filter !== 'pending' &&
                  lists[listIdx]?.tasks.map((item) => {
                    if(item.status === 'completed'){
                      return (
                        <ListItem 
                          key={item.id}
                          item={item} 
                          listIdx={listIdx} 
                          toggleItemStatus={toggleItemStatus} 
                          removeItem={removeItem} 
                        />
                      );
                    }
                    return null;
                  })
                }
              </div>
            }
          </div>
        </div>
      </main>
    </div>
  )
}