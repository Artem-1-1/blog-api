import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import CreatePost from "./pages/CreatePost/CreatePost"
import Navbar from './components/Navbar'; 

function App() {

  return (
    <>
    <div className='App'>
      <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route
           path='/'
           element={<Home />}
          />
          <Route
           path='/new'
           element={<CreatePost />}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div> 
    </>
  )
}

export default App
