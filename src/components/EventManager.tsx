
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, Award, Edit, Plus, Trash2, Eye, Settings } from "lucide-react";
import { toast } from "sonner";

const EventManager = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Code Sprint",
      department: "Computer Science",
      category: "Technical",
      description: "A competitive programming challenge featuring algorithmic problem solving",
      rules: "Individual participation, 3 hours duration, online judge platform",
      fee: 500,
      capacity: 200,
      registered: 156,
      date: "2024-03-15",
      time: "09:00",
      venue: "CSE Lab 1",
      coordinator: "Dr. Rajesh Kumar",
      contact: "+91 98765 43210",
      status: "active",
      prizes: "1st: ₹10,000, 2nd: ₹5,000, 3rd: ₹2,000"
    },
    {
      id: 2,
      name: "Robo Wars",
      department: "Electronics",
      category: "Robotics",
      description: "Robot fighting competition with custom-built combat robots",
      rules: "Team of 3-5 members, weight limit 12kg, autonomous or remote controlled",
      fee: 1200,
      capacity: 100,
      registered: 89,
      date: "2024-03-16",
      time: "14:00",
      venue: "Main Arena",
      coordinator: "Prof. Priya Sharma",
      contact: "+91 98765 43211",
      status: "active",
      prizes: "1st: ₹25,000, 2nd: ₹15,000, 3rd: ₹8,000"
    },
    {
      id: 3,
      name: "Web Development",
      department: "Information Technology",
      category: "Technical",
      description: "Build innovative web applications within 24 hours",
      rules: "Team of 2-4 members, any framework allowed, must be deployed",
      fee: 800,
      capacity: 150,
      registered: 123,
      date: "2024-03-15",
      time: "10:00",
      venue: "IT Lab Complex",
      coordinator: "Dr. Amit Patel",
      contact: "+91 98765 43212",
      status: "active",
      prizes: "1st: ₹15,000, 2nd: ₹8,000, 3rd: ₹4,000"
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    name: "",
    department: "",
    category: "",
    description: "",
    rules: "",
    fee: "",
    capacity: "",
    date: "",
    time: "",
    venue: "",
    coordinator: "",
    contact: "",
    prizes: ""
  });

  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const departments = [
    "Computer Science Engineering",
    "Electronics and Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Information Technology",
    "Electrical Engineering",
    "Biotechnology"
  ];

  const categories = [
    "Technical",
    "Robotics", 
    "Cultural",
    "Sports",
    "Workshop",
    "Seminar",
    "Competition",
    "Exhibition"
  ];

  const handleCreateEvent = () => {
    if (!newEvent.name || !newEvent.department || !newEvent.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const event = {
      id: Date.now(),
      ...newEvent,
      fee: parseInt(newEvent.fee) || 0,
      capacity: parseInt(newEvent.capacity) || 0,
      registered: 0,
      status: "active"
    };

    setEvents(prev => [...prev, event]);
    setNewEvent({
      name: "",
      department: "",
      category: "",
      description: "",
      rules: "",
      fee: "",
      capacity: "",
      date: "",
      time: "",
      venue: "",
      coordinator: "",
      contact: "",
      prizes: ""
    });
    setIsDialogOpen(false);
    toast.success("Event created successfully!");
  };

  const handleEditEvent = (event: any) => {
    setEditingEvent({
      ...event,
      fee: event.fee.toString(),
      capacity: event.capacity.toString()
    });
    setIsDialogOpen(true);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent.name || !editingEvent.department || !editingEvent.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    setEvents(prev => prev.map(event => 
      event.id === editingEvent.id 
        ? {
            ...editingEvent,
            fee: parseInt(editingEvent.fee) || 0,
            capacity: parseInt(editingEvent.capacity) || 0
          }
        : event
    ));
    setEditingEvent(null);
    setIsDialogOpen(false);
    toast.success("Event updated successfully!");
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    toast.success("Event deleted successfully!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>;
      case "inactive":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Inactive</Badge>;
      case "completed":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const EventForm = ({ event, isEdit = false }: { event: any, isEdit?: boolean }) => (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-white">Event Name *</Label>
          <Input
            value={event.name}
            onChange={(e) => isEdit 
              ? setEditingEvent(prev => ({ ...prev, name: e.target.value }))
              : setNewEvent(prev => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter event name"
            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
          />
        </div>
        <div>
          <Label className="text-white">Department *</Label>
          <Select
            value={event.department}
            onValueChange={(value) => isEdit
              ? setEditingEvent(prev => ({ ...prev, department: value }))
              : setNewEvent(prev => ({ ...prev, department: value }))
            }
          >
            <SelectTrigger className="bg-white/10 border-white/30 text-white">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-white">Category *</Label>
          <Select
            value={event.category}
            onValueChange={(value) => isEdit
              ? setEditingEvent(prev => ({ ...prev, category: value }))
              : setNewEvent(prev => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger className="bg-white/10 border-white/30 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-white">Registration Fee (₹)</Label>
          <Input
            type="number"
            value={event.fee}
            onChange={(e) => isEdit
              ? setEditingEvent(prev => ({ ...prev, fee: e.target.value }))
              : setNewEvent(prev => ({ ...prev, fee: e.target.value }))
            }
            placeholder="Enter fee amount"
            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
          />
        </div>
        <div>
          <Label className="text-white">Capacity</Label>
          <Input
            type="number"
            value={event.capacity}
            onChange={(e) => isEdit
              ? setEditingEvent(prev => ({ ...prev, capacity: e.target.value }))
              : setNewEvent(prev => ({ ...prev, capacity: e.target.value }))
            }
            placeholder="Maximum participants"
            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
          />
        </div>
        <div>
          <Label className="text-white">Date</Label>
          <Input
            type="date"
            value={event.date}
            onChange={(e) => isEdit
              ? setEditingEvent(prev => ({ ...prev, date: e.target.value }))
              : setNewEvent(prev => ({ ...prev, date: e.target.value }))
            }
            className="bg-white/10 border-white/30 text-white"
          />
        </div>
        <div>
          <Label className="text-white">Time</Label>
          <Input
            type="time"
            value={event.time}
            onChange={(e) => isEdit
              ? setEditingEvent(prev => ({ ...prev, time: e.target.value }))
              : setNewEvent(prev => ({ ...prev, time: e.target.value }))
            }
            className="bg-white/10 border-white/30 text-white"
          />
        </div>
        <div>
          <Label className="text-white">Venue</Label>
          <Input
            value={event.venue}
            onChange={(e) => isEdit
              ? setEditingEvent(prev => ({ ...prev, venue: e.target.value }))
              : setNewEvent(prev => ({ ...prev, venue: e.target.value }))
            }
            placeholder="Event venue"
            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
          />
        </div>
        <div>
          <Label className="text-white">Coordinator</Label>
          <Input
            value={event.coordinator}
            onChange={(e) => isEdit
              ? setEditingEvent(prev => ({ ...prev, coordinator: e.target.value }))
              : setNewEvent(prev => ({ ...prev, coordinator: e.target.value }))
            }
            placeholder="Event coordinator name"
            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
          />
        </div>
        <div>
          <Label className="text-white">Contact</Label>
          <Input
            value={event.contact}
            onChange={(e) => isEdit
              ? setEditingEvent(prev => ({ ...prev, contact: e.target.value }))
              : setNewEvent(prev => ({ ...prev, contact: e.target.value }))
            }
            placeholder="Contact number"
            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
          />
        </div>
      </div>
      <div>
        <Label className="text-white">Description</Label>
        <Textarea
          value={event.description}
          onChange={(e) => isEdit
            ? setEditingEvent(prev => ({ ...prev, description: e.target.value }))
            : setNewEvent(prev => ({ ...prev, description: e.target.value }))
          }
          placeholder="Event description"
          className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
          rows={3}
        />
      </div>
      <div>
        <Label className="text-white">Rules & Guidelines</Label>
        <Textarea
          value={event.rules}
          onChange={(e) => isEdit
            ? setEditingEvent(prev => ({ ...prev, rules: e.target.value }))
            : setNewEvent(prev => ({ ...prev, rules: e.target.value }))
          }
          placeholder="Event rules and guidelines"
          className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
          rows={3}
        />
      </div>
      <div>
        <Label className="text-white">Prizes</Label>
        <Input
          value={event.prizes}
          onChange={(e) => isEdit
            ? setEditingEvent(prev => ({ ...prev, prizes: e.target.value }))
            : setNewEvent(prev => ({ ...prev, prizes: e.target.value }))
          }
          placeholder="Prize details"
          className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Event Management</h1>
            <p className="text-white/70">Create, edit, and manage all MITS Fest events</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                onClick={() => {
                  setEditingEvent(null);
                  setIsDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-white/20 text-white max-w-4xl">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingEvent ? "Edit Event" : "Create New Event"}
                </DialogTitle>
              </DialogHeader>
              <EventForm 
                event={editingEvent || newEvent} 
                isEdit={!!editingEvent}
              />
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingEvent(null);
                  }}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  {editingEvent ? "Update Event" : "Create Event"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-xl mb-2">{event.name}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                        {event.department}
                      </Badge>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                        {event.category}
                      </Badge>
                      {getStatusBadge(event.status)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-white/70 text-sm line-clamp-2">{event.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center text-white/70">
                      <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <Clock className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <Users className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{event.registered}/{event.capacity}</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <Award className="h-4 w-4 mr-2 text-purple-400" />
                      <span>₹{event.fee}</span>
                    </div>
                  </div>

                  {/* Registration Progress */}
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    />
                  </div>
                  
                  <div className="text-white/70 text-xs text-center">
                    {((event.registered / event.capacity) * 100).toFixed(1)}% Full
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-white/30 text-white hover:bg-white/10"
                      onClick={() => handleEditEvent(event)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-purple-500 hover:bg-purple-600"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-400 hover:bg-red-500/10"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">{events.length}</div>
              <div className="text-white/70">Total Events</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {events.reduce((sum, event) => sum + event.registered, 0)}
              </div>
              <div className="text-white/70">Total Registrations</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                ₹{(events.reduce((sum, event) => sum + (event.registered * event.fee), 0) / 1000).toFixed(0)}K
              </div>
              <div className="text-white/70">Revenue Generated</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {[...new Set(events.map(event => event.department))].length}
              </div>
              <div className="text-white/70">Active Departments</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventManager;
