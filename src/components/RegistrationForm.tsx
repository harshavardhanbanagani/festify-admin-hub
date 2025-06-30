
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users, User, Mail, Calendar, Award, CreditCard } from "lucide-react";
import { toast } from "sonner";

const RegistrationForm = () => {
  const [formType, setFormType] = useState<"individual" | "team">("individual");
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [formData, setFormData] = useState({
    // Individual fields
    fullName: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    year: "",
    rollNumber: "",
    
    // Team fields
    teamName: "",
    teamSize: 2,
    members: [{ name: "", email: "", phone: "", rollNumber: "" }],
    
    // Event fields
    eventCategory: "",
    eventName: "",
    
    // Additional fields
    specialRequirements: "",
    agreeTerms: false,
    previousParticipation: false
  });

  const events = [
    {
      category: "Technical",
      events: [
        { name: "Code Sprint", fee: 500, type: "individual", description: "Competitive programming challenge" },
        { name: "Web Development", fee: 800, type: "team", description: "Build innovative web applications" },
        { name: "AI/ML Challenge", fee: 1000, type: "team", description: "Machine learning competition" },
        { name: "Mobile App Dev", fee: 700, type: "team", description: "Create mobile applications" }
      ]
    },
    {
      category: "Robotics",
      events: [
        { name: "Robo Wars", fee: 1200, type: "team", description: "Robot fighting competition" },
        { name: "Line Following", fee: 600, type: "team", description: "Autonomous robot navigation" },
        { name: "Drone Racing", fee: 1500, type: "individual", description: "High-speed drone competition" }
      ]
    },
    {
      category: "Cultural",
      events: [
        { name: "Tech Quiz", fee: 300, type: "team", description: "Technology knowledge competition" },
        { name: "Paper Presentation", fee: 400, type: "individual", description: "Present innovative ideas" },
        { name: "Poster Design", fee: 250, type: "individual", description: "Creative poster competition" }
      ]
    }
  ];

  const departments = [
    "Computer Science Engineering",
    "Electronics and Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Information Technology",
    "Electrical Engineering"
  ];

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const handleEventSelect = (eventName: string) => {
    const event = events.flatMap(cat => cat.events).find(e => e.name === eventName);
    if (event) {
      setSelectedEvent(eventName);
      setFormType(event.type as "individual" | "team");
      setFormData(prev => ({
        ...prev,
        eventName,
        eventCategory: events.find(cat => cat.events.includes(event))?.category || ""
      }));
    }
  };

  const addTeamMember = () => {
    if (formData.members.length < 5) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, { name: "", email: "", phone: "", rollNumber: "" }]
      }));
    }
  };

  const removeTeamMember = (index: number) => {
    if (formData.members.length > 1) {
      setFormData(prev => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEvent) {
      toast.error("Please select an event");
      return;
    }
    
    if (!formData.agreeTerms) {
      toast.error("Please agree to terms and conditions");
      return;
    }

    // Simulate registration
    const registrationId = `REG${Date.now().toString().slice(-6)}`;
    toast.success(`Registration successful! Your ID: ${registrationId}`);
    
    // Here you would normally send the data to your backend
    console.log("Registration data:", { ...formData, registrationId, eventType: formType });
  };

  const getSelectedEventDetails = () => {
    return events.flatMap(cat => cat.events).find(e => e.name === selectedEvent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Event Registration</h1>
          <p className="text-xl text-white/80">Join MITS Fest 2024 - Register for your favorite events</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event Selection */}
          <Card className="lg:col-span-1 bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Select Event
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((category) => (
                  <div key={category.category}>
                    <h4 className="text-white font-semibold mb-2">{category.category}</h4>
                    <div className="space-y-2">
                      {category.events.map((event) => (
                        <Button
                          key={event.name}
                          variant={selectedEvent === event.name ? "default" : "outline"}
                          className={`w-full justify-start h-auto p-3 ${
                            selectedEvent === event.name 
                              ? "bg-gradient-to-r from-purple-500 to-blue-500" 
                              : "border-white/30 text-white hover:bg-white/10"
                          }`}
                          onClick={() => handleEventSelect(event.name)}
                        >
                          <div className="text-left">
                            <div className="font-medium">{event.name}</div>
                            <div className="text-xs opacity-80">{event.description}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                ₹{event.fee}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {event.type === "team" ? <Users className="h-3 w-3" /> : <User className="h-3 w-3" />}
                              </Badge>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card className="lg:col-span-2 bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center">
                  {formType === "team" ? <Users className="h-5 w-5 mr-2" /> : <User className="h-5 w-5 mr-2" />}
                  {formType === "team" ? "Team Registration" : "Individual Registration"}
                </span>
                {selectedEvent && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500">
                    {selectedEvent}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedEvent ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Event Details */}
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Event Details</h4>
                    {(() => {
                      const eventDetails = getSelectedEventDetails();
                      return eventDetails ? (
                        <div className="text-white/70 space-y-1">
                          <p><strong>Event:</strong> {eventDetails.name}</p>
                          <p><strong>Fee:</strong> ₹{eventDetails.fee}</p>
                          <p><strong>Type:</strong> {eventDetails.type}</p>
                          <p><strong>Description:</strong> {eventDetails.description}</p>
                        </div>
                      ) : null;
                    })()}
                  </div>

                  {/* Team Name (for team events) */}
                  {formType === "team" && (
                    <div>
                      <Label htmlFor="teamName" className="text-white">Team Name *</Label>
                      <Input
                        id="teamName"
                        value={formData.teamName}
                        onChange={(e) => setFormData(prev => ({ ...prev, teamName: e.target.value }))}
                        placeholder="Enter your team name"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                  )}

                  {/* Individual Details or Team Leader */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName" className="text-white">
                        {formType === "team" ? "Team Leader Name" : "Full Name"} *
                      </Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Enter full name"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter email address"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter phone number"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="rollNumber" className="text-white">Roll Number *</Label>
                      <Input
                        id="rollNumber"
                        value={formData.rollNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, rollNumber: e.target.value }))}
                        placeholder="Enter roll number"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                  </div>

                  {/* College and Department */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="college" className="text-white">College/Institution *</Label>
                      <Input
                        id="college"
                        value={formData.college}
                        onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                        placeholder="Enter college name"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="department" className="text-white">Department *</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
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
                      <Label htmlFor="year" className="text-white">Year of Study *</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, year: value }))}>
                        <SelectTrigger className="bg-white/10 border-white/30 text-white">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Team Members (for team events) */}
                  {formType === "team" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-white">Team Members</Label>
                        <Button
                          type="button"
                          onClick={addTeamMember}
                          disabled={formData.members.length >= 5}
                          className="bg-purple-500 hover:bg-purple-600 text-sm"
                        >
                          Add Member
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {formData.members.map((member, index) => (
                          <div key={index} className="bg-white/5 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="text-white font-medium">Member {index + 1}</h5>
                              {formData.members.length > 1 && (
                                <Button
                                  type="button"
                                  onClick={() => removeTeamMember(index)}
                                  variant="outline"
                                  size="sm"
                                  className="border-red-500 text-red-400 hover:bg-red-500/10"
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <Input
                                placeholder="Full Name"
                                value={member.name}
                                onChange={(e) => {
                                  const newMembers = [...formData.members];
                                  newMembers[index] = { ...newMembers[index], name: e.target.value };
                                  setFormData(prev => ({ ...prev, members: newMembers }));
                                }}
                                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                                required
                              />
                              <Input
                                placeholder="Email"
                                type="email"
                                value={member.email}
                                onChange={(e) => {
                                  const newMembers = [...formData.members];
                                  newMembers[index] = { ...newMembers[index], email: e.target.value };
                                  setFormData(prev => ({ ...prev, members: newMembers }));
                                }}
                                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                                required
                              />
                              <Input
                                placeholder="Phone"
                                value={member.phone}
                                onChange={(e) => {
                                  const newMembers = [...formData.members];
                                  newMembers[index] = { ...newMembers[index], phone: e.target.value };
                                  setFormData(prev => ({ ...prev, members: newMembers }));
                                }}
                                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                                required
                              />
                              <Input
                                placeholder="Roll Number"
                                value={member.rollNumber}
                                onChange={(e) => {
                                  const newMembers = [...formData.members];
                                  newMembers[index] = { ...newMembers[index], rollNumber: e.target.value };
                                  setFormData(prev => ({ ...prev, members: newMembers }));
                                }}
                                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                                required
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Special Requirements */}
                  <div>
                    <Label htmlFor="requirements" className="text-white">Special Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={formData.specialRequirements}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialRequirements: e.target.value }))}
                      placeholder="Any special requirements or dietary restrictions..."
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      rows={3}
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="previous"
                        checked={formData.previousParticipation}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, previousParticipation: checked as boolean }))
                        }
                      />
                      <Label htmlFor="previous" className="text-white/80">
                        I have participated in MITS Fest before
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))
                        }
                        required
                      />
                      <Label htmlFor="terms" className="text-white/80">
                        I agree to the terms and conditions *
                      </Label>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  {(() => {
                    const eventDetails = getSelectedEventDetails();
                    return eventDetails ? (
                      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-4 rounded-lg border border-purple-500/30">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-medium flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Payment Summary
                          </h4>
                          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500">
                            ₹{eventDetails.fee}
                          </Badge>
                        </div>
                        <div className="text-white/80 text-sm">
                          Registration fee for {eventDetails.name}. Payment will be processed after form submission.
                        </div>
                      </div>
                    ) : null;
                  })()}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-lg py-6"
                    disabled={!formData.agreeTerms}
                  >
                    <Award className="h-5 w-5 mr-2" />
                    Register for Event
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Select an Event</h3>
                  <p className="text-white/70">Choose an event from the left panel to start your registration</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
