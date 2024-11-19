import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiService';
import { UserContext } from '../App';

function LoginPage() {
  const { setUser } = useContext(UserContext)
  const [login, setLogin] = useState({
    usernameOrEmail: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setLogin({
      ...login,
      [name]: value
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { usernameOrEmail, password } = login;
  
    try {
      const user = await loginUser({ usernameOrEmail, password });
  
      if (user?.error) {
        alert(user.error || "Invalid username/email or password.");
      } else if (user) {
        console.log('Logged in user:', user);
        setUser(user);
        navigate(`/`, { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="loginFormContainer">
      <form className='loginForm' onSubmit={handleSubmit}>
        <div className="loginFormElement">
          <label htmlFor="usernameOrEmail">Username or Email</label>
          <input
            type='text'
            name='usernameOrEmail'
            id='usernameOrEmail'
            placeholder='Username or Email'
            value={login.usernameOrEmail}
            onChange={handleChange}
          />
        </div>

        <div className="loginFormElement">
          <label htmlFor="password">Password</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            value={login.password}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div className="loginFormElement">
          <button
            type="submit"
            disabled={!login.usernameOrEmail || !login.password}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage