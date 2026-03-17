import { Link } from "react-router-dom"
import { useState } from 'react';
import style from "./navbar.module.css";
import { useLogout, useAuthContext } from "@blog-api/packages"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logout  = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout()
  }

  return (
    <header className={style.header}>
      <div className={style.container}>
        <nav className={style.nav}>
          {user && (
            <>
            <div className={style.dropdown}>
              <span className={style.username} onClick={() => setIsOpen(!isOpen)}>
                {user.username}
              </span>
              {isOpen && (
                <div className={style.menu} onClick={() => setIsOpen(false)}>
                <Link to="/">Home</Link>
                <Link to="/new">New Post</Link>
                <Link to="/drafts">Drafts</Link>
              </div>
            )}
          </div>
          <div className={style.navRight}>
            <button className={style.logout} onClick={handleClick}>Log out</button>
          </div>
          </>
          )}
          {!user && (
          <div className={style.rightGroup}>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar;