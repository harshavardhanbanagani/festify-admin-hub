
export interface Event {
  id: string;
  name: string;
  description: string;
  department: string;
  category: 'Technical' | 'Cultural' | 'Workshop' | 'Competition';
  fee: number;
  date: string;
  time: string;
  venue: string;
  rules: string;
  maxParticipants: number;
  currentParticipants: number;
  teamSize: {
    min: number;
    max: number;
  };
  status: 'active' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Registration {
  id: string;
  eventId: string;
  eventName: string;
  participantName: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  department: string;
  teamName?: string;
  teamMembers?: TeamMember[];
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  registrationDate: string;
  qrCode: string;
  certificateGenerated: boolean;
}

export interface TeamMember {
  name: string;
  email: string;
  phone: string;
  year: string;
  department: string;
}

export interface FestSettings {
  festName: string;
  festSubtitle: string;
  festDescription: string;
  eventDate: string;
  venue: string;
  logoUrl: string;
  bannerUrl: string;
  primaryColor: string;
  secondaryColor: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  head: string;
  contact: string;
  eventCount: number;
}

export interface Admin {
  id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'department_admin';
  department?: string;
  lastLogin: string;
}
