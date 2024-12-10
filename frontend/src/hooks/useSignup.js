import React, { useState } from 'react'
import toast from 'react-hot-toast'

const useSignup = () => {
  const [loading, setLoading] = useState(false)

  const signup = async ({fullName, username, password, confirmPassword, gender}) => {
    const success = handleErrors(fullName, username, password, confirmPassword, gender)
    if (!success) return

    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({fullName, username, password, confirmPassword, gender})
      })

      const date = await res.json()
      console.log(date)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  return {loading, signup}
}

const handleErrors = ({fullName, username, password, confirmPassword, gender}) => {
  // if (!fullName || !username || !password || !confirmPassword || !gender) {
  //   toast.error('Please fill all fields')
  //   return false
  // }

  if (password !== confirmPassword) {
    toast.error("Password doesn't match")
    return false;
  }

  // if (password.length < 6) {
  //   toast.error('Password must be atleast 6 characters')
  //   return false;
  // }

  return true;
}
export default useSignup