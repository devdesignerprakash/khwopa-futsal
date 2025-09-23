
import { Button } from '@shadcn/components/ui/button'
import { Input } from '@shadcn/components/ui/input'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../assets/logo.png'
import { useState } from 'react'
import type { RegisterDTO } from '../DTOs/authDTO'
import type { AuthResponse } from '../DTOs/authDTO'
import { UseAuth } from '../hooks/useAuth'
import {toast} from 'react-toastify'
import { Alert, AlertDescription } from "@shadcn/components/ui/alert";


const SignUp = () => {
  const [registerData,setRegisterData]=useState<RegisterDTO>({
    fullName:"",
    email:"",
    address:"",
    phoneNumber:"",
    password:""
  })
  const navigate=useNavigate()
  const { loading, AuthExecution, clearError, validationErrors } = UseAuth<
    AuthResponse,
    RegisterDTO
  >("/auth/register");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clearError(); // Clear previous errors

    try {
      const res = await AuthExecution(registerData);
      if (res) {
        toast.success(res.message);
        navigate("/verify-otp",{state:{userId:res?.userId}});
      }
    } catch (err: any) {
      // Use the error message from the caught error instead of the hook state
      toast.error(err.message || "Registration failed");
    }
  }

  return (
     <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-6">
         {/* Logo */}
        <img src={logo} alt="logo" className="w-20 h-20" />
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">Signup</h1>
        {/* Form */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmitForm}>
          <Input type="text" name="fullName" placeholder="Full Name" className="w-full" onChange={handleInputChange} />
          {validationErrors && validationErrors.fullName && (
            <Alert className="border-none whitespace-break-spaces text-blue-900 font-bold">
              <AlertDescription>
                {validationErrors.fullName}
              </AlertDescription>
            </Alert>
          )}
          <Input type="email" name="email" placeholder="Email Address" className="w-full" onChange={handleInputChange} />
          {validationErrors && validationErrors.email && (
            <Alert className="border-none whitespace-break-spaces text-blue-900 font-bold">
              <AlertDescription>
                {validationErrors.email}
              </AlertDescription>
            </Alert>
          )}
          <Input type="text" name="address" placeholder="Address" className="w-full" onChange={handleInputChange} />
          {validationErrors && validationErrors.address && (
            <Alert className="border-none whitespace-break-spaces text-blue-900 font-bold">
              <AlertDescription>
                {validationErrors.address}
              </AlertDescription>
            </Alert>
          )}
          <Input type="text" name="phoneNumber" placeholder="Phone Number" className="w-full" onChange={handleInputChange} />
          {validationErrors && validationErrors.phoneNumber && (
            <Alert className="border-none whitespace-break-spaces text-blue-900 font-bold">
              <AlertDescription>
                {validationErrors.phoneNumber}
              </AlertDescription>
            </Alert>
          )}
          <Input type="password" name="password" placeholder="Password" className="w-full" onChange={handleInputChange} />
          {validationErrors && validationErrors.password && (
            <Alert className="border-none whitespace-break-spaces text-blue-900 font-bold">
              <AlertDescription>
                {validationErrors.password}
              </AlertDescription>
            </Alert>
          )}
          <Button className="w-full bg-[#233769] hover:bg-[#233769] text-white rounded-xl py-2" type='submit'>
            Signup
          </Button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp