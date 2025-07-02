
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import RegistrationForm from "@/components/RegistrationForm";

const RegistrationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="text-gray-600 hover:text-red-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">Event Registration</h1>
              <p className="text-gray-600">Join us for the most exciting tech fest</p>
            </div>
            <div></div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8 py-3">
            <button onClick={() => navigate('/')} className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">Home</button>
            <button onClick={() => navigate('/events')} className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">Events</button>
            <a href="/#departments" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">Departments</a>
            <span className="text-red-600 px-3 py-2 font-medium border-b-2 border-red-600">Registration</span>
            <a href="/#about" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">About</a>
            <a href="/#contact" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-white shadow-sm border">
          <CardHeader className="text-center border-b">
            <CardTitle className="text-2xl text-gray-800">Register for Events</CardTitle>
            <p className="text-gray-600">Join us for the most exciting tech fest of the year</p>
          </CardHeader>
          <CardContent className="p-6">
            <RegistrationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationPage;
