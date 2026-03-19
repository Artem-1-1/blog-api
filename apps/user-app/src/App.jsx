import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, Signup, useAuthContext, PostPage } from "@blog-api/packages";
import Navbar from './components/Navbar/Navbar';
import Home from "../../author-app/src/pages/Home/Home"


function App() {
  const { user } = useAuthContext()

  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route
            path='/'
            element={user ? <Home /> : <Navigate to="/login"/>}
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
