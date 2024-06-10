import { useNavigate } from 'react-router-dom'
import TodoLogo from '../assets/Todologo.png'
import ProfileInfo from './ProfileInfo'
import SearchBar from './SearchBar'
import { useState } from 'react'
const Navbar = ({user}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  const onClearSearch = () => { 
    setQuery('');
  }

  const handleSearch = () => { };
  return (
      <div className="flex items-center justify-between bg-sky-800 drop-shadow-md py-2 px-6 rounded-b-md">
          <div className='flex gap-3'>
              
          <img src={TodoLogo} alt="logo" className=" h-10 w-10"/> 
          <h1 className="hidden lg:flex text-blue-100 font-semibold text-2xl py-2">Taskin</h1>
      </div>
      <SearchBar value={query}
        onChange={({ target }) => {
        setQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        user={user}

      />
      <ProfileInfo user={user} onLogout={onLogout} />
    </div>
  )
}

export default Navbar