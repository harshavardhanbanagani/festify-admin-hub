
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useApp } from '@/context/AppContext';
import { toast } from '@/components/ui/use-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Event, TeamMember } from '@/types';
import { User, Users, CreditCard, FileText, CheckCircle } from 'lucide-react';

const RegistrationForm = () => {
  const { events, addRegistration } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isTeamRegistration, setIsTeamRegistration] = useState(false);
  const [formData, setFormData] = useState({
    participantName: '',
    email: '',
    phone: '',
    college: 'MITS Madanapalle',
    year: '',
    department: '',
    teamName: '',
    teamMembers: [] as TeamMember[]
  });

  useEffect(() => {
    const eventId = searchParams.get('event');
    if (eventId) {
      const event = events.find(e => e.id === eventId);
      if (event) {
        setSelectedEvent(event);
        setIsTeamRegistration(event.teamSize.max > 1);
      }
    }
  }, [searchParams, events]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTeamMemberChange = (index: number, field: string, value: string) => {
    const newTeamMembers = [...formData.teamMembers];
    newTeamMembers[index] = { ...newTeamMembers[index], [field]: value };
    setFormData(prev => ({ ...prev, teamMembers: newTeamMembers }));
  };

  const addTeamMember = () => {
    if (selectedEvent && formData.teamMembers.length < selectedEvent.teamSize.max - 1) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { name: '', email: '', phone: '', year: '', department: '' }]
      }));
    }
  };

  const removeTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEvent) {
      toast({
        title: "Error",
        description: "Please select an event",
        variant: "destructive"
      });
      return;
    }

    // Validation
    if (isTeamRegistration && formData.teamMembers.length < selectedEvent.teamSize.min - 1) {
      toast({
        title: "Error",
        description: `Team must have at least ${selectedEvent.teamSize.min} members`,
        variant: "destructive"
      });
      return;
    }

    const registration = {
      eventId: selectedEvent.id,
      eventName: selectedEvent.name,
      participantName: formData.participantName,
      email: formData.email,
      phone: formData.phone,
      college: formData.college,
      year: formData.year,
      department: formData.department,
      teamName: isTeamRegistration ? formData.teamName : undefined,
      teamMembers: isTeamRegistration ? formData.teamMembers : undefined,
      paymentStatus: 'pending' as const,
      certificateGenerated: false
    };

    addRegistration(registration);

    toast({
      title: "Registration Successful!",
      description: `You have been registered for ${selectedEvent.name}. Check your email for confirmation.`,
    });

    // Reset form
    setFormData({
      participantName: '',
      email: '',
      phone: '',
      college: 'MITS Madanapalle',
      year: '',
      department: '',
      teamName: '',
      teamMembers: []
    });

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Event Registration</h1>
          <p className="text-white/70">Register for MITS Fest 2024 events</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event Selection */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Select Event
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={(value) => {
                const event = events.find(e => e.id === value);
                setSelectedEvent(event || null);
                setIsTeamRegistration(event ? event.teamSize.max > 1 : false);
              }}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Choose an event" />
                </SelectTrigger>
                <SelectContent>
                  {events.filter(e => e.status === 'active').map(event => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.name} - ₹{event.fee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedEvent && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-white font-semibold">{selectedEvent.name}</h4>
                  <p className="text-white/70 text-sm">{selectedEvent.description}</p>
                  <div className="text-sm text-white/60">
                    <p>Department: {selectedEvent.department}</p>
                    <p>Fee: ₹{selectedEvent.fee}</p>
                    <p>Team Size: {selectedEvent.teamSize.min}-{selectedEvent.teamSize.max}</p>
                    <p>Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card className="lg:col-span-2 bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="h-5 w-5 mr-2" />
                Registration Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="participantName" className="text-white">Full Name *</Label>
                      <Input
                        id="participantName"
                        value={formData.participantName}
                        onChange={(e) => handleInputChange('participantName', e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="college" className="text-white">College</Label>
                      <Input
                        id="college"
                        value={formData.college}
                        onChange={(e) => handleInputChange('college', e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="year" className="text-white">Year of Study *</Label>
                      <Select onValueChange={(value) => handleInputChange('year', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st">1st Year</SelectItem>
                          <SelectItem value="2nd">2nd Year</SelectItem>
                          <SelectItem value="3rd">3rd Year</SelectItem>
                          <SelectItem value="4th">4th Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="department" className="text-white">Department *</Label>
                      <Select onValueChange={(value) => handleInputChange('department', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CSE">Computer Science</SelectItem>
                          <SelectItem value="ECE">Electronics</SelectItem>
                          <SelectItem value="MECH">Mechanical</SelectItem>
                          <SelectItem value="CIVIL">Civil</SelectItem>
                          <SelectItem value="CHEM">Chemical</SelectItem>
                          <SelectItem value="BIOTECH">Biotechnology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Team Information */}
                {isTeamRegistration && selectedEvent && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Team Information
                    </h3>
                    
                    <div>
                      <Label htmlFor="teamName" className="text-white">Team Name *</Label>
                      <Input
                        id="teamName"
                        value={formData.teamName}
                        onChange={(e) => handleInputChange('teamName', e.target.value)}
                        required={isTeamRegistration}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-white">Team Members</Label>
                        <Button
                          type="button"
                          onClick={addTeamMember}
                          disabled={formData.teamMembers.length >= selectedEvent.teamSize.max - 1}
                          className="bg-purple-500 hover:bg-purple-600"
                        >
                          Add Member
                        </Button>
                      </div>

                      {formData.teamMembers.map((member, index) => (
                        <Card key={index} className="bg-white/5 border-white/10 p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-white font-medium">Member {index + 1}</h4>
                            <Button
                              type="button"
                              onClick={() => removeTeamMember(index)}
                              variant="destructive"
                              size="sm"
                            >
                              Remove
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Input
                              placeholder="Full Name"
                              value={member.name}
                              onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                            <Input
                              placeholder="Email"
                              type="email"
                              value={member.email}
                              onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                            <Input
                              placeholder="Phone"
                              value={member.phone}
                              onChange={(e) => handleTeamMemberChange(index, 'phone', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                            <Select onValueChange={(value) => handleTeamMemberChange(index, 'year', value)}>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1st">1st Year</SelectItem>
                                <SelectItem value="2nd">2nd Year</SelectItem>
                                <SelectItem value="3rd">3rd Year</SelectItem>
                                <SelectItem value="4th">4th Year</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Information */}
                {selectedEvent && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Information
                    </h3>
                    
                    <Card className="bg-white/5 border-white/10 p-4">
                      <div className="text-center">
                        <p className="text-white mb-2">Registration Fee: ₹{selectedEvent.fee}</p>
                        <p className="text-white/70 text-sm mb-4">
                          Please pay the registration fee using UPI and upload the payment screenshot
                        </p>
                        <div className="bg-white p-4 rounded-lg inline-block">
                          <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                            QR CODE
                          </div>
                        </div>
                        <p className="text-white/70 text-sm mt-2">UPI ID: mitsfest@paytm</p>
                      </div>
                    </Card>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-white text-sm">
                    I agree to the terms and conditions and confirm that all information provided is accurate.
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  disabled={!selectedEvent}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Registration
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
