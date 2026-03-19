import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import styles from "../styles/form.module.css"

export const Login = () => {
  console.log(styles)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(username, password);
  }

  return (
    <form className={styles.login} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Log In</h3>

      <label className={styles.label}>Username</label>
      <input
      className={styles.input} 
      type="text"
      onChange={(e) => setUsername(e.target.value)}
      value={username}
      required />

      <label className={styles.label}>Password</label>
      <input
      className={styles.input}  
      type="password" 
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      required />

      <button className={styles.button} disabled={isLoading}>Log in</button>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  )
}