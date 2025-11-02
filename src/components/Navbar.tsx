import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

export default function Navbar() {

  const context = useContext(ThemeContext);

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

  return (
    <nav className="shadow-sm dark:text-white">
      <div className="px-5 py-3 sm:px-10 xl:px-0 xl:w-6xl mx-auto flex justify-between">
        <p className="text-xl font-bold">Task Manager</p>
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
  )
}
