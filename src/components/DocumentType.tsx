
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDocument } from "@/context/DocumentContext";

const DocumentType = () => {
  const { currentDocument, setDocumentType } = useDocument();
  
  const handleToggle = (checked: boolean) => {
    setDocumentType(checked ? 'financial' : 'legal');
  };

  return (
    <div className="flex items-center space-x-8 justify-center my-4">
      <div className="flex items-center space-x-2">
        <span className={`text-sm font-medium ${currentDocument.type === 'legal' ? 'text-clearchat-blue font-bold' : 'text-gray-500'}`}>
          Legal
        </span>
      </div>
      
      <Switch 
        checked={currentDocument.type === 'financial'} 
        onCheckedChange={handleToggle}
      />
      
      <div className="flex items-center space-x-2">
        <span className={`text-sm font-medium ${currentDocument.type === 'financial' ? 'text-clearchat-blue font-bold' : 'text-gray-500'}`}>
          Financial
        </span>
      </div>
    </div>
  );
};

export default DocumentType;
