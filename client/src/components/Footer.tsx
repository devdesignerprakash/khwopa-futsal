import { Phone, MapPin, Mail } from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#233769] text-white w-full mt-2">
      <div className=" max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">
        
        {/* Logo and Name */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
          <img className="w-24 h-24 rounded-lg shadow-md" src={logo} alt="logo" />
          <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            Khwopa Futsal And Training Center
          </h1>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Quick Links</h2>
          <ul className="space-y-1">
            <li className="hover:text-gray-300 cursor-pointer">Home</li>
            <li className="hover:text-gray-300 cursor-pointer">Events</li>
            <li className="hover:text-gray-300 cursor-pointer">Bookings</li>
            <li className="hover:text-gray-300 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h2 className="font-semibold text-lg mb-2">Contact Us</h2>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-white" />
            <span>01-5177177</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-white" />
            <span>info@khwopafutsal.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-white" />
            <a
              href="https://goo.gl/maps/6rk7z6uKsdQ2"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Bhaktapur, Nepal
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1a2850] text-center py-4 text-sm">
        © {new Date().getFullYear()} Khwopa Futsal And Training Center. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
