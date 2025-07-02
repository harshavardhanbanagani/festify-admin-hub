
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                className="text-gray-600 hover:text-red-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">Event Listings</h1>
              <p className="text-gray-600">Discover amazing events</p>
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

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8 py-3">
            <button onClick={() => navigate('/')} className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">Home</button>
            <span className="text-red-600 px-3 py-2 font-medium border-b-2 border-red-600">Events</span>
            <a href="/#departments" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">Departments</a>
            <button onClick={() => navigate('/register')} className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">Registration</button>
            <a href="/#about" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">About</a>
            <a href="/#contact" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">Contact</a>
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
            Explore competitions, workshops, and cultural events
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <EventList />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
