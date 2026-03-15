import { useState } from "react"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
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

      <button>Log in</button>
    </form>
  )
}

export default Login;