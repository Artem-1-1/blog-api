import { useState } from "react";
import { useSignup } from "../hooks/useSignup"
import styles from "../styles/form.module.css"

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("User");
  const [validationError, setValidationError] = useState(null);
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError("The passwords don't match.");
      return;
    }
    
    await signup(username, password, confirmPassword, role)
  }  

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <form className={styles.signup} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Sign Up</h3>

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

      <label className={styles.label}>Confirm Password</label>
      <input
      className={styles.input}  
      type="password"
      onChange={(e) => setConfirmPassword(e.target.value)}
      value={confirmPassword}
      required />

      <label className={styles.label}>Role</label>
      <select
      className={styles.input} 
        value={role} onChange={handleChange}>
        <option value="User">User</option>
        <option value="Author">Author</option>
      </select>

      <button className={styles.button} disabled={isLoading}>Sign Up</button>
      {(validationError || error) && (
        <div className={styles.error}>{validationError || error}</div>
      )}
    </form>
  )
}