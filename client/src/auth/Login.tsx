import { Input } from "@shadcn/components/ui/input"
import logo from '../assets/logo.png'
import { Button } from "@shadcn/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import type { LoginDTO, LoginResponse } from "../DTOs/authDTO"
import { UseAuth } from "../hooks/useAuth"
import React, { useState } from "react"
import { toast } from "react-toastify"



const Login = () => {
  const [loginData, setLoginData] = useState<LoginDTO>({
    phoneNumber: "",
    password: ""
  })
  const navigate = useNavigate()
  const { data, error, loading, AuthExecution } = UseAuth<LoginResponse, LoginDTO>('/auth/login')
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await AuthExecution(loginData)
    if (data){
      toast.success(data.message)
      navigate("/")

    }
    else {
      toast.error(error || "something went wrong")
    }
  }



  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-6">

        {/* Logo */}
        <img src={logo} alt="logo" className="w-20 h-20" />
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">Login</h1>
        {/* Form */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmitForm}>
          <Input type="text" placeholder="Enter Your Phone Number" className="w-full" name="phoneNumber" value={loginData.phoneNumber} onChange={handleInputChange} />
          <Input type="password" placeholder="Password" className="w-full" name="password" value={loginData.password} onChange={handleInputChange} />

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 rounded" />
              Remember me
            </label>
            <Link to="/forget-password" className="text-indigo-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button className="w-full bg-[#233769] hover:bg-[#233769] text-white rounded-xl py-2" type="submit">
            Login
          </Button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login