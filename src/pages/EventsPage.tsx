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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Filter events based on search term, category, and department
  const filteredEvents = events.filter(event => {
    return (
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || event.category === selectedCategory) &&
      (selectedDepartment === "all" || event.department === selectedDepartment)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <span className="text-white font-bold text-xl">MITS FEST - Events</span>
            </div>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Event Listings
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover amazing competitions, workshops, and cultural events at MITS Fest 2024
          </p>
        </div>
        <EventList />
      </div>
    </div>
  );
};

export default EventsPage;
