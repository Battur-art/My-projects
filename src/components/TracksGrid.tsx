"use client";
import { useMemo, useState } from "react";
import { MapPin, Ruler, Flag, Timer, Search, ArrowUpRight } from "lucide-react";

interface Track {
  id: number;
  name: string;
  country: string;
  location: string;
  lengthKm: number;
  laps: number;
  raceDistanceKm: number;
  record?: string;
  url: string; // FIA link
  wikiUrl: string; // Wikipedia link
  image: string; // public image path
}

const tracks: Track[] = [
  {
    id: 1,
    name: "Bahrain International Circuit",
    country: "Bahrain",
    location: "Sakhir",
    lengthKm: 5.412,
    laps: 57,
    raceDistanceKm: 308.238,
    record: "1:31.447 (2024)",
    url: "https://www.fia.com/events/fia-formula-one-world-championship/season-2024/bahrain-grand-prix",
    wikiUrl: "https://en.wikipedia.org/wiki/Bahrain_International_Circuit",
    image: "/images/tracks/bahrain.jpg",
  },
  {
    id: 2,
    name: "Jeddah Corniche Circuit",
    country: "Saudi Arabia",
    location: "Jeddah",
    lengthKm: 6.174,
    laps: 50,
    raceDistanceKm: 308.45,
    record: "1:30.734 (2024)",
    url: "https://www.fia.com/events/fia-formula-one-world-championship/season-2024/saudi-arabian-grand-prix",
    wikiUrl: "https://en.wikipedia.org/wiki/Jeddah_Corniche_Circuit",
    image: "/images/tracks/singapore.jpg",
  },
  {
    id: 3,
    name: "Albert Park Circuit",
    country: "Australia",
    location: "Melbourne",
    lengthKm: 5.278,
    laps: 58,
    raceDistanceKm: 306.124,
    record: "1:20.235 (2023)",
    url: "https://www.fia.com/events/fia-formula-one-world-championship/season-2024/australian-grand-prix",
    wikiUrl: "https://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit",
    image: "/images/tracks/austraulia.avif",
  },
  {
    id: 4,
    name: "Autodromo Enzo e Dino Ferrari",
    country: "Italy",
    location: "Imola",
    lengthKm: 4.909,
    laps: 63,
    raceDistanceKm: 309.049,
    record: "1:15.484 (2020)",
    url: "https://www.fia.com/events/fia-formula-one-world-championship/season-2024/emilia-romagna-grand-prix",
    wikiUrl: "https://en.wikipedia.org/wiki/Autodromo_Enzo_e_Dino_Ferrari",
    image: "/images/tracks/ferrari.jpg",
  },
  {
    id: 5,
    name: "Circuit de Monaco",
    country: "Monaco",
    location: "Monte Carlo",
    lengthKm: 3.337,
    laps: 78,
    raceDistanceKm: 260.286,
    record: "1:12.909 (2021)",
    url: "https://www.fia.com/events/fia-formula-one-world-championship/season-2024/monaco-grand-prix",
    wikiUrl: "https://en.wikipedia.org/wiki/Circuit_de_Monaco",
    image: "/images/tracks/monaco.jpg",
  },
  {
    id: 6,
    name: "Circuit de Barcelona-Catalunya",
    country: "Spain",
    location: "Barcelona",
    lengthKm: 4.657,
    laps: 66,
    raceDistanceKm: 307.236,
    record: "1:16.330 (2021)",
    url: "https://www.fia.com/events/fia-formula-one-world-championship/season-2024/spanish-grand-prix",
    wikiUrl: "https://en.wikipedia.org/wiki/Circuit_de_Barcelona-Catalunya",
    image: "/images/tracks/barcelona.jpg",
  },
  {
    id: 7,
    name: "Silverstone Circuit",
    country: "United Kingdom",
    location: "Silverstone",
    lengthKm: 5.891,
    laps: 52,
    raceDistanceKm: 306.198,
    record: "1:27.097 (2019)",
    url: "https://www.fia.com/events/fia-formula-one-world-championship/season-2024/british-grand-prix",
    wikiUrl: "https://en.wikipedia.org/wiki/Silverstone_Circuit",
    image: "/images/tracks/silverstone.jpg",
  },
  {
    id: 8,
    name: "Spa-Francorchamps",
    country: "Belgium",
    location: "Stavelot",
    lengthKm: 7.004,
    laps: 44,
    raceDistanceKm: 308.052,
    record: "1:46.286 (2018)",
    url: "https://www.fia.com/events/fia-formula-one-world-championship/season-2024/belgian-grand-prix",
    wikiUrl: "https://en.wikipedia.org/wiki/Circuit_de_Spa-Francorchamps",
    image: "/images/tracks/spa.jpg",
  },
  {
    id: 9,
    name: "Monza (Autodromo Nazionale)",
    country: "Italy",
    location: "Monza",
    lengthKm: 5.793,
    laps: 53,
    raceDistanceKm: 306.72,
    record: "1:21.046 (2004)",
    url: "https://www.fia.com/events/fia-formula-one-world-championship/season-2024/italian-grand-prix",
    wikiUrl: "https://en.wikipedia.org/wiki/Monza_Circuit",
    image: "/images/tracks/monza.avif",
  },
  {
    id: 10,
    name: "Yas Marina Circuit",
    country: "UAE",
    location: "Abu Dhabi",
    lengthKm: 5.281,
    laps: 58,
    raceDistanceKm: 306.183,
    record: "1:26.103 (2021)",
    url: "https://www.fia.com/events/fia-formula-one-world-championship/season-2024/abu-dhabi-grand-prix",
    wikiUrl: "https://en.wikipedia.org/wiki/Yas_Marina_Circuit",
    image: "/images/tracks/marina.avif",
  },
];

// Small inline SVG outlines for visual variety (stylized, not to scale)
const TrackOutline = ({ id }: { id: number }) => {
  const common = "stroke-current text-f1-red/60";
  switch (id) {
    case 1: // Bahrain
      return (
        <svg viewBox="0 0 100 60" className="w-24 h-14 opacity-20">
          <path d="M10 50 Q20 20 40 25 T70 20 Q85 30 90 45 T60 50 Q35 55 10 50 Z" fill="none" strokeWidth="3" className={common} />
        </svg>
      );
    case 2: // Jeddah
      return (
        <svg viewBox="0 0 100 60" className="w-24 h-14 opacity-20">
          <path d="M10 45 L30 15 Q45 10 55 22 T75 18 L90 30 Q80 45 60 48 T25 50 Z" fill="none" strokeWidth="3" className={common} />
        </svg>
      );
    case 3: // Albert Park
      return (
        <svg viewBox="0 0 100 60" className="w-24 h-14 opacity-20">
          <path d="M15 40 Q25 15 45 18 T75 25 Q85 35 80 45 T50 48 Q28 50 15 40 Z" fill="none" strokeWidth="3" className={common} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 60" className="w-24 h-14 opacity-20">
          <path d="M12 48 Q30 12 55 18 T88 30 Q70 50 40 52 T12 48 Z" fill="none" strokeWidth="3" className={common} />
        </svg>
      );
  }
};

const TracksGrid = () => {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<string>("All");

  const countries = useMemo(() => {
    const set = new Set(tracks.map(t => t.country));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    return tracks.filter(t => {
      const matchesQuery = `${t.name} ${t.location} ${t.country}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCountry = country === "All" || t.country === country;
      return matchesQuery && matchesCountry;
    });
  }, [query, country]);

  return (
    <section id="tracks" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-racing font-black mb-4">
            <span className="heading-f1">TRACKS</span>
          </h2>
          <p className="text-f1-silver max-w-2xl mx-auto">
            A curated selection of iconic Formula 1 circuits from around the world
          </p>
          <p className="mt-2 text-xs text-f1-silver/70">
            Circuit outlines via
            {' '}
            <a
              href="https://commons.wikimedia.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-f1-red"
            >
              Wikipedia/Commons
            </a>
          </p>
        </div>

        {/* Filters */}
        <div className="card-f1 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-f1-gray" size={18} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by track, country, or city..."
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-f1-carbon border border-border text-f1-white placeholder:text-f1-gray focus:outline-none focus:ring-2 focus:ring-f1-red"
              />
            </div>
            <div>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="px-3 py-2 rounded-lg bg-f1-carbon border border-border text-f1-white focus:outline-none focus:ring-2 focus:ring-f1-red"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t, index) => (
            <div
              key={t.id}
              className="card-f1 p-6 animate-scale-in relative transition-shadow hover:shadow-lg hover:shadow-f1-red/10 group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Track image thumbnail */}
              <div className="mb-4 overflow-hidden rounded-lg bg-black/20">
                <img
                  src={t.image}
                  alt={`${t.name} layout`}
                  className="w-full h-40 object-cover p-3"
                />
              </div>
              {/* Decorative track outline */}
              <div className="absolute -top-2 -right-2">
                <TrackOutline id={t.id} />
              </div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-f1-white font-racing text-xl font-bold">
                    {t.name}
                  </h3>
                  <div className="text-f1-gray text-sm flex items-center gap-2">
                    <MapPin size={16} /> {t.location} · {t.country}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-f1-red font-semibold bg-f1-red/10 px-3 py-1 rounded-lg text-sm flex items-center gap-1 hover:bg-f1-red/20 focus:outline-none focus:ring-2 focus:ring-f1-red"
                  >
                    FIA <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={t.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-f1-silver/80 hover:text-f1-red text-xs px-2 py-1 rounded-lg border border-border flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-f1-red"
                  >
                    Wiki <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-f1-silver">
                  <Ruler size={16} />
                  <span>
                    {t.lengthKm.toFixed(3)} km
                  </span>
                </div>
                <div className="flex items-center gap-2 text-f1-silver">
                  <Flag size={16} />
                  <span>{t.laps} laps</span>
                </div>
                <div className="flex items-center gap-2 text-f1-silver">
                  <Ruler size={16} />
                  <span>
                    {t.raceDistanceKm.toFixed(3)} km total
                  </span>
                </div>
                <div className="flex items-center gap-2 text-f1-silver">
                  <Timer size={16} />
                  <span>Record: {t.record ?? "—"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TracksGrid;
