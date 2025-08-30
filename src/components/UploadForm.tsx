import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, FileSpreadsheet, FileJson, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadFormProps {
  onBack: () => void;
  onResult: (data: any) => void;
}

const UploadForm = ({ onBack, onResult }: UploadFormProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const allowedTypes = ['text/plain', 'text/csv', 'application/json'];
    const fileType = file.type;
    
    if (!allowedTypes.includes(fileType) && !file.name.endsWith('.txt') && !file.name.endsWith('.csv') && !file.name.endsWith('.json')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a .txt, .csv, or .json file",
        variant: "destructive"
      });
      return;
    }
    
    setFile(file);
    toast({
      title: "File uploaded",
      description: `${file.name} is ready to process`
    });
  };

  const processData = async () => {
    let dataToProcess = '';
    let dataType = 'text';

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        dataToProcess = content;
        
        if (file.name.endsWith('.csv')) {
          dataType = 'csv';
        } else if (file.name.endsWith('.json')) {
          dataType = 'json';
        }
        
        performTransformation(dataToProcess, dataType);
      };
      reader.readAsText(file);
    } else if (textInput.trim()) {
      dataToProcess = textInput;
      performTransformation(dataToProcess, 'text');
    } else {
      toast({
        title: "No data provided",
        description: "Please upload a file or enter text to process",
        variant: "destructive"
      });
      return;
    }
  };

  const performTransformation = (data: string, type: string) => {
    // Mock transformation logic
    let structured = [];
    let insights = {};

    switch (type) {
      case 'csv':
        const lines = data.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        structured = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(v => v.trim());
          const row: any = { id: index + 1 };
          headers.forEach((header, i) => {
            row[header] = values[i] || '';
          });
          return row;
        });
        insights = {
          totalRows: structured.length,
          columns: headers.length,
          columnNames: headers
        };
        break;
        
      case 'json':
        try {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed)) {
            structured = parsed.map((item, index) => ({ id: index + 1, ...item }));
          } else {
            structured = [{ id: 1, ...parsed }];
          }
          insights = {
            totalRecords: structured.length,
            fields: Object.keys(structured[0] || {}).filter(k => k !== 'id')
          };
        } catch (error) {
          toast({
            title: "Invalid JSON",
            description: "The uploaded JSON file is malformed",
            variant: "destructive"
          });
          return;
        }
        break;
        
      default: // text
        const sentences = data.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = data.toLowerCase().match(/\b\w+\b/g) || [];
        const wordCount = words.length;
        const uniqueWords = new Set(words);
        
        structured = sentences.map((sentence, index) => ({
          id: index + 1,
          sentence: sentence.trim(),
          wordCount: sentence.trim().split(/\s+/).length
        }));
        
        insights = {
          totalSentences: sentences.length,
          totalWords: wordCount,
          uniqueWords: uniqueWords.size,
          avgWordsPerSentence: Math.round(wordCount / sentences.length)
        };
        break;
    }

    onResult({ structured, insights, originalType: type });
  };

  const getFileIcon = (filename: string) => {
    if (filename.endsWith('.csv')) return <FileSpreadsheet className="w-5 h-5" />;
    if (filename.endsWith('.json')) return <FileJson className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Upload Your Data</h1>
          <p className="text-muted-foreground text-lg">
            Transform unstructured data into meaningful insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload File
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-primary">
                      {getFileIcon(file.name)}
                      <span className="font-medium">{file.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                    <Button variant="outline" onClick={() => setFile(null)}>
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-foreground font-medium">Drop files here</p>
                      <p className="text-sm text-muted-foreground">
                        Supports .txt, .csv, .json files
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".txt,.csv,.json"
                      onChange={handleFileInput}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Choose File
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Text Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Paste Text
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your unstructured text here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="min-h-48 resize-none"
              />
              <p className="text-sm text-muted-foreground mt-2">
                {textInput.length} characters
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-8">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={processData}
            disabled={!file && !textInput.trim()}
            className="min-w-48"
          >
            Process Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;