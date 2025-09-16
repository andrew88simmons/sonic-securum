import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, EyeOff, Wallet } from "lucide-react";
import { useState } from "react";

interface RoyaltiesCardProps {
  title: string;
  encryptedAmount: string;
  actualAmount?: string;
  streamCount: number;
  period: string;
  isUnlocked?: boolean;
}

export const RoyaltiesCard = ({
  title,
  encryptedAmount,
  actualAmount,
  streamCount,
  period,
  isUnlocked = false
}: RoyaltiesCardProps) => {
  const [showActual, setShowActual] = useState(false);

  return (
    <Card className="glass-card p-6 hover:bg-gradient-card transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Badge className="encrypted-badge">
          <Shield className="w-3 h-3 mr-1" />
          Encrypted
        </Badge>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Earnings ({period})</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold">
                {showActual && actualAmount ? actualAmount : encryptedAmount}
              </span>
              {actualAmount && (
                <button
                  onClick={() => setShowActual(!showActual)}
                  className="p-1 rounded-md hover:bg-secondary/50 transition-colors"
                >
                  {showActual ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Streams</p>
            <p className="text-xl font-semibold text-music-green">
              {streamCount.toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <span className="text-sm text-muted-foreground">
            Status: {isUnlocked ? "Ready to claim" : "Accumulating"}
          </span>
          <div className="flex items-center gap-1 text-music-cyan">
            <Wallet className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isUnlocked ? "Claimable" : "Locked"}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};