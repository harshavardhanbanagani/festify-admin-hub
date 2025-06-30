
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, Award, Mail, Edit, Plus, Settings, BarChart3, LogOut } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import EventManager from "./EventManager";
import SettingsManager from "./SettingsManager";

const AdminDashboard = () => {
  const { events, registrations, departments, logout } = useApp();
  const navigate = useNavigate();

  const stats = {
    totalRegistrations: registrations.length,
    totalEvents: events.length,
    activeDepartments: departments.length,
    pendingApprovals: registrations.filter(r => r.paymentStatus === 'pending').length,
    totalRevenue: registrations.filter(r => r.paymentStatus === 'completed').reduce((sum, r) => {
      const event = events.find(e => e.id === r.eventId);
      return sum + (event?.fee || 0);
    }, 0),
    certificatesGenerated: registrations.filter(r => r.certificateGenerated).length
  };

  const recentRegistrations = registrations.slice(-5).reverse();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/70">Manage MITS Fest 2024 - Real-time Overview</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-400" />
                Registrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalRegistrations}</div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50 mt-2">
                Total
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                Active Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalEvents}</div>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 mt-2">
                {stats.activeDepartments} departments
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium flex items-center">
                <Award className="h-4 w-4 mr-2 text-yellow-400" />
                Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.certificatesGenerated}</div>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 mt-2">
                Generated
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium flex items-center">
                <Mail className="h-4 w-4 mr-2 text-orange-400" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.pendingApprovals}</div>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 mt-2">
                Payments
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium flex items-center">
                <BarChart3 className="h-4 w-4 mr-2 text-green-400" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₹{(stats.totalRevenue / 1000).toFixed(0)}K</div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50 mt-2">
                Collection
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium flex items-center">
                <Settings className="h-4 w-4 mr-2 text-gray-400" />
                Departments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.activeDepartments}</div>
              <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50 mt-2">
                Active
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-md border-white/20">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">
              Overview
            </TabsTrigger>
            <TabsTrigger value="events" className="text-white data-[state=active]:bg-white/20">
              Event Management
            </TabsTrigger>
            <TabsTrigger value="registrations" className="text-white data-[state=active]:bg-white/20">
              Registrations
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-white/20">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Registrations */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Recent Registrations
                    <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRegistrations.map((reg) => {
                      const event = events.find(e => e.id === reg.eventId);
                      return (
                        <div key={reg.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <div className="text-white font-medium">{reg.participantName}</div>
                            <div className="text-white/70 text-sm">{reg.eventName} • {reg.department}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">₹{event?.fee || 0}</div>
                            <Badge 
                              className={
                                reg.paymentStatus === 'completed' 
                                  ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                                  : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                              }
                            >
                              {reg.paymentStatus}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Event Performance */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Event Performance
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.slice(0, 5).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <div className="text-white font-medium">{event.name}</div>
                          <div className="text-white/70 text-sm">{event.department} Department</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">
                            {event.currentParticipants}/{event.maxParticipants}
                          </div>
                          <div className="w-24 bg-white/20 rounded-full h-2 mt-1">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                              style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <EventManager />
          </TabsContent>

          <TabsContent value="registrations" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Registration Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registrations.map((reg) => {
                    const event = events.find(e => e.id === reg.eventId);
                    return (
                      <div key={reg.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex-1">
                          <div className="text-white font-medium">{reg.participantName}</div>
                          <div className="text-white/70 text-sm">ID: {reg.id} • {reg.eventName} • {reg.department}</div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-white font-medium">₹{event?.fee || 0}</div>
                          <Badge 
                            className={
                              reg.paymentStatus === 'completed' 
                                ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                                : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                            }
                          >
                            {reg.paymentStatus}
                          </Badge>
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SettingsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
