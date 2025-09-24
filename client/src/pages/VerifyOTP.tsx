import { Input } from "@shadcn/components/ui/input";

import { useRef, useState, type ChangeEvent } from "react";
import { useLocation } from "react-router-dom";
import api from "../utils/axiosInterceptor";

const VerifyOTP = () => {
  const location = useLocation();
  const { userId } = location.state || {};
const [userEnteredOtp, setUserEnteredOtp] = useState<string[]>(Array(6).fill(""));
const [otp, setOtp] = useState<string>("")
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const handleInputChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Only allow 1 character
    if (value.length > 1) return;
     setUserEnteredOtp(prev => {
    const newOtp = [...prev];
    newOtp[index] = value;
    return newOtp;
  }); 
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };


  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value && inputRefs.current[index - 1]) {
      if (e.key === "Backspace") {
    setUserEnteredOtp(prev => {
      const newOtp = [...prev];
      newOtp[index] = "";
      return newOtp;
    });

      // Move focus to previous input if Backspace is pressed on empty input
      inputRefs.current[index - 1]?.focus();
    }
  }
}
   
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let mergedOtp=""
    userEnteredOtp.forEach((item)=>{
      mergedOtp= mergedOtp.concat(item)
       setOtp(mergedOtp)
    })
    if(otp.length<6){
      return
    }
   const response= await api.post(`/auth/verify-otp/${userId}`,{otp:otp})
   console.log(response)
  }

  return (
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
        <p className="text-[15px] text-slate-500">
          Enter the 6-digit verification code that was sent to your Email.
        </p>
      </header>
      <form id="otp-form" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-3">
          {[...Array(6)].map((_, i) => (
            <Input
              key={i}
              type="text"
              maxLength={1}
              pattern="\d*"
              ref={(el) => void (inputRefs.current[i] = el)}
              onChange={(e) => handleInputChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto mt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
          >
            Verify Account
          </button>
        </div>
      </form>
      <div className="text-sm text-slate-500 mt-4">
        Didn't receive code?{" "}
        <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">
          Resend
        </a>
      </div>
    </div>
  );
};

export default VerifyOTP;
