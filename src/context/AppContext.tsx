
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event, Registration, FestSettings, Department, Admin } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface AppContextType {
  // Settings
  festSettings: FestSettings;
  updateFestSettings: (settings: Partial<FestSettings>) => void;
  
  // Events
  events: Event[];
  addEvent: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  
  // Registrations
  registrations: Registration[];
  addRegistration: (registration: Omit<Registration, 'id' | 'registrationDate' | 'qrCode'>) => void;
  updateRegistration: (id: string, registration: Partial<Registration>) => void;
  
  // Departments
  departments: Department[];
  updateDepartments: (departments: Department[]) => void;
  
  // Admin
  currentAdmin: Admin | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultSettings: FestSettings = {
  festName: "MITS FEST 2024",
  festSubtitle: "Innovation • Technology • Excellence",
  festDescription: "Join us for the most exciting tech fest of the year featuring competitions, workshops, and networking opportunities.",
  eventDate: "2024-03-15T09:00:00",
  venue: "MITS Campus, Madanapalle",
  logoUrl: "",
  bannerUrl: "",
  primaryColor: "#7c3aed",
  secondaryColor: "#3b82f6",
  contactEmail: "mitsfest@mits.ac.in",
  contactPhone: "+91 123 456 7890",
  socialLinks: {}
};

const defaultDepartments: Department[] = [
  { id: "1", name: "Computer Science", description: "Cutting-edge computing events", icon: "💻", color: "bg-blue-500", head: "Dr. Smith", contact: "cs@mits.ac.in", eventCount: 8 },
  { id: "2", name: "Electronics", description: "Electronic innovation challenges", icon: "🔌", color: "bg-green-500", head: "Dr. Johnson", contact: "ece@mits.ac.in", eventCount: 6 },
  { id: "3", name: "Mechanical", description: "Engineering design competitions", icon: "⚙️", color: "bg-orange-500", head: "Dr. Brown", contact: "mech@mits.ac.in", eventCount: 5 },
  { id: "4", name: "Civil", description: "Infrastructure and design events", icon: "🏗️", color: "bg-purple-500", head: "Dr. Davis", contact: "civil@mits.ac.in", eventCount: 4 },
  { id: "5", name: "Chemical", description: "Process engineering challenges", icon: "🧪", color: "bg-red-500", head: "Dr. Wilson", contact: "chem@mits.ac.in", eventCount: 3 },
  { id: "6", name: "Biotechnology", description: "Bio-innovation competitions", icon: "🧬", color: "bg-teal-500", head: "Dr. Miller", contact: "biotech@mits.ac.in", eventCount: 4 }
];

const defaultAdmin: Admin = {
  id: "admin1",
  username: "admin",
  email: "admin@mits.ac.in",
  role: "super_admin",
  lastLogin: new Date().toISOString()
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [festSettings, setFestSettings] = useLocalStorage<FestSettings>('festSettings', defaultSettings);
  const [events, setEvents] = useLocalStorage<Event[]>('events', []);
  const [registrations, setRegistrations] = useLocalStorage<Registration[]>('registrations', []);
  const [departments, setDepartments] = useLocalStorage<Department[]>('departments', defaultDepartments);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateFestSettings = (settings: Partial<FestSettings>) => {
    setFestSettings(prev => ({ ...prev, ...settings }));
  };

  const addEvent = (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id 
        ? { ...event, ...eventData, updatedAt: new Date().toISOString() }
        : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const addRegistration = (regData: Omit<Registration, 'id' | 'registrationDate' | 'qrCode'>) => {
    const newRegistration: Registration = {
      ...regData,
      id: `REG${Date.now()}`,
      registrationDate: new Date().toISOString(),
      qrCode: `QR${Date.now()}`
    };
    setRegistrations(prev => [...prev, newRegistration]);
  };

  const updateRegistration = (id: string, regData: Partial<Registration>) => {
    setRegistrations(prev => prev.map(reg => 
      reg.id === id ? { ...reg, ...regData } : reg
    ));
  };

  const updateDepartments = (newDepartments: Department[]) => {
    setDepartments(newDepartments);
  };

  const login = (username: string, password: string): boolean => {
    if (username === "admin" && password === "admin123") {
      setCurrentAdmin(defaultAdmin);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentAdmin(null);
    setIsAuthenticated(false);
  };

  const value: AppContextType = {
    festSettings,
    updateFestSettings,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    registrations,
    addRegistration,
    updateRegistration,
    departments,
    updateDepartments,
    currentAdmin,
    login,
    logout,
    isAuthenticated
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
