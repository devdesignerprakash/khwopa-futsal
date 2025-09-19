


import logo from '../assets/logo.png'
import { Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'



const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn]= useState<Boolean>(false)


    useEffect(()=>{
        const token = Cookies.get('token')
        console.log(token)
        if(token){
            setIsLoggedIn(true)
        }
    },[])

    const navigate=useNavigate()
    return (
        <div className=" w-fullb mx-auto bg-white shadow-lg p-2 m-2">
            <div className='flex items-center justify-between'>
                <div>
                    <img src={logo} alt="logo" className='h-20 w-20 cursor-pointer' onClick={()=>navigate("/")}/>
                </div>
                <div>
                    <ul className='flex gap-5'>
                        <Link to="/" className="relative font-bold text-sm cursor-pointer 
                 after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 
                 after:bg-[#122754] after:transition-all after:duration-300 
                 hover:after:w-full">
                            Home
                        </Link>
                        <Link to="/events" className="relative font-bold text-sm cursor-pointer 
                 after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 
                 after:bg-[#122754] after:transition-all after:duration-300 
                 hover:after:w-full">
                           Events
                        </Link>
                        <Link to="/schedule" className="relative font-bold text-sm cursor-pointer 
                 after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 
                 after:bg-[#122754] after:transition-all after:duration-300 
                 hover:after:w-full">
                            Schedule
                        </Link>
                        <Link to="/booking" className="relative font-bold text-sm cursor-pointer 
                 after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 
                 after:bg-[#122754] after:transition-all after:duration-300 
                 hover:after:w-full">
                            Bookings
                        </Link>
                        <Link to="/contact"className="relative font-bold text-sm cursor-pointer 
                 after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 
                 after:bg-[#122754] after:transition-all after:duration-300 
                 hover:after:w-full">
                           Contact
                        </Link>
                    </ul>
                </div>
                <div className='flex gap-4 items-center'>
                     <Link to="/login" className='w-25 text-center text-white font-bold bg-[#122754] hover:bg-[#122754] cursor-pointer p-2 rounded-lg'><span>{isLoggedIn?"Logout":"Login"}</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar