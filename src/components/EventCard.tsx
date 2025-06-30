
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/types';
import { Calendar, MapPin, Users, IndianRupee, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate(`/register?event=${event.id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getAvailableSpots = () => {
    return event.maxParticipants - event.currentParticipants;
  };

  const isEventFull = () => {
    return getAvailableSpots() <= 0;
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white text-xl">{event.name}</CardTitle>
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
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-white/70">
            <Calendar className="h-4 w-4 mr-2 text-purple-400" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-white/70">
            <Clock className="h-4 w-4 mr-2 text-purple-400" />
            <span>{formatTime(event.time)}</span>
          </div>
          <div className="flex items-center text-white/70">
            <MapPin className="h-4 w-4 mr-2 text-purple-400" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center text-white/70">
            <IndianRupee className="h-4 w-4 mr-2 text-purple-400" />
            <span>₹{event.fee}</span>
          </div>
          <div className="flex items-center text-white/70">
            <Users className="h-4 w-4 mr-2 text-purple-400" />
            <span>{getAvailableSpots()} spots left</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="text-xs text-white/60">
            Team Size: {event.teamSize.min}-{event.teamSize.max} members
          </div>
          <Button 
            onClick={handleRegister}
            disabled={isEventFull() || event.status !== 'active'}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50"
          >
            {isEventFull() ? 'Full' : event.status !== 'active' ? 'Unavailable' : 'Register'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
