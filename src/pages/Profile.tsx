
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { useDocument } from "@/context/DocumentContext";
import { formatDistanceToNow } from "date-fns";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const { history } = useDocument();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null; // Will redirect due to the useEffect above
  }

  // Calculate usage statistics
  const documentsCount = history.length;
  const charactersProcessed = history.reduce(
    (total, doc) => total + doc.originalText.length,
    0
  );

  // For the demo, we'll use a fixed join date from user object
  const joinDate = new Date(user.joinDate);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header onToggleHistory={() => {}} />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">User Profile</h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* User Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p>{user.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Member Since</p>
                  <p>{formatDistanceToNow(joinDate, { addSuffix: true })}</p>
                </div>
                <div className="pt-4">
                  <Button variant="outline" onClick={() => navigate('/')}>
                    Back to Simplifier
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Documents Simplified</span>
                  <span className="font-medium">{documentsCount}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Characters Processed</span>
                  <span className="font-medium">{charactersProcessed.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Account Type</span>
                  <span className="font-medium">Free</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <div className="space-y-4">
                  {history.slice(0, 5).map((doc) => (
                    <div key={doc.id} className="border-b pb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100">
                          {doc.type === 'legal' ? 'Legal' : 'Financial'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(doc.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm line-clamp-2 text-gray-700">
                        {doc.originalText.substring(0, 120)}
                        {doc.originalText.length > 120 && '...'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No document history yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
