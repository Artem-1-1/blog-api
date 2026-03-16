import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import CreatePost from "./pages/CreatePost/CreatePost"
import Navbar from './components/Navbar/Navbar';
import { Login, Signup } from "@blog-api/packages";

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
          <Route
           path='/login'
           element={<Login />}
          />
          <Route
           path='/signup'
           element={<Signup />}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div> 
    </>
  )
}

export default App;
