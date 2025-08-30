import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, FileText, Database, Mail, Code } from 'lucide-react';

const dataTypes = [
  {
    icon: FileText,
    title: "Text Data",
    description: "Extract structured insights from unstructured text documents and content."
  },
  {
    icon: Database,
    title: "CSV Data", 
    description: "Parse messy spreadsheets and transform them into clean, organized data."
  },
  {
    icon: Code,
    title: "JSON Data",
    description: "Flatten nested structures and convert complex JSON into readable tables."
  },
  {
    icon: Mail,
    title: "Emails & Logs",
    description: "Transform logs and email data into actionable business insights."
  }
];

const InfoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % dataTypes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + dataTypes.length) % dataTypes.length);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground text-center mb-16">
          What Can Datrix Do?
        </h2>
        
        <div className="relative">
          <Card className="bg-card border border-border">
            <CardContent className="p-12 text-center">
              {(() => {
                const currentType = dataTypes[currentIndex];
                const IconComponent = currentType.icon;
                return (
                  <>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {currentType.title}
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      {currentType.description}
                    </p>
                  </>
                );
              })()}
            </CardContent>
          </Card>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex justify-center mt-8 gap-2">
          {dataTypes.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-primary' : 'bg-border'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSlider;