import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Download, BarChart, FileText, TrendingUp } from 'lucide-react';

interface ResultsProps {
  data: {
    structured: any[];
    insights: any;
    originalType: string;
  };
  onBack: () => void;
  onStartOver: () => void;
}

const Results = ({ data, onBack, onStartOver }: ResultsProps) => {
  const { structured, insights, originalType } = data;

  const downloadCSV = () => {
    if (!structured.length) return;

    const headers = Object.keys(structured[0]);
    const csvContent = [
      headers.join(','),
      ...structured.map(row => 
        headers.map(header => `"${row[header]}"`).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datrix-structured-data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderInsights = () => {
    const insightCards = [];

    switch (originalType) {
      case 'csv':
        insightCards.push(
          <Card key="rows" className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">{insights.totalRows}</div>
              <div className="text-sm text-muted-foreground">Total Rows</div>
            </CardContent>
          </Card>,
          <Card key="columns" className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">{insights.columns}</div>
              <div className="text-sm text-muted-foreground">Columns</div>
            </CardContent>
          </Card>
        );
        break;
        
      case 'json':
        insightCards.push(
          <Card key="records" className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">{insights.totalRecords}</div>
              <div className="text-sm text-muted-foreground">Records</div>
            </CardContent>
          </Card>,
          <Card key="fields" className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">{insights.fields?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Fields</div>
            </CardContent>
          </Card>
        );
        break;
        
      default: // text
        insightCards.push(
          <Card key="sentences" className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">{insights.totalSentences}</div>
              <div className="text-sm text-muted-foreground">Sentences</div>
            </CardContent>
          </Card>,
          <Card key="words" className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">{insights.totalWords}</div>
              <div className="text-sm text-muted-foreground">Total Words</div>
            </CardContent>
          </Card>,
          <Card key="unique" className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">{insights.uniqueWords}</div>
              <div className="text-sm text-muted-foreground">Unique Words</div>
            </CardContent>
          </Card>,
          <Card key="avg" className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">{insights.avgWordsPerSentence}</div>
              <div className="text-sm text-muted-foreground">Avg Words/Sentence</div>
            </CardContent>
          </Card>
        );
        break;
    }

    return insightCards;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Upload
          </Button>
          <Button variant="outline" onClick={onStartOver}>
            Start Over
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Data Transformation Complete</h1>
          <p className="text-muted-foreground text-lg">
            Your {originalType.toUpperCase()} data has been successfully structured
          </p>
        </div>

        {/* Insights Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Insights Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {renderInsights()}
            </div>
          </CardContent>
        </Card>

        {/* Structured Data Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Structured Data ({structured.length} rows)
            </CardTitle>
            <Button onClick={downloadCSV} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
          </CardHeader>
          <CardContent>
            {structured.length > 0 ? (
              <div className="rounded-lg border overflow-auto max-h-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys(structured[0]).map((header) => (
                        <TableHead key={header} className="font-semibold">
                          {header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {structured.slice(0, 20).map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value: any, cellIndex) => (
                          <TableCell key={cellIndex} className="max-w-xs truncate">
                            {String(value)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No structured data available
              </div>
            )}
            
            {structured.length > 20 && (
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Showing first 20 rows of {structured.length} total rows
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Button variant="primary" size="lg" onClick={onStartOver}>
            <TrendingUp className="w-5 h-5 mr-2" />
            Process More Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;