
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <span className="text-white font-bold text-xl">{festSettings.festName.split(' ')[0]} FEST</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#home" className="text-white hover:text-purple-300 transition-colors">Home</a>
              <button onClick={() => navigate('/events')} className="text-white hover:text-purple-300 transition-colors">Events</button>
              <a href="#departments" className="text-white hover:text-purple-300 transition-colors">Departments</a>
              <button onClick={() => navigate('/register')} className="text-white hover:text-purple-300 transition-colors">Register</button>
              <a href="#contact" className="text-white hover:text-purple-300 transition-colors">Contact</a>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => navigate('/login')}
              >
                Admin Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-none px-4 py-2 text-lg">
              {new Date(festSettings.eventDate).toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent">
              {festSettings.festName}
            </h1>
            <p className="text-2xl text-blue-200 mb-6 font-semibold tracking-wider">
              {festSettings.festSubtitle}
            </p>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              {festSettings.festDescription}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-none px-8 py-4 text-lg"
              onClick={() => navigate('/register')}
            >
              Register Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
              onClick={() => navigate('/events')}
            >
              View Events
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{events.length}+</div>
              <div className="text-purple-200">Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{departments.length}</div>
              <div className="text-purple-200">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">2000+</div>
              <div className="text-purple-200">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">3</div>
              <div className="text-purple-200">Days</div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Departments</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Explore events and competitions across all engineering departments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{dept.icon}</div>
                  <CardTitle className="text-white text-xl">{dept.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge className={`${dept.color} text-white mb-4`}>
                    {events.filter(e => e.department === dept.name).length} Events
                  </Badge>
                  <p className="text-white/70">
                    {dept.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-md border-t border-white/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <span className="text-white font-bold text-xl">MITS FEST</span>
              </div>
              <p className="text-white/70">
                {festSettings.festDescription.substring(0, 100)}...
              </p>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><a href="#home" className="text-white/70 hover:text-white transition-colors">Home</a></li>
                <li><button onClick={() => navigate('/events')} className="text-white/70 hover:text-white transition-colors">Events</button></li>
                <li><a href="#departments" className="text-white/70 hover:text-white transition-colors">Departments</a></li>
                <li><button onClick={() => navigate('/register')} className="text-white/70 hover:text-white transition-colors">Register</button></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Categories</h5>
              <ul className="space-y-2">
                <li><span className="text-white/70">Technical</span></li>
                <li><span className="text-white/70">Cultural</span></li>
                <li><span className="text-white/70">Workshops</span></li>
                <li><span className="text-white/70">Competitions</span></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Contact Info</h5>
              <div className="space-y-2 text-white/70">
                <p>{festSettings.venue}</p>
                <p>Phone: {festSettings.contactPhone}</p>
                <p>Email: {festSettings.contactEmail}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/70">
              © 2024 MITS FEST. All rights reserved. Built with ❤️ for innovation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
