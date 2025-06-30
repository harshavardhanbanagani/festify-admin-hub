
import EventList from "@/components/EventList";

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Event Listings
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover amazing competitions, workshops, and cultural events at MITS Fest 2024
          </p>
        </div>
        <EventList />
      </div>
    </div>
  );
};

export default EventsPage;
