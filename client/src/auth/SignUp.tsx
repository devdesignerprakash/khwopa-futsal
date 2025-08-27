
import { Button } from '@shadcn/components/ui/button'
import { Input } from '@shadcn/components/ui/input'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png'



const SignUp = () => {
  return (
     <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-6">
         {/* Logo */}
        <img src={logo} alt="logo" className="w-20 h-20" />
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">Signup</h1>
        {/* Form */}
        <form className="w-full flex flex-col gap-4">
          <Input type="text" placeholder="Full Name" className="w-full" />
          <Input type="email" placeholder="Email Address" className="w-full" />
          <Input type="text" placeholder=" Address" className="w-full" />
          <Input type="text" placeholder="Phone Number" className="w-full" />
          <Input type="password" placeholder="Password" className="w-full" />

          
          <Button className="w-full bg-[#233769] hover:bg-[#233769] text-white rounded-xl py-2">
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