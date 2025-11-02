import { useContext, useState } from "react"
import { ThemeContext } from "../contexts/ThemeContext"
import type { List } from "../types/types";

interface INavbar {
  lists: List[];
  addList: (title: string) => void;
  listIdx: number;
  setListIdx: React.Dispatch<React.SetStateAction<number>>;
}

export default function Navbar({lists, addList, listIdx, setListIdx}: INavbar) {

  const context = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [newList, setNewList] = useState('');

  function handleToggleTheme(){
    if(context){
      context.setTheme(prev => { 
        const updatedTheme = prev === 'light' ? "dark" : "light";
        localStorage.removeItem('theme');
        localStorage.setItem('theme', updatedTheme);
        return updatedTheme; 
      });
    }
  }

  function handleCreateList(e: React.KeyboardEvent<HTMLInputElement>){
    if(e.key === 'Enter'){
      addList(newList);
      setNewList('');
    }
  }

  return (
    <>
      <nav className="shadow-sm dark:text-white">
        <div className="px-6 py-3 md:px-10 xl:px-0 xl:w-6xl mx-auto flex justify-between">
          <div className="flex items-center gap-5">
            <button className="block md:hidden" onClick={() => {setMenuOpen(curr => !curr)}}>
              <svg className={`fill-black dark:fill-white`} width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z" />
              </svg>
            </button>
            <p className="text-xl font-bold">Task Manager</p>
          </div>
          <div className="relative p-0.5 flex items-center rounded-md" onClick={handleToggleTheme}>
            <svg className="block dark:hidden" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg className="hidden dark:block" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.39703 11.6315C3.39703 16.602 7.42647 20.6315 12.397 20.6315C15.6858 20.6315 18.5656 18.8664 20.1358 16.23C16.7285 17.3289 12.6922 16.7548 9.98282 14.0455C7.25201 11.3146 6.72603 7.28415 7.86703 3.89293C5.20697 5.47927 3.39703 8.38932 3.39703 11.6315ZM21.187 13.5851C22.0125 13.1021 23.255 13.6488 23 14.5706C21.7144 19.2187 17.4543 22.6315 12.397 22.6315C6.3219 22.6315 1.39703 17.7066 1.39703 11.6315C1.39703 6.58874 4.93533 2.25845 9.61528 0.999986C10.5393 0.751502 11.0645 1.99378 10.5641 2.80935C8.70026 5.84656 8.83194 10.0661 11.397 12.6312C13.9319 15.1662 18.1365 15.3702 21.187 13.5851Z" fill="#FFFFFF"/>
            </svg>
          </div>
        </div>
      </nav>
      {
        menuOpen &&
        <div className="fixed top-13 z-100 w-full min-h-screen flex md:hidden">
          <div className="w-60 p-6 bg-white dark:bg-black dark:text-white border-t border-gray-100">
            <p className="mb-2 text-xl font-semibold">My Lists</p>
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
                      onClick={() => {
                        setListIdx(idx); 
                        setMenuOpen(false);
                      }}
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
          <div className="flex-1 bg-gray-200 opacity-60" onClick={() => {setMenuOpen(false)}}>
          </div>
        </div>
      }
    </>
  )
}