import Hero from "@/components/Hero";
import MyanmarMap from "@/components/MyanmarMap";
import ThreeJSScene from "@/components/ThreeJSScene";
import EnergyTimeline from "@/components/EnergyTimeline";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <MyanmarMap />
      <ThreeJSScene />
      <EnergyTimeline />
      
      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container px-4">
          <div className="text-center">
            <h3 className="text-xl font-display font-bold mb-2 text-gradient-primary">
              4D SNPP Proposal
            </h3>
            <p className="text-sm text-muted-foreground">
              Advanced nuclear energy solutions for Myanmar's sustainable industrial development
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
