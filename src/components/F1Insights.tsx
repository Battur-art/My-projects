import { Brain, Dumbbell, Gauge, Wrench } from "lucide-react";

const InsightCard = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <div className="card-f1 p-6 flex gap-4 items-start">
    <div className="p-3 rounded-lg bg-secondary border border-border">
      <Icon className="text-f1-silver" size={24} />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-f1-silver text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const F1Insights = () => {
  return (
    <section id="insights" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-racing font-black mb-6">
            <span className="heading-f1">F1 INSIGHTS</span>
          </h2>
          <p className="text-xl text-f1-silver max-w-3xl mx-auto">
            Explore how cars are built, what they cost, and how drivers train to master the fastest sport on four wheels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* YouTube embeds (stacked) */}
          <div className="flex flex-col gap-8">
            <div className="card-f1 overflow-hidden">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/9zGaXl07dCg?si=-4hpx3ZhQXHgrb_L"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Second embed: update the src with your second video URL if needed */}
            <div className="card-f1 overflow-hidden">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/9ECAdmBjnyU?si=AIJpv8EYalO_b_Tp"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Facts */}
          <div className="grid grid-cols-1 gap-6">
            <InsightCard
              icon={Wrench}
              title="How much is an F1 car worth?"
              desc="An entire modern F1 car can exceed $12–15 million including development. Notable items: power unit ~$4–6M, chassis/monocoque ~$700k+, front wing ~$150k+, steering wheel ~$50k+."
            />
            <InsightCard
              icon={Dumbbell}
              title="How do drivers train?"
              desc="Drivers combine neck/isometric strength, cardio (HIIT), heat acclimation, and reaction drills. Neck loads can surpass 25–30 kg in high‑G corners, so specialized rigs and resistance bands are common."
            />
            <InsightCard
              icon={Gauge}
              title="How do the cars perform?"
              desc="0–100 km/h in ~2.6s, up to ~5G lateral in fast corners, and braking from 200 km/h to 0 in ~90–100 meters. Ground effect and advanced aero produce immense downforce."
            />
            <InsightCard
              icon={Brain}
              title="Driver cognition"
              desc="Race starts demand ~170–200 ms reactions. During races, drivers process strategy, tire management, ERS deployment, and radio comms while operating at the physical limit."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default F1Insights;
