
import { useDocument } from "@/context/DocumentContext";
import { Label } from "@/components/ui/label";

const DocumentResult = () => {
  const { currentDocument, isProcessing } = useDocument();

  return (
    <div className="space-y-2">
      <Label>Simplified Result</Label>
      <div className="result-container min-h-[300px] overflow-auto">
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-clearchat-blue"></div>
            <p className="mt-4 text-gray-500">Simplifying document...</p>
          </div>
        ) : currentDocument.simplifiedText ? (
          <div className="prose prose-sm max-w-none">
            {currentDocument.simplifiedText}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p>Simplified text will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentResult;
