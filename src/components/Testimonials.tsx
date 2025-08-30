import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: "Amit",
    text: "Datrix saved us hours of manual work!"
  },
  {
    name: "Priya", 
    text: "Turning messy data into insights is now effortless."
  },
  {
    name: "John",
    text: "Simple, fast, and very useful for our business."
  },
  {
    name: "Sarah",
    text: "The best data transformation tool we've used."
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground text-center mb-16">
          What Our Users Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border border-border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <p className="text-card-foreground mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-primary">– {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;