
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import DocumentType from "@/components/DocumentType";
import DocumentInput from "@/components/DocumentInput";
import DocumentResult from "@/components/DocumentResult";
import HistorySidebar from "@/components/HistorySidebar";
import { useDocument } from "@/context/DocumentContext";

const Index = () => {
  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState(false);
  const { simplifyDocument, isProcessing, currentDocument } = useDocument();

  const toggleHistorySidebar = () => {
    setIsHistorySidebarOpen(!isHistorySidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header onToggleHistory={toggleHistorySidebar} />
      
      <main className="container mx-auto px-4 pb-12 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Document Simplifier</h1>
          <p className="text-gray-600 text-center mb-6">
            Transform complex legal and financial documents into plain language
          </p>
          
          <DocumentType />
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <DocumentInput />
            <DocumentResult />
          </div>
          
          <div className="flex justify-center mt-8">
            <Button 
              onClick={simplifyDocument} 
              disabled={isProcessing || !currentDocument.originalText.trim()}
              className="px-8 py-6 text-lg"
            >
              {isProcessing ? "Simplifying..." : "Simplify"}
            </Button>
          </div>
        </div>
      </main>
      
      <HistorySidebar 
        isOpen={isHistorySidebarOpen} 
        onClose={() => setIsHistorySidebarOpen(false)} 
      />
    </div>
  );
};

export default Index;
