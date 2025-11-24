import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { motion } from "framer-motion";
import { MapPin, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MyanmarMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [isTokenSet, setIsTokenSet] = useState(false);

  const handleSetToken = () => {
    if (mapboxToken.trim()) {
      setIsTokenSet(true);
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !isTokenSet) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [96.1951, 21.9162], // Center on Irrawaddy River, Myanmar
      zoom: 6,
      pitch: 45,
    });

    map.current.on("load", () => {
      if (!map.current) return;

      // Add Irrawaddy River highlight (approximation)
      map.current.addSource("irrawaddy", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [97.4, 28.2],
              [97.2, 26.8],
              [96.9, 25.5],
              [96.5, 24.1],
              [96.2, 22.8],
              [96.1, 21.9],
              [95.8, 20.5],
              [95.5, 19.2],
              [95.3, 17.8],
              [95.2, 16.5],
            ],
          },
        },
      });

      map.current.addLayer({
        id: "irrawaddy-line",
        type: "line",
        source: "irrawaddy",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "hsl(190, 95%, 55%)",
          "line-width": 6,
          "line-blur": 2,
        },
      });

      // Add glow effect
      map.current.addLayer({
        id: "irrawaddy-glow",
        type: "line",
        source: "irrawaddy",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "hsl(190, 95%, 55%)",
          "line-width": 20,
          "line-blur": 10,
          "line-opacity": 0.4,
        },
      });

      // Add optimal reactor locations
      const reactorLocations = [
        { coordinates: [96.2, 22.0], name: "Site A - Mandalay Region" },
        { coordinates: [96.1, 21.2], name: "Site B - Magway Region" },
        { coordinates: [95.3, 19.8], name: "Site C - Bago Region" },
      ];

      reactorLocations.forEach((location, index) => {
        const el = document.createElement("div");
        el.className = "reactor-marker";
        el.style.cssText = `
          width: 24px;
          height: 24px;
          background: hsl(25, 95%, 60%);
          border: 3px solid hsl(190, 95%, 55%);
          border-radius: 50%;
          box-shadow: 0 0 20px hsl(190, 95%, 55%), 0 0 40px hsl(25, 95%, 60%);
          cursor: pointer;
          animation: pulse 2s ease-in-out infinite;
          animation-delay: ${index * 0.3}s;
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 8px; background: hsl(220, 20%, 12%); color: hsl(220, 10%, 95%); font-family: Inter, sans-serif;">
            <strong style="color: hsl(190, 95%, 55%);">${location.name}</strong>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: hsl(220, 10%, 75%);">Optimal SNPP location</p>
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat(location.coordinates as [number, number])
          .setPopup(popup)
          .addTo(map.current!);
      });

      // Add pulse animation style
      const style = document.createElement("style");
      style.textContent = `
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
      `;
      document.head.appendChild(style);
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      map.current?.remove();
    };
  }, [isTokenSet, mapboxToken]);

  if (!isTokenSet) {
    return (
      <section className="py-20 bg-secondary/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Myanmar Strategic Locations
              </h2>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 max-w-2xl mx-auto">
              <div className="flex items-start gap-3 mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  To view the interactive map, please enter your Mapbox public token.
                  Get it from{" "}
                  <a
                    href="https://account.mapbox.com/access-tokens/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    mapbox.com
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter Mapbox public token (pk.xxxxx...)"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="font-mono text-sm"
                />
                <Button
                  onClick={handleSetToken}
                  disabled={!mapboxToken.trim()}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Load Interactive Map
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Myanmar Strategic Locations
            </h2>
          </div>

          <div className="bg-card border border-primary/30 rounded-xl overflow-hidden glow-primary">
            <div ref={mapContainer} className="w-full h-[600px]" />
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-primary glow-primary" />
                <span className="text-sm font-semibold text-primary">Irrawaddy River</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Primary water source for cooling systems
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-accent glow-accent" />
                <span className="text-sm font-semibold text-accent">SNPP Sites</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Optimal locations along the river corridor
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm font-semibold text-success">Industrial Zones</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Connected manufacturing and processing facilities
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MyanmarMap;
