
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Users, Award, Mail, Clock, MapPin } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { festSettings, events, departments } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-gray-200 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex space-x-6 text-red-600">
            <span>MITS Radio 90.8 CRS</span>
            <span>NAAC</span>
            <span>NIRF</span>
            <span>UGC Affairs</span>
            <span>Newsletter</span>
            <span>Contact Us</span>
          </div>
          <div className="flex space-x-4 text-gray-600">
            <span>📞 +91-8712655132 / 4 / 8, 08571280255</span>
            <span>🔒 Moodle Login</span>
            <span>✉️ admissions@mits.ac.in</span>
            <span>🔍 Search</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/lovable-uploads/794b504a-8da1-49a5-8bc0-d453c445dcfc.png" alt="MITS Logo" className="h-16" />
              <div>
                <h1 className="text-2xl font-bold text-red-600">MITS</h1>
                <p className="text-sm text-gray-600">MADANAPALLE</p>
                <div className="text-blue-600 font-semibold">
                  <p>MADANAPALLE INSTITUTE OF</p>
                  <p>TECHNOLOGY & SCIENCE</p>
                  <p className="text-xs text-gray-500">(UGC-AUTONOMOUS INSTITUTION)</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">{festSettings.festName}</h2>
              <p className="text-lg text-gray-600">{festSettings.festSubtitle}</p>
              <Badge className="bg-red-600 text-white mt-2">
                {new Date(festSettings.eventDate).toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 py-3">
            <a href="#home" className="hover:bg-red-700 px-3 py-2 rounded transition-colors">Home</a>
            <button onClick={() => navigate('/events')} className="hover:bg-red-700 px-3 py-2 rounded transition-colors">Events</button>
            <a href="#departments" className="hover:bg-red-700 px-3 py-2 rounded transition-colors">Departments</a>
            <button onClick={() => navigate('/register')} className="hover:bg-red-700 px-3 py-2 rounded transition-colors">Registration</button>
            <a href="#about" className="hover:bg-red-700 px-3 py-2 rounded transition-colors">About</a>
            <a href="#contact" className="hover:bg-red-700 px-3 py-2 rounded transition-colors">Contact</a>
            <button onClick={() => navigate('/login')} className="hover:bg-red-700 px-3 py-2 rounded transition-colors">Admin Login</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-cover bg-center h-96" style={{backgroundImage: 'url(/lovable-uploads/794b504a-8da1-49a5-8bc0-d453c445dcfc.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Welcome to {festSettings.festName}
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {festSettings.festDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
                onClick={() => navigate('/register')}
              >
                Register Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3"
                onClick={() => navigate('/events')}
              >
                View Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">{events.length}+</div>
              <div className="text-gray-600">Events</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">{departments.length}</div>
              <div className="text-gray-600">Departments</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">2000+</div>
              <div className="text-gray-600">Participants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">3</div>
              <div className="text-gray-600">Days</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes/Departments Section */}
      <section id="departments" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Programmes Offered</h2>
            <div className="flex justify-center space-x-8 mb-8">
              <button className="text-red-600 border-b-2 border-red-600 pb-2 font-semibold">
                Under Graduate Programmes
              </button>
              <button className="text-gray-600 hover:text-red-600 pb-2">
                Post Graduate Programmes
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Under Graduate Programmes</h3>
            <h4 className="text-xl font-semibold text-gray-700 mb-6">Engineering</h4>
            <div className="text-right mb-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Admission Details
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-3">{dept.icon}</div>
                  <CardTitle className="text-gray-800 text-lg leading-tight">{dept.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <Badge className="bg-red-600 text-white mb-4">
                    {events.filter(e => e.department === dept.name).length} Events
                  </Badge>
                  <p className="text-gray-600 text-sm">
                    {dept.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-bold mb-4">MITS FEST</h5>
              <p className="text-gray-300 text-sm">
                {festSettings.festDescription.substring(0, 100)}...
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><button onClick={() => navigate('/events')} className="text-gray-300 hover:text-white transition-colors">Events</button></li>
                <li><a href="#departments" className="text-gray-300 hover:text-white transition-colors">Departments</a></li>
                <li><button onClick={() => navigate('/register')} className="text-gray-300 hover:text-white transition-colors">Register</button></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Categories</h5>
              <ul className="space-y-2 text-sm">
                <li><span className="text-gray-300">Technical</span></li>
                <li><span className="text-gray-300">Cultural</span></li>
                <li><span className="text-gray-300">Workshops</span></li>
                <li><span className="text-gray-300">Competitions</span></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Contact Info</h5>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>{festSettings.venue}</p>
                <p>Phone: {festSettings.contactPhone}</p>
                <p>Email: {festSettings.contactEmail}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 MITS FEST. All rights reserved. Built with ❤️ for innovation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
