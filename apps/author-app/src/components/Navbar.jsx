import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <Link to="/new">
          <h1>New Post</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar;