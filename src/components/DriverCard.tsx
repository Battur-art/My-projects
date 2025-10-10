'use client'

import { useState } from "react";
import { Trophy, Flag, Timer } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Driver {
  id: number;
  name: string;
  team: string;
  number: number;
  nationality: string;
  photo: string;
  topSpeed: string;
  championships: number;
  wins: number;
  bio: string;
}

interface DriverCardProps {
  driver: Driver;
}

const DriverCard = ({ driver }: DriverCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="card-f1 p-6 cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <Image 
            src={"/images/drivers/" + driver.photo}
            alt={driver.name}
            width={400}
            height={400}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3 bg-f1-red text-white font-bold text-lg px-3 py-1 rounded-lg">
            #{driver.number}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-racing font-bold text-f1-white">
            {driver.name}
          </h3>
          <p className="text-f1-gray font-medium">{driver.team}</p>
          <div className="flex items-center gap-2 text-sm text-f1-silver">
            <Flag size={16} />
            {driver.nationality}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1 text-f1-silver">
              <Trophy size={16} />
              <span>{driver.championships} Championships</span>
            </div>
            <div className="text-f1-red font-semibold">
              {driver.wins} Wins
            </div>
          </div>
        </div>
      </div>

      {/* Driver Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-f1-carbon border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-racing text-f1-white">
              {driver.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img 
                src={"/images/drivers/" + driver.photo}
                alt={driver.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-f1-red mb-2">{driver.team}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-f1-gray">Number:</span>
                    <div className="font-semibold text-f1-white">#{driver.number}</div>
                  </div>
                  <div>
                    <span className="text-f1-gray">Nationality:</span>
                    <div className="font-semibold text-f1-white">{driver.nationality}</div>
                  </div>
                  <div>
                    <span className="text-f1-gray">Championships:</span>
                    <div className="font-semibold text-f1-white">{driver.championships}</div>
                  </div>
                  <div>
                    <span className="text-f1-gray">Race Wins:</span>
                    <div className="font-semibold text-f1-white">{driver.wins}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-f1-red">
                <Timer size={16} />
                <span className="font-semibold">Top Speed: {driver.topSpeed}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h5 className="text-f1-red font-semibold mb-2">Training & Background</h5>
            <p className="text-f1-silver leading-relaxed">
              {driver.bio}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DriverCard;