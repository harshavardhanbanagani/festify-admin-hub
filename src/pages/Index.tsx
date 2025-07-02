
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="mb-6">
            <img src="/lovable-uploads/794b504a-8da1-49a5-8bc0-d453c445dcfc.png" alt="MITS Logo" className="h-20 mx-auto mb-4" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {festSettings.festName}
          </h1>
          <p className="text-xl mb-2">{festSettings.festSubtitle}</p>
          <Badge className="bg-white text-red-600 text-lg px-4 py-2 mb-8">
            {new Date(festSettings.eventDate).toLocaleDateString('en-IN', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </Badge>
          <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
            {festSettings.festDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg"
              onClick={() => navigate('/register')}
            >
              <CalendarCheck className="mr-2" />
              Register Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 text-lg"
              onClick={() => navigate('/events')}
            >
              View Events
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            <a href="#home" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">Home</a>
            <button onClick={() => navigate('/events')} className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">Events</button>
            <a href="#departments" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">Departments</a>
            <button onClick={() => navigate('/register')} className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">Registration</button>
            <a href="#about" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">About</a>
            <a href="#contact" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">Contact</a>
            <button onClick={() => navigate('/login')} className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">Admin Login</button>
          </div>
        </div>
      </nav>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-red-600 mb-2">{events.length}+</div>
              <div className="text-gray-600 font-medium">Events</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-red-600 mb-2">{departments.length}</div>
              <div className="text-gray-600 font-medium">Departments</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-red-600 mb-2">2000+</div>
              <div className="text-gray-600 font-medium">Participants</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-red-600 mb-2">3</div>
              <div className="text-gray-600 font-medium">Days</div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Departments</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Explore the diverse range of departments participating in our fest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardHeader className="text-center">
                  <div className="text-5xl mb-4">{dept.icon}</div>
                  <CardTitle className="text-gray-800 text-xl">{dept.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge className="bg-red-600 text-white mb-4">
                    {events.filter(e => e.department === dept.name).length} Events
                  </Badge>
                  <p className="text-gray-600">
                    {dept.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">About {festSettings.festName}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {festSettings.festDescription}
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="text-red-600 mr-3" />
                  <span className="text-gray-700">{festSettings.venue}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="text-red-600 mr-3" />
                  <span className="text-gray-700">
                    {new Date(festSettings.eventDate).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="text-red-600 mr-3" />
                  <span className="text-gray-700">2000+ Expected Participants</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <img src="/lovable-uploads/794b504a-8da1-49a5-8bc0-d453c445dcfc.png" alt="MITS Fest" className="max-w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="p-6">
              <Mail className="text-red-600 text-3xl mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600">{festSettings.contactEmail}</p>
            </div>
            <div className="p-6">
              <Users className="text-red-600 text-3xl mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600">{festSettings.contactPhone}</p>
            </div>
            <div className="p-6">
              <MapPin className="text-red-600 text-3xl mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600">{festSettings.venue}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-bold mb-4 text-red-400">{festSettings.festName}</h5>
              <p className="text-gray-300 text-sm">
                {festSettings.festDescription.substring(0, 100)}...
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="text-gray-300 hover:text-red-400 transition-colors">Home</a></li>
                <li><button onClick={() => navigate('/events')} className="text-gray-300 hover:text-red-400 transition-colors">Events</button></li>
                <li><a href="#departments" className="text-gray-300 hover:text-red-400 transition-colors">Departments</a></li>
                <li><button onClick={() => navigate('/register')} className="text-gray-300 hover:text-red-400 transition-colors">Register</button></li>
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
              © 2024 {festSettings.festName}. All rights reserved. Built with ❤️ for innovation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
