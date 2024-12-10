import React from 'react'
import GenderCheck from './GenderCheck'
import { Link } from 'react-router-dom'

const SingUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'>ChatApp</span>
        </h1>
        <form>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Full Name</span>
            </label>
            <input type='text' placeholder='Enter Name' className='input input-bordered w-full h-10' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Username</span>
            </label>
            <input type='text' placeholder='Enter Username' className='input input-bordered w-full h-10' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Password</span>
            </label>
            <input type='password' placeholder='Enter Password' className='input input-bordered w-full h-10' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Confirm Password</span>
            </label>
            <input type='password' placeholder='Enter Password' className='input input-bordered w-full h-10 mb-3' />
          </div>
          <GenderCheck />
          <Link to='/login' className='text-sm hover:underline text-white mt-4 inline-block'>Already have an account?</Link>
          <div>
            <button className='btn btn-block btn-sm mt-2'>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SingUp