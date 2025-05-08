
import { SignupForm } from "@/components/AuthForms";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto">
          <Link to="/" className="text-2xl font-bold text-clearchat-blue">
            ClearChat
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </main>
    </div>
  );
};

export default Signup;
