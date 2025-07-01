
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import RegistrationForm from "@/components/RegistrationForm";

const RegistrationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-gray-200 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex space-x-6 text-red-600">
            <span>MITS Radio 90.8 CRS</span>
            <span>NAAC</span>
            <span>NIRF</span>
            <span>UGC Affairs</span>
            <span>Newsletter</span>
            <span>Contact Us</span>
          </div>
          <div className="flex space-x-4 text-gray-600">
            <span>📞 +91-8712655132 / 4 / 8, 08571280255</span>
            <span>🔒 Moodle Login</span>
            <span>✉️ admissions@mits.ac.in</span>
            <span>🔍 Search</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="text-gray-600 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">Event Registration</h1>
              <p className="text-gray-600">MITS FEST 2024</p>
            </div>
            <div></div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 py-3">
            <button onClick={() => navigate('/')} className="hover:bg-red-700 px-3 py-2 rounded transition-colors">Home</button>
            <button onClick={() => navigate('/events')} className="hover:bg-red-700 px-3 py-2 rounded transition-colors">Events</button>
            <a href="/#departments" className="hover:bg-red-700 px-3 py-2 rounded transition-colors">Departments</a>
            <span className="bg-red-700 px-3 py-2 rounded">Registration</span>
            <a href="#about" className="hover:bg-red-700 px-3 py-2 rounded transition-colors">About</a>
            <a href="#contact" className="hover:bg-red-700 px-3 py-2 rounded transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader className="text-center border-b border-gray-200">
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
