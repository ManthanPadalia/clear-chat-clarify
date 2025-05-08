
import { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { toast } from '@/components/ui/sonner';

type DocumentType = 'legal' | 'financial';

export type Document = {
  id: string;
  originalText: string;
  simplifiedText: string;
  type: DocumentType;
  timestamp: string;
};

type DocumentContextType = {
  currentDocument: {
    originalText: string;
    simplifiedText: string;
    type: DocumentType;
  };
  history: Document[];
  isProcessing: boolean;
  setOriginalText: (text: string) => void;
  setDocumentType: (type: DocumentType) => void;
  simplifyDocument: () => Promise<void>;
  clearCurrent: () => void;
  loadDocument: (document: Document) => void;
};

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [currentDocument, setCurrentDocument] = useState<{
    originalText: string;
    simplifiedText: string;
    type: DocumentType;
  }>({
    originalText: '',
    simplifiedText: '',
    type: 'legal'
  });
  
  const [history, setHistory] = useState<Document[]>(() => {
    const saved = localStorage.getItem('documentHistory');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isProcessing, setIsProcessing] = useState(false);

  const saveHistory = useCallback((newHistory: Document[]) => {
    setHistory(newHistory);
    localStorage.setItem('documentHistory', JSON.stringify(newHistory));
  }, []);

  const setOriginalText = (text: string) => {
    setCurrentDocument(prev => ({ ...prev, originalText: text }));
  };

  const setDocumentType = (type: DocumentType) => {
    setCurrentDocument(prev => ({ ...prev, type }));
  };

  // This would connect to an API in a real application
  const simplifyDocument = async () => {
    if (!currentDocument.originalText.trim()) {
      toast.error('Please enter some text to simplify.');
      return;
    }

    setIsProcessing(true);

    try {
      // Check if we've processed this exact text before
      const existingDoc = history.find(doc => 
        doc.originalText === currentDocument.originalText && 
        doc.type === currentDocument.type
      );

      if (existingDoc) {
        // Use cached result
        setCurrentDocument(prev => ({ 
          ...prev, 
          simplifiedText: existingDoc.simplifiedText 
        }));
        toast.success('Document simplified (from cache).');
        return;
      }

      // In a real app, we would call an API here
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock simplification by removing some complex words and shortening sentences
      const simplified = currentDocument.originalText
        .replace(/pursuant to/gi, "under")
        .replace(/in accordance with/gi, "following")
        .replace(/aforementioned/gi, "mentioned")
        .replace(/hereinafter/gi, "from now on")
        .replace(/notwithstanding/gi, "despite")
        .replace(/thereafter/gi, "then")
        .replace(/whereby/gi, "by which")
        .split('.')
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0)
        .map(sentence => {
          if (sentence.length > 100) {
            // Break long sentences
            return sentence.slice(0, 100) + "...";
          }
          return sentence;
        })
        .join('. ');

      const newDocument: Document = {
        id: Date.now().toString(),
        originalText: currentDocument.originalText,
        simplifiedText: simplified,
        type: currentDocument.type,
        timestamp: new Date().toISOString()
      };

      setCurrentDocument(prev => ({ ...prev, simplifiedText: simplified }));
      
      // Add to history
      const newHistory = [newDocument, ...history.slice(0, 19)]; // Keep only the last 20 items
      saveHistory(newHistory);
      
      toast.success('Document simplified successfully.');
    } catch (error) {
      console.error('Error simplifying document:', error);
      toast.error('Failed to simplify document. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const clearCurrent = () => {
    setCurrentDocument({
      originalText: '',
      simplifiedText: '',
      type: currentDocument.type
    });
  };

  const loadDocument = (document: Document) => {
    setCurrentDocument({
      originalText: document.originalText,
      simplifiedText: document.simplifiedText,
      type: document.type
    });
  };

  return (
    <DocumentContext.Provider 
      value={{
        currentDocument,
        history,
        isProcessing,
        setOriginalText,
        setDocumentType,
        simplifyDocument,
        clearCurrent,
        loadDocument
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};
