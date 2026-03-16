import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import styles from "../styles/form.module.css"

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(username, password);
  }

  return (
    <form className={styles.login} onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Username</label>
      <input type="text"
      onChange={(e) => setUsername(e.target.value)}
      value={username}
      required />

      <label>Password</label>
      <input type="password" 
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      required />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}