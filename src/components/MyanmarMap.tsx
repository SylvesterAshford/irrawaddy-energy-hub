import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

// Add your Mapbox token here
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic3lsdmVzdGVyLTY5IiwiYSI6ImNtaWN5cGJ1dzAwazIya3Nmdmd1aGhoZXoifQ.hTqUhAqeRX40oi9LP7O2BQ";

const MyanmarMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

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

      // Add optimal reactor locations (real cities along Irrawaddy River)
      const reactorLocations = [
        { coordinates: [94.8205, 20.8941], name: "Chauk - Oil Field Region" },
        { coordinates: [95.2222, 18.8246], name: "Pyay - Central Myanmar" },
        { coordinates: [95.4516, 17.6470], name: "Hinthada - Delta Region" },
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
  }, []);

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
            <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            <h2 className="text-2xl md:text-4xl font-display font-bold">
              Myanmar Strategic Locations
            </h2>
          </div>

          <div className="bg-card border border-primary/30 rounded-xl overflow-hidden glow-primary">
            <div ref={mapContainer} className="w-full h-[400px] md:h-[600px]" />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-primary glow-primary" />
                <span className="text-sm font-semibold text-primary">
                  Irrawaddy River
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Primary water source for cooling systems
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-accent glow-accent" />
                <span className="text-sm font-semibold text-accent">
                  SNPP Sites
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Optimal locations along the river corridor
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm font-semibold text-success">
                  Industrial Zones
                </span>
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
