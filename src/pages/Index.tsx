
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Users, Award, Mail, Clock, MapPin } from "lucide-react";

const Index = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [festData] = useState({
    eventDate: new Date("2024-03-15T09:00:00"),
    title: "MITS FEST 2024",
    subtitle: "Innovation • Technology • Excellence",
    description: "Join us for the most exciting tech fest of the year featuring competitions, workshops, and networking opportunities.",
    totalEvents: 25,
    departments: 8,
    expectedParticipants: 2000,
    venue: "MITS Campus, Madanapalle"
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = festData.eventDate.getTime() - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [festData.eventDate]);

  const departments = [
    { name: "Computer Science", events: 8, icon: "💻", color: "bg-blue-500" },
    { name: "Electronics", events: 6, icon: "🔌", color: "bg-green-500" },
    { name: "Mechanical", events: 5, icon: "⚙️", color: "bg-orange-500" },
    { name: "Civil", events: 4, icon: "🏗️", color: "bg-purple-500" },
    { name: "Chemical", events: 3, icon: "🧪", color: "bg-red-500" },
    { name: "Biotechnology", events: 4, icon: "🧬", color: "bg-teal-500" }
  ];

  const highlights = [
    {
      title: "Technical Competitions",
      description: "Coding contests, robotics challenges, and innovation showcases",
      icon: <Award className="h-8 w-8" />,
      stats: "15+ Events"
    },
    {
      title: "Workshops & Seminars",
      description: "Industry experts sharing cutting-edge knowledge and skills",
      icon: <Users className="h-8 w-8" />,
      stats: "10+ Sessions"
    },
    {
      title: "Cultural Programs",
      description: "Music, dance, and entertainment to celebrate technology and culture",
      icon: <CalendarCheck className="h-8 w-8" />,
      stats: "5+ Shows"
    }
  ];

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
              <span className="text-white font-bold text-xl">MITS FEST</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#home" className="text-white hover:text-purple-300 transition-colors">Home</a>
              <a href="#departments" className="text-white hover:text-purple-300 transition-colors">Departments</a>
              <a href="#register" className="text-white hover:text-purple-300 transition-colors">Register</a>
              <a href="#contact" className="text-white hover:text-purple-300 transition-colors">Contact</a>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
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
              March 15-17, 2024
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent">
              {festData.title}
            </h1>
            <p className="text-2xl text-blue-200 mb-6 font-semibold tracking-wider">
              {festData.subtitle}
            </p>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              {festData.description}
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12">
            <h3 className="text-2xl text-white mb-6 font-semibold">Event Starts In</h3>
            <div className="flex justify-center space-x-4 md:space-x-8">
              {Object.entries(countdown).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20">
                    <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-purple-200 text-sm md:text-base uppercase tracking-wider">
                      {unit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-none px-8 py-4 text-lg">
              Register Now
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
              View Events
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{festData.totalEvents}+</div>
              <div className="text-purple-200">Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{festData.departments}</div>
              <div className="text-purple-200">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{festData.expectedParticipants}+</div>
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
                    {dept.events} Events
                  </Badge>
                  <p className="text-white/70">
                    Explore cutting-edge competitions and workshops in {dept.name.toLowerCase()}.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Event Highlights</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Discover what makes MITS Fest the premier tech event of the year
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="text-purple-400 mb-4 flex justify-center">
                    {highlight.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/70 mb-4">{highlight.description}</p>
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    {highlight.stats}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Event Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-white/80">
                    <CalendarCheck className="h-5 w-5 mr-3 text-purple-400" />
                    <span>March 15-17, 2024</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <MapPin className="h-5 w-5 mr-3 text-purple-400" />
                    <span>{festData.venue}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Clock className="h-5 w-5 mr-3 text-purple-400" />
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Mail className="h-5 w-5 mr-3 text-purple-400" />
                    <span>mitsfest@mits.ac.in</span>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <h4 className="text-2xl font-bold text-white mb-4">Ready to Participate?</h4>
                <p className="text-white/80 mb-6">
                  Register now and be part of the most exciting tech fest in the region!
                </p>
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-none px-8 py-4">
                  Register Now
                </Button>
              </div>
            </div>
          </Card>
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
                The premier technology festival celebrating innovation, creativity, and excellence.
              </p>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><a href="#home" className="text-white/70 hover:text-white transition-colors">Home</a></li>
                <li><a href="#departments" className="text-white/70 hover:text-white transition-colors">Departments</a></li>
                <li><a href="#register" className="text-white/70 hover:text-white transition-colors">Register</a></li>
                <li><a href="#contact" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Events</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Technical</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Cultural</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Workshops</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Seminars</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Contact Info</h5>
              <div className="space-y-2 text-white/70">
                <p>MITS Campus, Madanapalle</p>
                <p>Andhra Pradesh, India</p>
                <p>Phone: +91 123 456 7890</p>
                <p>Email: mitsfest@mits.ac.in</p>
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
