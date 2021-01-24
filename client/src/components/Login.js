import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const initialFormValues = {

  username: '',
  password: ''

}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formValues, setFormValues] = useState(initialFormValues);
  const [loginError, setLoginError] = useState('');
  const history = useHistory();

  const handleChange = (e) => {

    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })

  }

  const userLogin = (e) => {
    e.preventDefault();
    
    axios.post(`http://localhost:5000/api/login`, formValues)
    .then((res) => {
      setLoginError('');
      const token = res.data.payload;
      localStorage.setItem('token', token);
      history.push('/bubblepage');
    })
    .catch((err) => {
      console.log(err);
      setLoginError('Login failed, invalid entry');
    })
    setFormValues(initialFormValues);
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>

      <h2>Login to your account.</h2>
      <form onSubmit={userLogin}>
        <label htmlFor='username'>
          Username: 
          <input 
            id='username' 
            name='username' 
            type='text' 
            value={formValues.username} 
            onChange={handleChange}
             />
        </label>
        <label htmlFor='password'>
          Password: 
          <input 
            id='password' 
            name='password'
            type='password'
            value={formValues.password} 
            onChange={handleChange}
             />
        </label>
        <button type='submit'>Login</button>
        {loginError && <p style={{color: 'crimson'}}>{loginError}</p>}
      </form>
    </>
  );
};

export default Login;