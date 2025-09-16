import { WaveformAnimation } from "./WaveformAnimation";
import { Music } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Header = () => {
  return (
    <header className="relative overflow-hidden">
      <div className="container mx-auto px-6 py-12 text-center">
        {/* Background waveform animation */}
        <div className="absolute inset-0 opacity-20 flex items-center justify-center">
          <WaveformAnimation bars={100} className="scale-150" />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-gradient-primary animate-pulse-glow">
                <Music className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-music-cyan">Sonic Securum</span>
            </div>
            <ConnectButton />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold hero-text leading-tight">
            Music Paid
            <br />
            Privately
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stream your music and collect royalties through encrypted channels. 
            Your earnings remain private until you're ready to claim them.
          </p>
          
          <div className="flex items-center justify-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-music-green">$2.4M+</div>
              <div className="text-sm text-muted-foreground">Protected Royalties</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-music-pink">50K+</div>
              <div className="text-sm text-muted-foreground">Artists Protected</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-music-cyan">100%</div>
              <div className="text-sm text-muted-foreground">Encrypted</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <WaveformAnimation bars={80} className="h-16 opacity-60" />
      </div>
    </header>
  );
};