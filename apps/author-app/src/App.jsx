import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home/Home';
import CreatePost from "./pages/CreatePost/CreatePost";
import Drafts from './pages/Drafts/Drafts';
import Navbar from './components/Navbar/Navbar';
import { Login, Signup, useAuthContext, PostPage } from "@blog-api/packages";

function App() {
  const { user } = useAuthContext()

  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route
           path='/'
           element={user ? <Home /> : <Navigate to="/login"/>}
          />
          <Route
           path='/new'
           element={user ? <CreatePost /> : <Navigate to="/login"/>}
          />
          <Route
           path='/drafts'
           element={user ? <Drafts /> : <Navigate to="/login"/>}
          />
          <Route
           path='/post/:id'
           element={user ? <PostPage /> : <Navigate to="/login"/>}
          />
          <Route
           path='/login'
           element={!user ? <Login /> : <Navigate to="/"/>}
          />
          <Route
           path='/signup'
           element={!user ? <Signup /> : <Navigate to="/"/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div> 
  )
}

export default App;
