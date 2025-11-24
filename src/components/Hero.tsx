import { motion } from "framer-motion";
import { Atom, Zap, Clock, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8 flex justify-center gap-4"
          >
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 glow-primary">
              <Atom className="w-8 h-8 text-primary" />
            </div>
            <div className="p-3 rounded-lg bg-success/10 border border-success/20">
              <Zap className="w-8 h-8 text-success" />
            </div>
            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
              <Clock className="w-8 h-8 text-accent" />
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
            <span className="text-gradient-primary">4D SNPP</span>
            <br />
            <span className="text-foreground">Regional Development</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing Myanmar's industrial landscape through{" "}
            <span className="text-primary font-semibold">Small Nuclear Power Plants</span> with
            spatial optimization and time-based energy management
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-xl bg-card border border-border backdrop-blur-sm"
            >
              <div className="text-4xl font-display font-bold text-primary mb-2">3D</div>
              <div className="text-sm text-muted-foreground">Spatial Layout</div>
              <div className="text-xs text-muted-foreground mt-2">Optimal facility positioning</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-xl bg-card border border-border backdrop-blur-sm"
            >
              <div className="text-4xl font-display font-bold text-success mb-2">+1D</div>
              <div className="text-sm text-muted-foreground">Time Integration</div>
              <div className="text-xs text-muted-foreground mt-2">24/7 efficiency optimization</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-xl bg-card border border-border backdrop-blur-sm"
            >
              <div className="text-4xl font-display font-bold text-accent mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Resource Usage</div>
              <div className="text-xs text-muted-foreground mt-2">Energy, heat & neutrons</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
