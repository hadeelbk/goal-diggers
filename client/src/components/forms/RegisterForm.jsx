import { useContext, useState } from "react"
import { UsersContext } from "../../App";
import { useNavigate } from 'react-router-dom';

function RegisterForm () {
  const {users, setUsers} = useContext(UsersContext)

  const basedUrl = 'http://localhost:3000/'
  const navigate = useNavigate()

  const [user, setUser] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    position: ''
  })

  const isFormComplete = 
  Object.values(user).every(value => value !== "") && 
  user.password === user.confirmPassword;

  const handleChange = (event) => {
    const {name, value} = event.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async (event) =>  {
    event.preventDefault()

    if (user.password !== user.confirmPassword) {
     alert("Passwords do not match!");
      return;
    }

    const newUser = {...user}

    try {
      const response = await fetch(basedUrl+'users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(newUser),   
      })

      if (response.ok) {
        const createdUser = await response.json();
        setUsers([...users, createdUser]);
        setUser({
          userName: '',
          password: '',
          confirmPassword: '',
          email: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          position: ''
        })
        navigate(`/users/${createdUser._id}`, {replace: true})
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='registerFormContainer'> 
      <form className='registerForm' onSubmit={handleSubmit} autoComplete="off" >
        <div className='registerFormElement'>
          <label htmlFor="userName">Username</label>
          <input type='text' name='userName' id='userName' autoComplete="off" placeholder="Username" value={user.userName} onChange={handleChange}/>
        </div>
       
        <div className='registerFormElement'>
          <label htmlFor="firstName">First Name</label>
          <input type='text' name='firstName' id='firstName' autoComplete="off" placeholder="First Name" value={user.firstName} onChange={handleChange}/>
        </div>

        <div className='registerFormElement'>
          <label htmlFor="lastName">Last Name</label>
          <input type='text' name='lastName' id='lastName'  autoComplete="off" placeholder="Last Name" value={user.lastName} onChange={handleChange}/>
        </div>

        <div className='registerFormElement'>
          <label htmlFor="email">Email</label>
          <input type='text' name='email' id='email' autoComplete="off" placeholder="Email" value={user.email} onChange={handleChange}/>
        </div>

        <div className="registerFormElement">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input type='date' name='dateOfBirth' id='dateOfBirth' autoComplete="off" placeholder="Date of Birth" value={user.dateOfBirth} onChange={handleChange} max={new Date().toISOString().split("T")[0]}/>
        </div>
        
        <div className='registerFormElement'>
          <label htmlFor="position">Preffered Position</label>
          <select name='position' id='position' value={user.position} onChange={handleChange}>
            <option value=''>Select Preferred Position</option>
            <option value='Goalkeeper'>Goalkeeper</option>
            <option value='Defender'>Defender</option>
            <option value='Midfielder'>Midfielder</option>
            <option value='Forward'>Forward</option>
          </select>
        </div>

        <div className='registerFormElement'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' autoComplete="off" placeholder="Password" value={user.password} onChange={handleChange} minLength="8" required autoComplete="new-password"/>
        </div>

        <div className='registerFormElement'>
          <input type='password' name='confirmPassword' id='confirmPassword' autoComplete="off" placeholder="Password Confirmation" value={user.confirmPassword} onChange={handleChange} minLength="8" required autoComplete="new-password"/>
        </div>
        
        <div className='registerFormElement'>
          <button type='submit' disabled={!isFormComplete}>Sign Up</button>
        </div>
      </form>
    </div>
  )
}


export default RegisterForm