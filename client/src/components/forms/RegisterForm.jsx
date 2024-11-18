import { useContext, useState } from 'react'
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/apiService';

function RegisterForm() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [newUser, setNewUser] = useState({
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
    Object.values(newUser).every(value => value !== '') &&
    newUser.password === newUser.confirmPassword;

  const handleChange = (event) => {
    const { name, value } = event.target

    setNewUser({
      ...newUser,
      [name]: value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (newUser.password !== newUser.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const createdUser = await registerUser(newUser);
      setUser(createdUser);
      cleanForm();
      navigate(`/users/${createdUser._id}`, { replace: true })
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }

  const cleanForm = () => {
    setNewUser({
      userName: '',
      password: '',
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      position: ''
    })
  }

  return (
    <div className='registerFormContainer'>
      <form
        className='registerForm'
        onSubmit={handleSubmit}
      >
        <div className='registerFormElement'>
          <label htmlFor='userName'>Username</label>
          <input
            type='text'
            name='userName'
            id='userName'
            placeholder='Username'
            value={newUser.userName}
            onChange={handleChange}
          />
        </div>

        <div className='registerFormElement'>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            name='firstName'
            id='firstName'
            placeholder='First Name'
            value={newUser.firstName}
            onChange={handleChange}
          />
        </div>

        <div className='registerFormElement'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            name='lastName'
            id='lastName'
            placeholder='Last Name'
            value={newUser.lastName}
            onChange={handleChange}
          />
        </div>

        <div className='registerFormElement'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            id='email'
            placeholder='Email'
            value={newUser.email}
            onChange={handleChange}
          />
        </div>

        <div className='registerFormElement'>
          <label htmlFor='dateOfBirth'>Date of Birth</label>
          <input
            type='date'
            name='dateOfBirth'
            id='dateOfBirth'
            placeholder='Date of Birth'
            value={newUser.dateOfBirth}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className='registerFormElement'>
          <label htmlFor='position'>Preffered Position</label>
          <select
            name='position'
            id='position'
            value={newUser.position}
            onChange={handleChange}
          >
            <option value=''>Select Preferred Position</option>
            <option value='Goalkeeper'>Goalkeeper</option>
            <option value='Defender'>Defender</option>
            <option value='Midfielder'>Midfielder</option>
            <option value='Forward'>Forward</option>
          </select>
        </div>

        <div className='registerFormElement'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            value={newUser.password}
            onChange={handleChange}
            minLength='8'
            required
            autoComplete='off'
          />
        </div>

        <div className='registerFormElement'>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            autoComplete='off'
            placeholder='Password Confirmation'
            value={newUser.confirmPassword}
            onChange={handleChange}
            minLength='8'
            required
          />
        </div>

        <div className='registerFormElement'>
          <button
            type='submit'
            disabled={!isFormComplete}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm