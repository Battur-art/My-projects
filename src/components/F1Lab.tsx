import { useEffect, useMemo, useRef, useState } from "react";

const formatMs = (ms: number) => `${ms.toFixed(0)} ms`;

const ReactionTester = () => {
  const [status, setStatus] = useState<"idle" | "waiting" | "go">("idle");
  const [message, setMessage] = useState("Click 'Get Ready' and wait for GO!");
  const [result, setResult] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const start = () => {
    setResult(null);
    setStatus("waiting");
    setMessage("Wait for GO... (don't click early)");
    const delay = 1500 + Math.random() * 2500; // 1.5s - 4s
    timerRef.current = window.setTimeout(() => {
      setStatus("go");
      setMessage("GO!");
      startRef.current = performance.now();
    }, delay);
  };

  const onClickPanel = () => {
    if (status === "waiting") {
      // clicked too early
      if (timerRef.current) window.clearTimeout(timerRef.current);
      setStatus("idle");
      setMessage("Too early! Click 'Get Ready' to try again.");
      startRef.current = null;
      return;
    }
    if (status === "go" && startRef.current) {
      const rt = performance.now() - startRef.current;
      setResult(rt);
      setBest((prev) => (prev == null || rt < prev ? rt : prev));
      setStatus("idle");
      setMessage("Click 'Get Ready' to try again.");
      startRef.current = null;
    }
  };

  return (
    <div className="card-f1 p-6 md:p-8 flex flex-col gap-4">
      <div>
        <h3 className="text-2xl font-racing font-black mb-2">
          <span className="heading-f1">Reaction Time Tester</span>
        </h3>
        <p className="text-f1-silver">F1 drivers react to lights in ~170–200 ms during race starts.</p>
      </div>

      <div
        role="button"
        onClick={onClickPanel}
        className={`rounded-xl border border-border h-40 md:h-48 flex items-center justify-center text-xl md:text-2xl font-semibold select-none transition-colors ${
          status === "go" ? "bg-green-600/20 text-green-400" : status === "waiting" ? "bg-yellow-600/10 text-yellow-300" : "bg-secondary text-f1-silver"
        }`}
      >
        {message}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={start} className="btn-racing">Get Ready</button>
        {result != null && (
          <div className="text-f1-silver">
            Your time: <span className="text-white font-semibold">{formatMs(result)}</span>
          </div>
        )}
        {best != null && (
          <div className="ml-auto text-f1-silver">
            Personal best: <span className="text-white font-semibold">{formatMs(best)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const GFSim = () => {
  const [speedKmh, setSpeedKmh] = useState(160); // km/h
  const [radiusM, setRadiusM] = useState(80); // meters

  const gForce = useMemo(() => {
    const v = (speedKmh * 1000) / 3600; // m/s
    const g = 9.80665; // m/s^2
    const a = (v * v) / Math.max(1, radiusM); // m/s^2
    return a / g; // g units
  }, [speedKmh, radiusM]);

  const clampedG = Math.min(6, Math.max(0, gForce));
  const percent = Math.min(100, Math.max(0, (clampedG / 6) * 100));

  return (
    <div className="card-f1 p-6 md:p-8 flex flex-col gap-4">
      <div>
        <h3 className="text-2xl font-racing font-black mb-2">
          <span className="heading-f1">Cornering G‑Force</span>
        </h3>
        <p className="text-f1-silver">Adjust speed and corner radius to see lateral G. F1 cars can exceed 5G in fast corners.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-sm text-f1-silver">Speed: <span className="text-white font-semibold">{speedKmh} km/h</span></label>
          <input
            type="range"
            min={50}
            max={350}
            value={speedKmh}
            onChange={(e) => setSpeedKmh(parseInt(e.target.value))}
            className="w-full"
          />

          <label className="block text-sm text-f1-silver">Corner Radius: <span className="text-white font-semibold">{radiusM} m</span></label>
          <input
            type="range"
            min={20}
            max={300}
            value={radiusM}
            onChange={(e) => setRadiusM(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex flex-col justify-center gap-3">
          <div className="text-5xl font-black"><span className="heading-f1">{gForce.toFixed(2)}G</span></div>
          <div className="w-full h-4 bg-secondary rounded-full overflow-hidden border border-border">
            <div
              className="h-full bg-racing"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-f1-silver text-sm">0G (straight) — 6G (extreme). Typical road cars rarely exceed ~1G on street tires.</p>
        </div>
      </div>
    </div>
  );
};

const F1Lab = () => {
  return (
    <section id="lab" className="py-20 px-6 bg-f1-carbon">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-racing font-black mb-6">
            <span className="heading-f1">F1 LAB</span>
          </h2>
          <p className="text-xl text-f1-silver max-w-3xl mx-auto">
            Try interactive demos that illustrate the reflexes and physics behind Formula 1.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ReactionTester />
          <GFSim />
        </div>
      </div>
    </section>
  );
};

export default F1Lab;
