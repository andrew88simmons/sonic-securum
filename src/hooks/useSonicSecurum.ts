import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { parseEther, formatEther } from 'viem';

// Contract ABI - This would be generated from the compiled contract
const SONIC_SECURUM_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_bio", "type": "string"}
    ],
    "name": "registerArtist",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_artist", "type": "string"},
      {"internalType": "string", "name": "_ipfsHash", "type": "string"},
      {"internalType": "uint256", "name": "_royaltyRate", "type": "uint256"}
    ],
    "name": "uploadTrack",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "trackId", "type": "uint256"},
      {"internalType": "uint256", "name": "duration", "type": "uint256"}
    ],
    "name": "recordStream",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "trackId", "type": "uint256"}
    ],
    "name": "getTrackInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "artist", "type": "string"},
      {"internalType": "string", "name": "ipfsHash", "type": "string"},
      {"internalType": "uint8", "name": "totalStreams", "type": "uint8"},
      {"internalType": "uint8", "name": "totalEarnings", "type": "uint8"},
      {"internalType": "uint8", "name": "royaltyRate", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "artist", "type": "address"}
    ],
    "name": "getArtistInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "bio", "type": "string"},
      {"internalType": "uint8", "name": "totalEarnings", "type": "uint8"},
      {"internalType": "uint8", "name": "totalStreams", "type": "uint8"},
      {"internalType": "uint8", "name": "reputation", "type": "uint8"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "uint256", "name": "joinedAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract address - This would be the deployed contract address
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

export const useSonicSecurum = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Register artist
  const registerArtist = async (name: string, bio: string) => {
    if (!isConnected) throw new Error('Wallet not connected');
    
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: SONIC_SECURUM_ABI,
      functionName: 'registerArtist',
      args: [name, bio],
    });
  };

  // Upload track
  const uploadTrack = async (name: string, artist: string, ipfsHash: string, royaltyRate: number) => {
    if (!isConnected) throw new Error('Wallet not connected');
    
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: SONIC_SECURUM_ABI,
      functionName: 'uploadTrack',
      args: [name, artist, ipfsHash, royaltyRate],
    });
  };

  // Record stream
  const recordStream = async (trackId: number, duration: number, value: string) => {
    if (!isConnected) throw new Error('Wallet not connected');
    
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: SONIC_SECURUM_ABI,
      functionName: 'recordStream',
      args: [BigInt(trackId), BigInt(duration)],
      value: parseEther(value),
    });
  };

  return {
    registerArtist,
    uploadTrack,
    recordStream,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};

// Hook to get track information
export const useTrackInfo = (trackId: number) => {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: SONIC_SECURUM_ABI,
    functionName: 'getTrackInfo',
    args: [BigInt(trackId)],
  });
};

// Hook to get artist information
export const useArtistInfo = (artistAddress: string) => {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: SONIC_SECURUM_ABI,
    functionName: 'getArtistInfo',
    args: [artistAddress as `0x${string}`],
  });
};

// Hook to get multiple tracks
export const useTracks = (trackIds: number[]) => {
  return useQuery({
    queryKey: ['tracks', trackIds],
    queryFn: async () => {
      // This would fetch multiple tracks in parallel
      // For now, return mock data
      return trackIds.map(id => ({
        id,
        name: `Track ${id}`,
        artist: `Artist ${id}`,
        totalStreams: Math.floor(Math.random() * 1000),
        totalEarnings: Math.floor(Math.random() * 100),
        isVerified: Math.random() > 0.5,
      }));
    },
  });
};
