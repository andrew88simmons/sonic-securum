# Sonic Securum

> **Decentralized Music Platform with Encrypted Royalties**

Sonic Securum is a next-generation music streaming platform that leverages Fully Homomorphic Encryption (FHE) to protect artist earnings and listener privacy. Built on Ethereum with cutting-edge cryptographic technology.

## 🎯 Mission

Empower artists to monetize their music while maintaining complete privacy over their earnings data. Our platform ensures that royalty information remains encrypted on-chain until artists choose to reveal it.

## ✨ Core Features

### Privacy-First Architecture
- **FHE-Encrypted Royalties**: All earnings data encrypted using Zama's FHEVM
- **Private Stream Analytics**: Stream counts and durations remain confidential
- **Secure Claim System**: Royalty claims processed without revealing amounts
- **Reputation Protection**: Artist and listener reputations encrypted

### Modern Web3 Integration
- **Multi-Wallet Support**: Rainbow, MetaMask, WalletConnect, and more
- **Sepolia Testnet**: Deployed on Ethereum's testnet for development
- **Gas Optimization**: Efficient smart contract design
- **Real-time Updates**: Live blockchain data synchronization

### Artist-Centric Design
- **Easy Registration**: Simple artist onboarding process
- **Track Management**: Upload and manage music tracks
- **Earnings Dashboard**: Monitor encrypted royalty accumulation
- **Stream Analytics**: View private listening statistics

## 🛠 Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Frontend** | React | 18.3.1 |
| **Language** | TypeScript | 5.8.3 |
| **Build Tool** | Vite | 5.4.19 |
| **Styling** | Tailwind CSS | 3.4.17 |
| **UI Components** | shadcn/ui | Latest |
| **Blockchain** | Ethereum | Sepolia |
| **Wallet** | RainbowKit | 2.2.8 |
| **Web3** | Wagmi | 2.9.0 |
| **EVM Client** | Viem | 2.33.0 |
| **Encryption** | FHEVM | Latest |

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia ETH for gas fees

### Installation

```bash
# Clone the repository
git clone https://github.com/andrew88simmons/sonic-securum.git
cd sonic-securum

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Configuration

Create `.env.local` with the following variables:

```env
# Blockchain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID

# Wallet Integration
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# API Keys
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
```

## 📁 Project Structure

```
sonic-securum/
├── contracts/                 # Smart contracts
│   └── SonicSecurum.sol      # Main FHE contract
├── src/
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components
│   │   ├── Dashboard.tsx    # Main dashboard
│   │   ├── Header.tsx       # Navigation header
│   │   └── RoyaltiesCard.tsx # Earnings display
│   ├── hooks/               # Custom React hooks
│   │   └── useSonicSecurum.ts # Contract interactions
│   ├── lib/                 # Utilities and configs
│   │   ├── utils.ts         # Helper functions
│   │   └── wagmi.ts         # Wallet configuration
│   └── pages/               # Application pages
├── public/                  # Static assets
│   ├── favicon.svg         # Music-themed favicon
│   └── favicon.ico         # Fallback favicon
└── docs/                   # Documentation
    └── VERCEL_DEPLOYMENT.md # Deployment guide
```

## 🔐 Security Features

### Fully Homomorphic Encryption
- **Private Computations**: Perform calculations on encrypted data
- **Zero-Knowledge Proofs**: Verify data without revealing it
- **Secure Aggregation**: Combine encrypted values safely
- **Privacy Preservation**: Maintain confidentiality throughout

### Smart Contract Security
- **Access Controls**: Role-based permissions
- **Input Validation**: Comprehensive parameter checking
- **Gas Optimization**: Efficient contract execution
- **Upgrade Safety**: Immutable core functionality

## 🎵 How It Works

### 1. Artist Onboarding
Artists register on the platform with encrypted profile information, establishing their presence in the decentralized music ecosystem.

### 2. Track Upload
Music tracks are uploaded with encrypted metadata, ensuring that sensitive information remains private while maintaining discoverability.

### 3. Stream Recording
Each stream is recorded with encrypted duration and earnings data, allowing for accurate royalty calculation without revealing individual listening habits.

### 4. Royalty Calculation
FHE enables royalty computation on encrypted data, ensuring that earnings are calculated accurately while maintaining privacy.

### 5. Secure Claims
Artists can claim their encrypted earnings when ready, with the platform processing claims without revealing amounts to third parties.

## 🚀 Deployment

### Vercel Deployment
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/andrew88simmons/sonic-securum)

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).

### Manual Deployment
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to your preferred platform
```

## 📊 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (if configured)
- **Husky**: Git hooks for quality assurance

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** and ensure tests pass
4. **Commit your changes**: `git commit -m 'Add your feature'`
5. **Push to your branch**: `git push origin feature/your-feature-name`
6. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all checks pass

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Check the project wiki
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join community discussions
- **Email**: garcia6@zenora.cloud

### Community
- **GitHub**: [andrew88simmons/sonic-securum](https://github.com/andrew88simmons/sonic-securum)
- **Issues**: [Report Issues](https://github.com/andrew88simmons/sonic-securum/issues)
- **Discussions**: [Community Discussions](https://github.com/andrew88simmons/sonic-securum/discussions)

## 🙏 Acknowledgments

- **Zama**: For FHEVM and cryptographic innovation
- **RainbowKit**: For seamless wallet integration
- **Vercel**: For hosting and deployment infrastructure
- **shadcn/ui**: For beautiful and accessible UI components
- **Ethereum Foundation**: For the decentralized platform

---

**Built with ❤️ for the future of decentralized music**

*Sonic Securum - Where music meets privacy*