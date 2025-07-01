
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Clock, Users, MapPin, ArrowLeft } from "lucide-react";
import EventList from "@/components/EventList";

const EventsPage = () => {
  const { events, departments } = useApp();
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
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                className="text-gray-600 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">Event Listings</h1>
              <p className="text-gray-600">MITS FEST 2024</p>
            </div>
            <div className="flex space-x-4">
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 py-3">
            <button onClick={() => navigate('/')} className="hover:bg-red-700 px-3 py-2 rounded transition-colors">Home</button>
            <span className="bg-red-700 px-3 py-2 rounded">Events</span>
            <a href="/#departments" className="hover:bg-red-700 px-3 py-2 rounded transition-colors">Departments</a>
            <button onClick={() => navigate('/register')} className="hover:bg-red-700 px-3 py-2 rounded transition-colors">Registration</button>
            <a href="#about" className="hover:bg-red-700 px-3 py-2 rounded transition-colors">About</a>
            <a href="#contact" className="hover:bg-red-700 px-3 py-2 rounded transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Discover Amazing Events
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore competitions, workshops, and cultural events at MITS Fest 2024
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <EventList />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
