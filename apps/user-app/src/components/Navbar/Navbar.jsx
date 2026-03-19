import { Link } from "react-router-dom"
import style from "./navbar.module.css";
import { useLogout, useAuthContext } from "@blog-api/packages"

const Navbar = () => {
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
          <span className={style.username}>
            {user.username}
          </span>
          <div className={style.navRight}>
            <button type="button" className={style.logout} onClick={handleClick}>Log out</button>
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