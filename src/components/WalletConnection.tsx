import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Check, Shield, Zap } from "lucide-react";
import { toast } from "sonner";

export const WalletConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      toast.success("Wallet connected successfully! Ready to collect royalties.", {
        icon: "🎵",
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast.info("Wallet disconnected");
  };

  if (isConnected) {
    return (
      <Card className="glass-card p-6 border-music-green/30 bg-gradient-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-music-green/20">
              <Check className="w-5 h-5 text-music-green" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Wallet Connected</h3>
              <p className="text-sm text-muted-foreground">0x742d...4f3a</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDisconnect}
              className="border-border/50 hover:bg-secondary/50"
            >
              Disconnect
            </Button>
            <div className="animate-pulse-glow">
              <Shield className="w-5 h-5 text-music-cyan" />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-card p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-float">
          <div className="p-4 rounded-full bg-gradient-primary">
            <Wallet className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground">Connect Your Wallet</h3>
          <p className="text-muted-foreground max-w-md">
            Connect your wallet to start collecting encrypted music royalties privately and securely.
          </p>
        </div>
        
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="wallet-button min-w-[200px]"
        >
          {isConnecting ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </>
          )}
        </Button>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4 text-music-cyan" />
          <span>End-to-end encrypted • Private by default</span>
        </div>
      </div>
    </Card>
  );
};