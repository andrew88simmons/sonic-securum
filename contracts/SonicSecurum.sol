// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SonicSecurum is SepoliaConfig {
    using FHE for *;
    
    struct MusicTrack {
        euint32 trackId;
        euint32 totalStreams;
        euint32 totalEarnings;
        euint32 royaltyRate;
        bool isActive;
        bool isVerified;
        string name;
        string artist;
        string ipfsHash;
        address owner;
        uint256 createdAt;
    }
    
    struct StreamRecord {
        euint32 streamId;
        euint32 trackId;
        euint32 duration;
        euint32 earnings;
        address listener;
        uint256 timestamp;
    }
    
    struct RoyaltyClaim {
        euint32 claimId;
        euint32 trackId;
        euint32 amount;
        bool isProcessed;
        address claimer;
        uint256 timestamp;
    }
    
    struct ArtistProfile {
        euint32 artistId;
        euint32 totalEarnings;
        euint32 totalStreams;
        euint32 reputation;
        bool isVerified;
        string name;
        string bio;
        address wallet;
        uint256 joinedAt;
    }
    
    mapping(uint256 => MusicTrack) public tracks;
    mapping(uint256 => StreamRecord) public streams;
    mapping(uint256 => RoyaltyClaim) public claims;
    mapping(address => ArtistProfile) public artists;
    mapping(address => euint32) public listenerReputation;
    mapping(uint256 => euint32) public trackPopularity;
    
    uint256 public trackCounter;
    uint256 public streamCounter;
    uint256 public claimCounter;
    uint256 public artistCounter;
    
    address public owner;
    address public verifier;
    euint32 public platformFeeRate;
    
    event TrackUploaded(uint256 indexed trackId, address indexed artist, string name);
    event StreamRecorded(uint256 indexed streamId, uint256 indexed trackId, address indexed listener);
    event RoyaltyClaimed(uint256 indexed claimId, uint256 indexed trackId, address indexed claimer);
    event ArtistRegistered(address indexed artist, string name);
    event TrackVerified(uint256 indexed trackId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        platformFeeRate = FHE.asEuint32(5); // 5% platform fee
    }
    
    function registerArtist(
        string memory _name,
        string memory _bio
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Artist name cannot be empty");
        require(artists[msg.sender].wallet == address(0), "Artist already registered");
        
        uint256 artistId = artistCounter++;
        
        artists[msg.sender] = ArtistProfile({
            artistId: FHE.asEuint32(artistId),
            totalEarnings: FHE.asEuint32(0),
            totalStreams: FHE.asEuint32(0),
            reputation: FHE.asEuint32(100), // Starting reputation
            isVerified: false,
            name: _name,
            bio: _bio,
            wallet: msg.sender,
            joinedAt: block.timestamp
        });
        
        emit ArtistRegistered(msg.sender, _name);
        return artistId;
    }
    
    function uploadTrack(
        string memory _name,
        string memory _artist,
        string memory _ipfsHash,
        uint256 _royaltyRate
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Track name cannot be empty");
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(_royaltyRate > 0 && _royaltyRate <= 100, "Invalid royalty rate");
        require(artists[msg.sender].wallet != address(0), "Artist must be registered");
        
        uint256 trackId = trackCounter++;
        
        tracks[trackId] = MusicTrack({
            trackId: FHE.asEuint32(trackId),
            totalStreams: FHE.asEuint32(0),
            totalEarnings: FHE.asEuint32(0),
            royaltyRate: FHE.asEuint32(_royaltyRate),
            isActive: true,
            isVerified: false,
            name: _name,
            artist: _artist,
            ipfsHash: _ipfsHash,
            owner: msg.sender,
            createdAt: block.timestamp
        });
        
        emit TrackUploaded(trackId, msg.sender, _name);
        return trackId;
    }
    
    function recordStream(
        uint256 trackId,
        externalEuint32 duration,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(tracks[trackId].owner != address(0), "Track does not exist");
        require(tracks[trackId].isActive, "Track is not active");
        
        uint256 streamId = streamCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalDuration = FHE.fromExternal(duration, inputProof);
        
        // Calculate earnings based on duration and royalty rate
        euint32 baseEarnings = FHE.mul(internalDuration, FHE.asEuint32(1)); // 1 wei per second
        euint32 royaltyEarnings = FHE.mul(baseEarnings, tracks[trackId].royaltyRate);
        royaltyEarnings = FHE.div(royaltyEarnings, FHE.asEuint32(100)); // Convert percentage
        
        streams[streamId] = StreamRecord({
            streamId: FHE.asEuint32(streamId),
            trackId: FHE.asEuint32(trackId),
            duration: internalDuration,
            earnings: royaltyEarnings,
            listener: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update track statistics
        tracks[trackId].totalStreams = FHE.add(tracks[trackId].totalStreams, FHE.asEuint32(1));
        tracks[trackId].totalEarnings = FHE.add(tracks[trackId].totalEarnings, royaltyEarnings);
        
        // Update artist statistics
        artists[tracks[trackId].owner].totalStreams = FHE.add(artists[tracks[trackId].owner].totalStreams, FHE.asEuint32(1));
        artists[tracks[trackId].owner].totalEarnings = FHE.add(artists[tracks[trackId].owner].totalEarnings, royaltyEarnings);
        
        // Update track popularity
        trackPopularity[trackId] = FHE.add(trackPopularity[trackId], FHE.asEuint32(1));
        
        emit StreamRecorded(streamId, trackId, msg.sender);
        return streamId;
    }
    
    function claimRoyalties(
        uint256 trackId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(tracks[trackId].owner == msg.sender, "Only track owner can claim royalties");
        require(tracks[trackId].isActive, "Track is not active");
        
        uint256 claimId = claimCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Verify that the claimed amount doesn't exceed available earnings
        ebool canClaim = FHE.le(internalAmount, tracks[trackId].totalEarnings);
        require(FHE.decrypt(canClaim), "Insufficient earnings to claim");
        
        claims[claimId] = RoyaltyClaim({
            claimId: FHE.asEuint32(claimId),
            trackId: FHE.asEuint32(trackId),
            amount: internalAmount,
            isProcessed: false,
            claimer: msg.sender,
            timestamp: block.timestamp
        });
        
        emit RoyaltyClaimed(claimId, trackId, msg.sender);
        return claimId;
    }
    
    function processRoyaltyClaim(uint256 claimId) public {
        require(msg.sender == owner, "Only owner can process claims");
        require(claims[claimId].claimer != address(0), "Claim does not exist");
        require(!claims[claimId].isProcessed, "Claim already processed");
        
        claims[claimId].isProcessed = true;
        
        // In a real implementation, funds would be transferred here
        // payable(claims[claimId].claimer).transfer(amount);
    }
    
    function verifyTrack(uint256 trackId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify tracks");
        require(tracks[trackId].owner != address(0), "Track does not exist");
        
        tracks[trackId].isVerified = isVerified;
        emit TrackVerified(trackId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        if (artists[user].wallet != address(0)) {
            artists[user].reputation = reputation;
        } else {
            listenerReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getTrackInfo(uint256 trackId) public view returns (
        string memory name,
        string memory artist,
        string memory ipfsHash,
        uint8 totalStreams,
        uint8 totalEarnings,
        uint8 royaltyRate,
        bool isActive,
        bool isVerified,
        address owner,
        uint256 createdAt
    ) {
        MusicTrack storage track = tracks[trackId];
        return (
            track.name,
            track.artist,
            track.ipfsHash,
            0, // FHE.decrypt(track.totalStreams) - will be decrypted off-chain
            0, // FHE.decrypt(track.totalEarnings) - will be decrypted off-chain
            0, // FHE.decrypt(track.royaltyRate) - will be decrypted off-chain
            track.isActive,
            track.isVerified,
            track.owner,
            track.createdAt
        );
    }
    
    function getStreamInfo(uint256 streamId) public view returns (
        uint8 trackId,
        uint8 duration,
        uint8 earnings,
        address listener,
        uint256 timestamp
    ) {
        StreamRecord storage stream = streams[streamId];
        return (
            0, // FHE.decrypt(stream.trackId) - will be decrypted off-chain
            0, // FHE.decrypt(stream.duration) - will be decrypted off-chain
            0, // FHE.decrypt(stream.earnings) - will be decrypted off-chain
            stream.listener,
            stream.timestamp
        );
    }
    
    function getArtistInfo(address artist) public view returns (
        string memory name,
        string memory bio,
        uint8 totalEarnings,
        uint8 totalStreams,
        uint8 reputation,
        bool isVerified,
        uint256 joinedAt
    ) {
        ArtistProfile storage profile = artists[artist];
        return (
            profile.name,
            profile.bio,
            0, // FHE.decrypt(profile.totalEarnings) - will be decrypted off-chain
            0, // FHE.decrypt(profile.totalStreams) - will be decrypted off-chain
            0, // FHE.decrypt(profile.reputation) - will be decrypted off-chain
            profile.isVerified,
            profile.joinedAt
        );
    }
    
    function getClaimInfo(uint256 claimId) public view returns (
        uint8 trackId,
        uint8 amount,
        bool isProcessed,
        address claimer,
        uint256 timestamp
    ) {
        RoyaltyClaim storage claim = claims[claimId];
        return (
            0, // FHE.decrypt(claim.trackId) - will be decrypted off-chain
            0, // FHE.decrypt(claim.amount) - will be decrypted off-chain
            claim.isProcessed,
            claim.claimer,
            claim.timestamp
        );
    }
    
    function getTrackPopularity(uint256 trackId) public view returns (uint8) {
        return 0; // FHE.decrypt(trackPopularity[trackId]) - will be decrypted off-chain
    }
    
    function getListenerReputation(address listener) public view returns (uint8) {
        return 0; // FHE.decrypt(listenerReputation[listener]) - will be decrypted off-chain
    }
    
    function setPlatformFeeRate(euint32 newRate) public {
        require(msg.sender == owner, "Only owner can set fee rate");
        platformFeeRate = newRate;
    }
    
    function getPlatformFeeRate() public view returns (uint8) {
        return 0; // FHE.decrypt(platformFeeRate) - will be decrypted off-chain
    }
}
