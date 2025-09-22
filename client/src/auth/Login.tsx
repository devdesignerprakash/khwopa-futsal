import { Input } from "@shadcn/components/ui/input";
import logo from "../assets/logo.png";
import { Button } from "@shadcn/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import type { AuthResponse, LoginDTO } from "../DTOs/authDTO";
import { UseAuth } from "../hooks/useAuth";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Alert, AlertDescription } from "@shadcn/components/ui/alert";
import UserContext from "../context/UserContext";

const Login = () => {
  const [loginData, setLoginData] = useState<LoginDTO>({
    phoneNumber: "",
    password: "",
  });
 
  const navigate = useNavigate();
  const {setUser,setIsLoggedIn}=useContext(UserContext)
  const { loading,AuthExecution, clearError, validationErrors } = UseAuth<
    AuthResponse,
    LoginDTO
  >("/auth/login");
  // const {isLoggedIn,setUser,user}=useContext(UserContext)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError(); // Clear previous errors

    try {
      const res = await AuthExecution(loginData);
      if(res){
        toast.success(res.message)
        setUser(res?.user)
        setIsLoggedIn(res.isLoggedIn)
          navigate("/")
      }
    } catch (err: any) {
      // Use the error message from the caught error instead of the hook state
      toast.error(err.message || "Login failed");
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-6">
        {/* Logo */}
        <img src={logo} alt="logo" className="w-20 h-20" />
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">Login</h1>

        {/* Form */}
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmitForm}
        >
          <Input
            type="text"
            placeholder="Enter Your Phone Number"
            className="w-full"
            name="phoneNumber"
            value={loginData.phoneNumber}
            onChange={handleInputChange}
          />
          {validationErrors && validationErrors.phoneNumber && (
            <Alert className="border-none whitespace-break-spaces text-blue-900 font-bold">
              <AlertDescription>
                {validationErrors.phoneNumber}
              </AlertDescription>
            </Alert>
          )}

          <Input
            type="password"
            placeholder="Password"
            className="w-full"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
          {validationErrors && validationErrors.password && (
            <Alert className="border-none whitespace-break-spaces text-blue-900 font-bold">
              <AlertDescription>{validationErrors.password}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 rounded" />
              Remember me
            </label>
            <Link
              to="/forget-password"
              className="text-indigo-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {loading ? (
            <Button
              className="w-full bg-[#233769] hover:bg-[#233779] text-white rounded-xl py-2"
              disabled
            >
              Please Wait..
            </Button>
          ) : (
            <Button
              className="w-full bg-[#233769] hover:bg-[#233769] text-white rounded-xl py-2"
              type="submit"
            >
              Login
            </Button>
          )}
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
