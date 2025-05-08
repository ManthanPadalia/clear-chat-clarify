
import { useDocument, Document } from "@/context/DocumentContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const HistorySidebar = ({ isOpen, onClose }: HistorySidebarProps) => {
  const { history, loadDocument } = useDocument();

  const handleDocumentClick = (document: Document) => {
    loadDocument(document);
    onClose();
  };

  return (
    <div 
      className={`history-sidebar ${isOpen ? 'translate-x-0' : 'translate-x-full'} ${history.length === 0 && 'flex items-center justify-center'}`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-medium">History</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>

      {history.length === 0 ? (
        <div className="text-center p-6 text-gray-500">
          No history yet
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="p-4 space-y-4">
            {history.map((document) => (
              <div 
                key={document.id}
                onClick={() => handleDocumentClick(document)}
                className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100">
                    {document.type === 'legal' ? 'Legal' : 'Financial'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(document.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <div className="text-sm line-clamp-3 text-gray-700">
                  {document.originalText.substring(0, 120)}
                  {document.originalText.length > 120 && '...'}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default HistorySidebar;
