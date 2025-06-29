import logo from '/public/logo.png';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-md border-t border-blue-200 dark:border-gray-800 text-gray-800 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img src={logo} alt="Chermiti Logo" className="h-10 w-auto md:h-12 md:w-auto object-contain p-0 bg-transparent border-none outline-none shadow-none" />
            </div>
            <p className="text-gray-800 dark:text-gray-400 mb-6 max-w-md">
              Experience unparalleled luxury living in the heart of the metropolitan district. 
              Chermiti Building represents the pinnacle of modern architectural design and premium amenities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-800 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-800 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-800 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300 dark:text-blue-400">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-800 dark:text-gray-400">123 Skyline Avenue<br />Metropolitan District</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-800 dark:text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-800 dark:text-gray-400">info@skylinetower.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300 dark:text-blue-400">Quick Links</h4>
            <div className="space-y-2">
              <a href="#hero" className="block text-gray-800 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">Home</a>
              <a href="#entrance-view" className="block text-gray-800 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">Entrance</a>
              <a href="#residential-floors" className="block text-gray-800 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">Residences</a>
              <a href="#penthouse-clouds" className="block text-gray-800 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">Penthouse</a>
              <a href="#contact" className="block text-gray-800 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">Contact</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-800 dark:text-gray-500">
            © 2024 Chermiti Building. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};
