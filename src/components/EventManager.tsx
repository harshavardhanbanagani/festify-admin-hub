
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { toast } from '@/components/ui/use-toast';
import { Event } from '@/types';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

const EventManager = () => {
  const { events, departments, addEvent, updateEvent, deleteEvent } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    department: '',
    category: 'Technical' as const,
    fee: 0,
    date: '',
    time: '',
    venue: '',
    rules: '',
    maxParticipants: 100,
    teamSize: { min: 1, max: 1 }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      department: '',
      category: 'Technical',
      fee: 0,
      date: '',
      time: '',
      venue: '',
      rules: '',
      maxParticipants: 100,
      teamSize: { min: 1, max: 1 }
    });
    setIsEditing(false);
    setEditingEvent(null);
  };

  const handleEdit = (event: Event) => {
    setFormData({
      name: event.name,
      description: event.description,
      department: event.department,
      category: event.category,
      fee: event.fee,
      date: event.date,
      time: event.time,
      venue: event.venue,
      rules: event.rules,
      maxParticipants: event.maxParticipants,
      teamSize: event.teamSize
    });
    setEditingEvent(event);
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      currentParticipants: editingEvent?.currentParticipants || 0,
      status: 'active' as const
    };

    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
      toast({
        title: "Event Updated",
        description: `${formData.name} has been updated successfully.`,
      });
    } else {
      addEvent(eventData);
      toast({
        title: "Event Created",
        description: `${formData.name} has been created successfully.`,
      });
    }

    resetForm();
  };

  const handleDelete = (event: Event) => {
    if (window.confirm(`Are you sure you want to delete "${event.name}"?`)) {
      deleteEvent(event.id);
      toast({
        title: "Event Deleted",
        description: `${event.name} has been deleted successfully.`,
      });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (field === 'teamMinSize') {
      setFormData(prev => ({
        ...prev,
        teamSize: { ...prev.teamSize, min: parseInt(value) || 1 }
      }));
    } else if (field === 'teamMaxSize') {
      setFormData(prev => ({
        ...prev,
        teamSize: { ...prev.teamSize, max: parseInt(value) || 1 }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Event Management</h2>
        <Button 
          onClick={() => setIsEditing(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Event
        </Button>
      </div>

      {/* Event Form */}
      {isEditing && (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              {editingEvent ? 'Edit Event' : 'Create New Event'}
              <Button 
                onClick={resetForm}
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-white">Event Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="department" className="text-white">Department *</Label>
                  <Select onValueChange={(value) => handleInputChange('department', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category" className="text-white">Category *</Label>
                  <Select onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Competition">Competition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fee" className="text-white">Registration Fee (₹) *</Label>
                  <Input
                    id="fee"
                    type="number"
                    value={formData.fee}
                    onChange={(e) => handleInputChange('fee', parseInt(e.target.value) || 0)}
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="maxParticipants" className="text-white">Max Participants *</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value) || 100)}
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date" className="text-white">Event Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-white">Event Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="venue" className="text-white">Venue *</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => handleInputChange('venue', e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="teamMinSize" className="text-white">Min Team Size</Label>
                  <Input
                    id="teamMinSize"
                    type="number"
                    value={formData.teamSize.min}
                    onChange={(e) => handleInputChange('teamMinSize', e.target.value)}
                    min="1"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="teamMaxSize" className="text-white">Max Team Size</Label>
                  <Input
                    id="teamMaxSize"
                    type="number"
                    value={formData.teamSize.max}
                    onChange={(e) => handleInputChange('teamMaxSize', e.target.value)}
                    min="1"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="rules" className="text-white">Rules & Guidelines</Label>
                <Textarea
                  id="rules"
                  value={formData.rules}
                  onChange={(e) => handleInputChange('rules', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingEvent ? 'Update Event' : 'Create Event'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white text-lg">{event.name}</CardTitle>
                  <Badge className={`mt-2 ${
                    event.category === 'Technical' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' :
                    event.category === 'Cultural' ? 'bg-pink-500/20 text-pink-400 border-pink-500/50' :
                    event.category === 'Workshop' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                    'bg-purple-500/20 text-purple-400 border-purple-500/50'
                  }`}>
                    {event.category}
                  </Badge>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                  {event.department}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/80 text-sm line-clamp-2">{event.description}</p>
              
              <div className="space-y-2 text-sm text-white/70">
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Fee: ₹{event.fee}</p>
                <p>Participants: {event.currentParticipants}/{event.maxParticipants}</p>
                <p>Team Size: {event.teamSize.min}-{event.teamSize.max}</p>
              </div>

              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                  style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                />
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={() => handleEdit(event)}
                  size="sm" 
                  variant="outline" 
                  className="flex-1 border-white/30 text-white hover:bg-white/10"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  onClick={() => handleDelete(event)}
                  size="sm" 
                  variant="destructive" 
                  className="flex-1"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventManager;
