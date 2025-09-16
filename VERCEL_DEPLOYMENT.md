# Vercel Deployment Guide for Sonic Securum

This guide provides step-by-step instructions for deploying Sonic Securum to Vercel.

## Prerequisites

- GitHub account with access to the `andrew88simmons/sonic-securum` repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step 1: Prepare the Project

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/andrew88simmons/sonic-securum.git
   cd sonic-securum
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Test locally**:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173` to verify the application works.

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**:
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose `andrew88simmons/sonic-securum`
   - Click "Import"

3. **Configure Project Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Set Environment Variables**:
   Click "Environment Variables" and add:
   ```
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
   VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
   VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
   VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set Environment Variables**:
   ```bash
   vercel env add VITE_CHAIN_ID
   vercel env add VITE_RPC_URL
   vercel env add VITE_WALLET_CONNECT_PROJECT_ID
   vercel env add VITE_INFURA_API_KEY
   ```

5. **Redeploy with Environment Variables**:
   ```bash
   vercel --prod
   ```

## Step 3: Configure Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variables** (if needed):
   - Add `VITE_APP_URL` with your custom domain

## Step 4: Verify Deployment

1. **Check Build Logs**:
   - Ensure no build errors in Vercel dashboard
   - Verify all environment variables are set

2. **Test Application**:
   - Visit your deployed URL
   - Test wallet connection
   - Verify all features work correctly

3. **Monitor Performance**:
   - Check Vercel Analytics
   - Monitor build times and performance

## Step 5: Continuous Deployment

The project is configured for automatic deployments:
- **Push to `main` branch**: Triggers production deployment
- **Push to other branches**: Creates preview deployments
- **Pull Requests**: Creates preview deployments for testing

## Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_CHAIN_ID` | `11155111` | Sepolia testnet chain ID |
| `VITE_RPC_URL` | `https://sepolia.infura.io/v3/YOUR_PROJECT_ID` | RPC endpoint for Sepolia |
| `VITE_WALLET_CONNECT_PROJECT_ID` | `YOUR_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID |
| `VITE_INFURA_API_KEY` | `YOUR_INFURA_API_KEY` | Infura API key |
| `VITE_CONTRACT_ADDRESS` | `YOUR_DEPLOYED_CONTRACT_ADDRESS` | Deployed smart contract address |

## Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check Node.js version (should be 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables Not Working**:
   - Ensure variables start with `VITE_`
   - Redeploy after adding new variables
   - Check variable names match exactly

3. **Wallet Connection Issues**:
   - Verify WalletConnect project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches Sepolia (11155111)

4. **Contract Interaction Fails**:
   - Verify contract is deployed to Sepolia
   - Check contract address in hooks
   - Ensure user has Sepolia ETH for gas

### Support:

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Project Issues**: Create issue in GitHub repository
- **Contact**: garcia6@zenora.cloud

## Production Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Contract deployed to mainnet (when ready)
- [ ] Custom domain configured (if applicable)
- [ ] Analytics and monitoring set up
- [ ] Error tracking configured
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] SSL certificate verified

## Deployment URLs

After successful deployment, you'll receive:
- **Production URL**: `https://sonic-securum.vercel.app`
- **Preview URLs**: Generated for each branch/PR
- **Custom Domain**: If configured

Remember to update the contract address in `src/hooks/useSonicSecurum.ts` once the smart contract is deployed to the target network.
