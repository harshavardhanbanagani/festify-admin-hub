
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, Award, Mail, Edit, Plus, Settings, BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  const [stats] = useState({
    totalRegistrations: 1247,
    totalEvents: 25,
    activeDepartments: 8,
    pendingApprovals: 23,
    totalRevenue: 125000,
    certificatesGenerated: 856
  });

  const [recentRegistrations] = useState([
    { id: "REG001", name: "Rajesh Kumar", event: "Code Sprint", dept: "CSE", status: "confirmed", fee: 500 },
    { id: "REG002", name: "Priya Sharma", event: "Robo Wars", dept: "ECE", status: "pending", fee: 800 },
    { id: "REG003", name: "Arjun Reddy", event: "Tech Quiz", dept: "IT", status: "confirmed", fee: 300 },
    { id: "REG004", name: "Sneha Patel", event: "Web Design", dept: "CSE", status: "confirmed", fee: 400 },
    { id: "REG005", name: "Vikram Singh", event: "Paper Presentation", dept: "MECH", status: "pending", fee: 350 }
  ]);

  const [events] = useState([
    { id: 1, name: "Code Sprint", dept: "CSE", registrations: 156, capacity: 200, status: "active" },
    { id: 2, name: "Robo Wars", dept: "ECE", registrations: 89, capacity: 100, status: "active" },
    { id: 3, name: "Tech Quiz", dept: "IT", registrations: 234, capacity: 300, status: "active" },
    { id: 4, name: "Web Design", dept: "CSE", registrations: 123, capacity: 150, status: "active" },
    { id: 5, name: "Paper Presentation", dept: "MECH", registrations: 67, capacity: 100, status: "active" }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/70">Manage MITS Fest 2024 - Real-time Overview</p>
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
                +12% today
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
                8 departments
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
                Approvals
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
            <TabsTrigger value="certificates" className="text-white data-[state=active]:bg-white/20">
              Certificates
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
                    {recentRegistrations.map((reg) => (
                      <div key={reg.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <div className="text-white font-medium">{reg.name}</div>
                          <div className="text-white/70 text-sm">{reg.event} • {reg.dept}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">₹{reg.fee}</div>
                          <Badge 
                            className={
                              reg.status === 'confirmed' 
                                ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                                : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                            }
                          >
                            {reg.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
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
                          <div className="text-white/70 text-sm">{event.dept} Department</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">
                            {event.registrations}/{event.capacity}
                          </div>
                          <div className="w-24 bg-white/20 rounded-full h-2 mt-1">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                              style={{ width: `${(event.registrations / event.capacity) * 100}%` }}
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
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Event Management
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Event
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {events.map((event) => (
                    <Card key={event.id} className="bg-white/5 border-white/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-white text-lg">{event.name}</CardTitle>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 w-fit">
                          {event.dept}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="text-white/70 mb-4">
                          <div className="flex justify-between mb-2">
                            <span>Registrations:</span>
                            <span className="text-white">{event.registrations}/{event.capacity}</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                              style={{ width: `${(event.registrations / event.capacity) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/10">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" className="flex-1 bg-purple-500 hover:bg-purple-600">
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registrations" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Registration Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRegistrations.map((reg) => (
                    <div key={reg.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <div className="text-white font-medium">{reg.name}</div>
                        <div className="text-white/70 text-sm">ID: {reg.id} • {reg.event} • {reg.dept}</div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-white font-medium">₹{reg.fee}</div>
                        <Badge 
                          className={
                            reg.status === 'confirmed' 
                              ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                              : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                          }
                        >
                          {reg.status}
                        </Badge>
                        <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Certificate Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Certificate Generator</h3>
                  <p className="text-white/70 mb-6">Upload templates, customize fields, and generate certificates automatically</p>
                  <div className="flex justify-center space-x-4">
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-500">
                      Upload Template
                    </Button>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Generate Certificates
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Fest Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-4">General Settings</h4>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Fest Details
                      </Button>
                      <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                        <Calendar className="h-4 w-4 mr-2" />
                        Manage Event Dates
                      </Button>
                      <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Registration Settings
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-4">Content Management</h4>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                        <Edit className="h-4 w-4 mr-2" />
                        Update Homepage
                      </Button>
                      <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Templates
                      </Button>
                      <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                        <Award className="h-4 w-4 mr-2" />
                        Certificate Templates
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
