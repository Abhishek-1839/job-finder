import './App.css'
// import { Login, Register, Home, JobDetail, Create, Edit } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import JobDetails from './pages/jobDetail/JobDetails'
import { JobPost } from './pages/create/JobPost'
import Edit from './pages/edit/Edit'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/create" element={<JobPost />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
