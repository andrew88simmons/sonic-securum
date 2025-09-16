import { RoyaltiesCard } from "./RoyaltiesCard";
import { WaveformAnimation } from "./WaveformAnimation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Music, Users, Shield, Upload, Mic } from "lucide-react";
import { useAccount } from 'wagmi';
import { useSonicSecurum, useTracks } from '@/hooks/useSonicSecurum';
import { useState } from 'react';

export const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { registerArtist, uploadTrack, recordStream, isPending } = useSonicSecurum();
  const { data: tracks } = useTracks([1, 2, 3, 4, 5]);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const handleRegisterArtist = async () => {
    if (!isConnected) return;
    try {
      await registerArtist("Artist Name", "Artist Bio");
    } catch (error) {
      console.error('Failed to register artist:', error);
    }
  };

  const handleUploadTrack = async () => {
    if (!isConnected) return;
    try {
      await uploadTrack("Track Name", "Artist Name", "ipfs-hash", 10);
    } catch (error) {
      console.error('Failed to upload track:', error);
    }
  };

  return (
    <section className="container mx-auto px-6 py-12 space-y-8">
      {/* Artist Actions */}
      {isConnected && (
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-foreground">Artist Dashboard</h3>
            <Badge className="encrypted-badge">
              <Shield className="w-3 h-3 mr-1" />
              Connected
            </Badge>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={handleRegisterArtist}
              disabled={isPending}
              className="bg-music-purple hover:bg-music-purple/80"
            >
              <Mic className="w-4 h-4 mr-2" />
              Register as Artist
            </Button>
            <Button 
              onClick={() => setShowUploadForm(!showUploadForm)}
              disabled={isPending}
              className="bg-music-pink hover:bg-music-pink/80"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Track
            </Button>
          </div>
        </Card>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="p-2 rounded-full bg-music-purple/20">
              <TrendingUp className="w-6 h-6 text-music-purple" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">24.8K</div>
          <div className="text-sm text-muted-foreground">Total Streams</div>
        </Card>
        
        <Card className="glass-card p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="p-2 rounded-full bg-music-pink/20">
              <Music className="w-6 h-6 text-music-pink" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">12</div>
          <div className="text-sm text-muted-foreground">Active Tracks</div>
        </Card>
        
        <Card className="glass-card p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="p-2 rounded-full bg-music-green/20">
              <Users className="w-6 h-6 text-music-green" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">1.2K</div>
          <div className="text-sm text-muted-foreground">Monthly Listeners</div>
        </Card>
        
        <Card className="glass-card p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="p-2 rounded-full bg-music-cyan/20">
              <Shield className="w-6 h-6 text-music-cyan" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">100%</div>
          <div className="text-sm text-muted-foreground">Privacy Rate</div>
        </Card>
      </div>
      
      {/* Royalties Overview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground">Encrypted Royalties</h2>
          <Badge className="encrypted-badge">
            <Shield className="w-3 h-3 mr-1" />
            All data encrypted
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RoyaltiesCard
            title="This Month"
            encryptedAmount="████.██ ETH"
            actualAmount="0.847 ETH"
            streamCount={8420}
            period="30 days"
            isUnlocked={true}
          />
          
          <RoyaltiesCard
            title="This Week"
            encryptedAmount="██.███ ETH"
            actualAmount="0.203 ETH"
            streamCount={2180}
            period="7 days"
            isUnlocked={false}
          />
          
          <RoyaltiesCard
            title="Today"
            encryptedAmount="█.███ ETH"
            streamCount={324}
            period="24 hours"
            isUnlocked={false}
          />
          
          <RoyaltiesCard
            title="All Time"
            encryptedAmount="██.███ ETH"
            actualAmount="12.45 ETH"
            streamCount={45670}
            period="lifetime"
            isUnlocked={true}
          />
        </div>
      </div>
      
      {/* Live Activity */}
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Live Stream Activity</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-music-green rounded-full animate-pulse" />
            <span className="text-sm text-music-green">Live</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-8">
          <WaveformAnimation bars={60} className="scale-110" />
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          Real-time visualization of encrypted streaming data
        </div>
      </Card>
    </section>
  );
};