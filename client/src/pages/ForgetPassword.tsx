import { Button } from "@shadcn/components/ui/button"
import { Input } from "@shadcn/components/ui/input"
import { Mail } from "lucide-react"

const ForgetPassword = () => {
    return (
        <div className="min-h-screen w-full items-center justify-center flex flex-col bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-6">
                <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
                <form className="w-full flex flex-col gap-4">
                    <div className="relative">
                        <Input type="email" placeholder="Email Address" className="  w-full px-9" />
                        <Mail className="absolute inset-y-2 left-2 " />
                    </div>
                    <Button className="w-full bg-[#233769] hover:bg-[#233769] text-white rounded-xl py-2">
                        Send Link
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword