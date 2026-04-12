"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Neckline = "Sweetheart" | "Boat" | "V-neck";
type Sleeve = "Cap" | "Elbow" | "Long";
type ThreadTone = "Antique Gold" | "Rose Gold" | "Ruby Silk";
type Fabric = "Ivory Raw Silk" | "Maroon Velvet" | "Rose Tissue";

type Zone = "Neckline" | "Sleeves" | "Back Motif";

const threadStroke: Record<ThreadTone, string> = {
  "Antique Gold": "#b6862f",
  "Rose Gold": "#bf8c76",
  "Ruby Silk": "#7a2f3b"
};

const fabricFill: Record<Fabric, string> = {
  "Ivory Raw Silk": "#f5ede2",
  "Maroon Velvet": "#6a2a35",
  "Rose Tissue": "#efd8cc"
};

const necklinePath: Record<Neckline, string> = {
  Sweetheart: "M 180 126 Q 250 176 320 126",
  Boat: "M 172 132 Q 250 110 328 132",
  "V-neck": "M 176 124 L 250 194 L 324 124"
};

const sleeveWidth: Record<Sleeve, number> = {
  Cap: 34,
  Elbow: 72,
  Long: 116
};

const zoneOptions: Zone[] = ["Neckline", "Sleeves", "Back Motif"];

export function SignatureField() {
  const [neckline, setNeckline] = useState<Neckline>("Sweetheart");
  const [sleeve, setSleeve] = useState<Sleeve>("Elbow");
  const [threadTone, setThreadTone] = useState<ThreadTone>("Antique Gold");
  const [fabric, setFabric] = useState<Fabric>("Ivory Raw Silk");
  const [motifDensity, setMotifDensity] = useState(3);
  const [zones, setZones] = useState<Zone[]>(["Neckline", "Sleeves"]);

  const embroideryScore = useMemo(() => {
    const base = motifDensity * 18;
    const zoneWeight = zones.length * 14;
    const sleeveWeight = sleeve === "Long" ? 18 : sleeve === "Elbow" ? 10 : 6;
    return Math.min(100, base + zoneWeight + sleeveWeight);
  }, [motifDensity, sleeve, zones]);

  const toggleZone = (zone: Zone) => {
    setZones((prev) => {
      if (prev.includes(zone)) {
        return prev.filter((item) => item !== zone);
      }

      return [...prev, zone];
    });
  };

  const artisanHours = 44 + motifDensity * 16 + zones.length * 11;
  const garmentFill = fabricFill[fabric];
  const stitchColor = threadStroke[threadTone];

  const necklineActive = zones.includes("Neckline");
  const sleeveActive = zones.includes("Sleeves");
  const backActive = zones.includes("Back Motif");

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
      <div className="space-y-5 rounded-3xl border border-ink/15 bg-canvas/80 p-5 md:p-6">
        <h3 className="font-display text-2xl text-ink">Blouse Personalization</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-clove/85">Neckline</span>
            <select
              value={neckline}
              onChange={(event) => setNeckline(event.target.value as Neckline)}
              className="w-full rounded-xl border border-ink/20 bg-pearl px-3 py-2 text-sm text-ink"
            >
              <option>Sweetheart</option>
              <option>Boat</option>
              <option>V-neck</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm text-clove/85">Sleeve style</span>
            <select
              value={sleeve}
              onChange={(event) => setSleeve(event.target.value as Sleeve)}
              className="w-full rounded-xl border border-ink/20 bg-pearl px-3 py-2 text-sm text-ink"
            >
              <option>Cap</option>
              <option>Elbow</option>
              <option>Long</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm text-clove/85">Thread finish</span>
            <select
              value={threadTone}
              onChange={(event) => setThreadTone(event.target.value as ThreadTone)}
              className="w-full rounded-xl border border-ink/20 bg-pearl px-3 py-2 text-sm text-ink"
            >
              <option>Antique Gold</option>
              <option>Rose Gold</option>
              <option>Ruby Silk</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm text-clove/85">Fabric base</span>
            <select
              value={fabric}
              onChange={(event) => setFabric(event.target.value as Fabric)}
              className="w-full rounded-xl border border-ink/20 bg-pearl px-3 py-2 text-sm text-ink"
            >
              <option>Ivory Raw Silk</option>
              <option>Maroon Velvet</option>
              <option>Rose Tissue</option>
            </select>
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm text-clove/85">Motif density</span>
          <input
            type="range"
            min={1}
            max={5}
            value={motifDensity}
            onChange={(event) => setMotifDensity(Number(event.target.value))}
            className="w-full accent-signal"
          />
        </label>

        <div>
          <p className="mb-2 text-sm text-clove/85">Tap areas to embroider</p>
          <div className="flex flex-wrap gap-2">
            {zoneOptions.map((zone) => {
              const active = zones.includes(zone);

              return (
                <button
                  key={zone}
                  type="button"
                  onClick={() => toggleZone(zone)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    active
                      ? "border-signal bg-signal text-canvas"
                      : "border-ink/20 bg-pearl text-ink hover:bg-fog/75"
                  }`}
                >
                  {zone}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-ink/12 bg-pearl/75 p-4 text-sm text-clove">
          Estimated artisan hours: <span className="font-semibold text-ink">{artisanHours}</span>
          <br />
          Craft intensity score: <span className="font-semibold text-ink">{embroideryScore}%</span>
        </div>
      </div>

      <div className="rounded-3xl border border-ink/15 bg-pearl/75 p-5 md:p-6">
        <h3 className="font-display text-2xl text-ink">Live Blouse Preview</h3>
        <p className="mt-2 text-sm leading-relaxed text-clove/85">
          Every selection updates the garment instantly so you can visualize your final
          embroidery before booking your fitting.
        </p>

        <div className="mt-5 overflow-hidden rounded-3xl border border-ink/12 bg-[linear-gradient(145deg,#f8f1e6_0%,#efe2cf_100%)] p-4">
          <svg viewBox="0 0 500 420" className="h-[290px] w-full md:h-[330px]" fill="none">
            <rect x="120" y="120" width="260" height="210" rx="46" fill={garmentFill} />
            <rect x="66" y="130" width="84" height={sleeveWidth[sleeve]} rx="22" fill={garmentFill} />
            <rect x="350" y="130" width="84" height={sleeveWidth[sleeve]} rx="22" fill={garmentFill} />

            <path
              d={necklinePath[neckline]}
              stroke={necklineActive ? stitchColor : "#9f8f82"}
              strokeWidth="8"
              strokeLinecap="round"
            />

            <path d="M 120 212 H 380" stroke="#ccb9a6" strokeWidth="2" strokeDasharray="5 6" />

            {sleeveActive && (
              <>
                {Array.from({ length: motifDensity + 1 }).map((_, index) => (
                  <circle
                    key={`left-${index}`}
                    cx={84 + index * 13}
                    cy={164 + index * 9}
                    r="5"
                    fill={stitchColor}
                    fillOpacity="0.88"
                  />
                ))}
                {Array.from({ length: motifDensity + 1 }).map((_, index) => (
                  <circle
                    key={`right-${index}`}
                    cx={416 - index * 13}
                    cy={164 + index * 9}
                    r="5"
                    fill={stitchColor}
                    fillOpacity="0.88"
                  />
                ))}
              </>
            )}

            {backActive && (
              <g>
                <circle cx="250" cy="244" r={22 + motifDensity * 5} stroke={stitchColor} strokeWidth="4" />
                <circle cx="250" cy="244" r={10 + motifDensity * 2} fill={stitchColor} fillOpacity="0.3" />
              </g>
            )}
          </svg>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-ink/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-signal"
            animate={{ width: `${embroideryScore}%` }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-clove/85">Embroidery richness</p>
          <span className="rounded-full border border-ink/20 bg-canvas px-3 py-1 text-sm text-ink">
            {embroideryScore}%
          </span>
        </div>
      </div>
    </div>
  );
}
