const DemoSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-foreground mb-6">Quick Demo</h2>
        <p className="text-xl text-muted-foreground mb-12">
          See how Datrix transforms your data instantly.
        </p>
        
        <div className="bg-card rounded-lg shadow-sm border p-8">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-muted-foreground">Demo video coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;