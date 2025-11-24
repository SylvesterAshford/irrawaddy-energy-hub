import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Zap, Flame, Atom } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Slider } from "@/components/ui/slider";

const generateTimeData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return hours.map((hour) => ({
    hour: `${hour.toString().padStart(2, "0")}:00`,
    electricity: 60 + Math.sin(hour * Math.PI / 12) * 20 + Math.random() * 10,
    heat: 40 + Math.cos(hour * Math.PI / 12) * 15 + Math.random() * 8,
    neutrons: 30 + Math.sin((hour + 6) * Math.PI / 12) * 10 + Math.random() * 5,
    total: 0,
  })).map(d => ({
    ...d,
    total: d.electricity + d.heat + d.neutrons,
  }));
};

const EnergyTimeline = () => {
  const [currentHour, setCurrentHour] = useState([12]);
  const data = generateTimeData();

  const currentData = data[currentHour[0]];

  return (
    <section className="py-12 md:py-20 bg-secondary/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            <h2 className="text-2xl md:text-4xl font-display font-bold">
              Time-Based Energy Optimization
            </h2>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 md:p-6 mb-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-muted-foreground">Current Time</span>
                <span className="text-2xl font-display font-bold text-primary">
                  {currentHour[0].toString().padStart(2, "0")}:00
                </span>
              </div>
              <Slider
                value={currentHour}
                onValueChange={setCurrentHour}
                max={23}
                step={1}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-primary/10 border border-primary/30 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-primary">Electricity</span>
                </div>
                <div className="text-3xl font-display font-bold text-foreground">
                  {currentData.electricity.toFixed(1)}
                  <span className="text-lg text-muted-foreground ml-1">MW</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="p-4 bg-accent/10 border border-accent/30 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-accent" />
                  <span className="text-sm font-semibold text-accent">Industrial Heat</span>
                </div>
                <div className="text-3xl font-display font-bold text-foreground">
                  {currentData.heat.toFixed(1)}
                  <span className="text-lg text-muted-foreground ml-1">MW</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="p-4 bg-success/10 border border-success/30 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Atom className="w-5 h-5 text-success" />
                  <span className="text-sm font-semibold text-success">Neutron Output</span>
                </div>
                <div className="text-3xl font-display font-bold text-foreground">
                  {currentData.neutrons.toFixed(1)}
                  <span className="text-lg text-muted-foreground ml-1">MW</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="p-4 bg-card border border-primary/50 rounded-lg glow-primary"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary via-accent to-success" />
                  <span className="text-sm font-semibold text-foreground">Total Output</span>
                </div>
                <div className="text-3xl font-display font-bold text-foreground">
                  {currentData.total.toFixed(1)}
                  <span className="text-lg text-muted-foreground ml-1">MW</span>
                </div>
              </motion.div>
            </div>

            <div className="h-[300px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorElectricity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(190, 95%, 55%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(190, 95%, 55%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorHeat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(25, 95%, 60%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(25, 95%, 60%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorNeutrons" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160, 80%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(160, 80%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="hour"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    label={{ value: "Output (MW)", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="electricity"
                    stroke="hsl(190, 95%, 55%)"
                    strokeWidth={2}
                    fill="url(#colorElectricity)"
                    name="Electricity"
                  />
                  <Area
                    type="monotone"
                    dataKey="heat"
                    stroke="hsl(25, 95%, 60%)"
                    strokeWidth={2}
                    fill="url(#colorHeat)"
                    name="Industrial Heat"
                  />
                  <Area
                    type="monotone"
                    dataKey="neutrons"
                    stroke="hsl(160, 80%, 50%)"
                    strokeWidth={2}
                    fill="url(#colorNeutrons)"
                    name="Neutron Output"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-card border border-border rounded-lg">
              <h3 className="font-display font-semibold mb-2 text-primary">Peak Hours (8AM-8PM)</h3>
              <p className="text-sm text-muted-foreground">
                Maximum electrical output for industrial operations and manufacturing processes
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <h3 className="font-display font-semibold mb-2 text-accent">Off-Peak (8PM-8AM)</h3>
              <p className="text-sm text-muted-foreground">
                Heat redirected to desalination, hydrogen production, and district heating
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <h3 className="font-display font-semibold mb-2 text-success">24/7 Optimization</h3>
              <p className="text-sm text-muted-foreground">
                Continuous neutron flux for medical isotope production and material research
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnergyTimeline;
