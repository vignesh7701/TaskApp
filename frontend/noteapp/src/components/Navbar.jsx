import TodoLogo from '../assets/Todologo.png'
import ProfileInfo from './ProfileInfo'
const Navbar = () => {
  return (
      <div className="flex items-center justify-between bg-sky-700 drop-shadow-md py-2 px-6 rounded-b-md">
          <div className='flex gap-3'>
              
          <img src={TodoLogo} alt="logo" className="h-10 w-10"/> 
          <h1 className="text-blue-100 font-semibold text-2xl py-2">Taskin</h1>
      </div>
      <ProfileInfo />
    </div>
  )
}

export default Navbar