import React, { useState } from 'react';
import {Link ,useNavigate} from "react-router-dom";

function SignUp(props) {
    const [formdata , setformdata] = useState({});
    const[error,seterror] = useState(false);
    const[loading,setloading] = useState(false);
    const navigate  = useNavigate();

    function handleChange(e) {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        
        try {
          e.preventDefault();
          setloading(true);
          seterror(false);
            const res = await fetch("http://localhost:3000/api/auth/signup" ,{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body:JSON.stringify(formdata),
            }); 

            const data = await res.json();
            setloading(false);
            if(data.success == false){
              seterror(true);
              return;
            }

            navigate("/signin");

        } catch (error) {
            setloading(false);
            seterror(true);
        }
    }

    return (
        <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>

          

          <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                USERNAME
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

    

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Have an account?{' '}
            <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={() => navigate("/signin")}>
              Sign In
            </a>
          </p>
        </div>
      </div>
      <div>
        <p className='text-red-500 text-center'>{error ? "Something went wrong" : ""}</p>
      </div>
    </>
    );
}

export default SignUp;