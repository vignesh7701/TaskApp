import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'


const routes = (

  <Router>
    <Routes>
      <Route path="/dashboard" element={<Home />} />
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>

    </Router>


)
const App = () => {
  return (
    <div >{routes}</div>
  )
}

export default App