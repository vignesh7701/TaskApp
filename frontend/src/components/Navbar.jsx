import { useNavigate } from 'react-router-dom'
import TodoLogo from '../assets/Todologo.png'
import ProfileInfo from './ProfileInfo'
import SearchBar from './SearchBar'
import { useState } from 'react'
const Navbar = ({ user, onSearch, handleXSearch }) => {
  
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate('/');
  }

  const onClearSearch = () => { 
    handleXSearch();
    setQuery('');
  }
  const handleSearch = () => {
    if (query) {
      onSearch(query);
    }
   };


  return (
      <div className="flex justify-between items-center bg-sky-800 drop-shadow-md px-6 py-2 rounded-b-md">
          <div className='flex gap-3'>
              
          <img src={TodoLogo} alt="logo" className="w-10 h-10"/> 
          <h1 className="lg:flex hidden py-2 font-semibold text-2xl text-blue-100">Taskin</h1>
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