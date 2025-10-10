import { 
  Zap, 
  Clock, 
  Settings, 
  Target, 
  Battery, 
  Cog 
} from "lucide-react";

interface Fact {
  id: number;
  title: string;
  description: string;
  detail: string;
  icon: string;
}

interface FactCardProps {
  fact: Fact;
}

const iconMap = {
  zap: Zap,
  clock: Clock,
  settings: Settings,
  target: Target,
  battery: Battery,
  cog: Cog,
};

const FactCard = ({ fact }: FactCardProps) => {
  const IconComponent = iconMap[fact.icon as keyof typeof iconMap] || Zap;

  return (
    <div className="card-f1 p-6 group">
      <div className="flex items-start gap-4">
        <div className="bg-f1-red p-3 rounded-xl shadow-racing group-hover:animate-racing-pulse">
          <IconComponent size={24} className="text-white" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-racing font-bold text-f1-white mb-2">
            {fact.title}
          </h3>
          <p className="text-f1-red font-semibold mb-3">
            {fact.description}
          </p>
          <p className="text-f1-silver text-sm leading-relaxed">
            {fact.detail}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FactCard;