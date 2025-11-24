import { motion } from "framer-motion";
import { Box } from "lucide-react";

const ThreeJSScene = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Box className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            <h2 className="text-2xl md:text-4xl font-display font-bold">
              3D Spatial Layout
            </h2>
          </div>

          <div className="bg-card border border-primary/30 rounded-xl overflow-hidden glow-primary">
            <iframe 
              src="https://3d.energyencyclopedia.com/smr_hall?mode=iframe" 
              className="w-full aspect-video md:aspect-[16/9]"
              style={{ minHeight: "400px" }}
              allowFullScreen
              title="3D SMR Hall Layout"
            />
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#00d9ff" }} />
                <span className="text-xs font-semibold text-primary">Reactor Core</span>
              </div>
              <p className="text-xs text-muted-foreground">Central power generation</p>
            </div>

            <div className="p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff7a3d" }} />
                <span className="text-xs font-semibold text-accent">Heat Processing</span>
              </div>
              <p className="text-xs text-muted-foreground">Industrial heat utilization</p>
            </div>

            <div className="p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#4ade80" }} />
                <span className="text-xs font-semibold text-success">Power Distribution</span>
              </div>
              <p className="text-xs text-muted-foreground">Electrical grid connection</p>
            </div>

            <div className="p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#fbbf24" }} />
                <span className="text-xs font-semibold" style={{ color: "#fbbf24" }}>
                  Processing Plant
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Material processing</p>
            </div>

            <div className="p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#8b5cf6" }} />
                <span className="text-xs font-semibold" style={{ color: "#8b5cf6" }}>
                  Control Center
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Operations management</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreeJSScene;
