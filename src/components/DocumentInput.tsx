
import { useDocument } from "@/context/DocumentContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "@/components/ui/sonner";

const DocumentInput = () => {
  const { currentDocument, setOriginalText } = useDocument();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setOriginalText(text);
      toast.success(`File "${file.name}" uploaded successfully`);
    };
    
    reader.onerror = () => {
      toast.error("Error reading file");
    };
    
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="document-input">Original Document</Label>
      <div 
        className={`text-area-container ${isDragging ? 'ring-2 ring-primary' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Textarea
          id="document-input"
          value={currentDocument.originalText}
          onChange={(e) => setOriginalText(e.target.value)}
          placeholder="Paste your document text here..."
          className="text-area min-h-[300px] resize-y"
        />
        
        <div className="flex justify-end p-2 bg-gray-50 border-t">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-1"
          >
            <UploadCloud size={16} />
            <span>Upload</span>
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".txt,.doc,.docx,.pdf"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentInput;
