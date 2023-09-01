import { Link } from "react-router-dom";
import '../styles/SignUp.css';
import { supabase } from '../client';
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
}

function SignUp() {

  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', password: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });

      if (error) throw error;
      alert('Check your email for verification link');
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <h1> Sign Up </h1>
      <p> Please fill in this form to create an account. </p>    
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"><b>Name</b></label>
        <input type='text' placeholder='Name' name='name' value={formData.name} onChange={handleChange} />
        <label htmlFor="email"><b>Email</b></label>
        <input type='email' placeholder='Email' name='email' value={formData.email} onChange={handleChange} />
        <label htmlFor="psw"><b>Password</b></label>
        <input type='password' placeholder='Password' name='password' value={formData.password} onChange={handleChange} />

        <button type="submit" > Create Account </button>
      </form>
      <p className='para'> Already have an account? <Link to='/login'> Login </Link> </p>
    </>
  )
}

export default SignUp
