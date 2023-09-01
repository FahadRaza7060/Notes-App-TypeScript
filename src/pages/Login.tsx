import { Link, useNavigate } from "react-router-dom";
import '../styles/Login.css';
import { useState } from "react";
import { supabase } from '../client';

import { setUser } from '../redux/slices/id/id';
import { useAppDispatch } from "../redux/hooks";

interface FormData {
  email: string;
  password: string;
}

interface LoginProps {
  setToken: (token: string) => void; 
}

function Login({ setToken }: LoginProps) { 

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      console.log(data);


      dispatch(setUser({
          userId: data?.user?.id
        })
      )

      setToken(data?.session?.access_token);
      navigate('/notes');

    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <h1> Login </h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email"><b> Email </b></label>
        <input type='email' placeholder='Email' name='email' value={formData.email} onChange={handleChange} />
        <label htmlFor="psw"><b> Password </b></label>
        <input type='password' placeholder='Password' name='password' value={formData.password} onChange={handleChange} />

        <button type="submit" > Login </button>
      </form>
      <p className='para'> Don't have an account? <Link to='/'> Sign Up </Link>  </p>
    </>
  )
}

export default Login; 