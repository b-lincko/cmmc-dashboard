# CMMC Dashboard - GitHub Pages Deployment Guide

This guide provides step-by-step instructions to deploy the CMMC Compliance Dashboard to GitHub Pages.

**Created by Muhammad Bilal**

## Prerequisites

- GitHub account
- Git installed on your computer
- Node.js 22.x or higher
- npm or pnpm package manager

## Option 1: Automatic Deployment with GitHub Actions (Recommended)

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **+** icon in the top right corner
3. Select **New repository**
4. Name your repository: `cmmc-dashboard`
5. Add description: "CMMC Level 2 Compliance Dashboard"
6. Choose **Public** (required for GitHub Pages)
7. Click **Create repository**

### Step 2: Push Code to GitHub

```bash
# Navigate to the project directory
cd /path/to/cmmc-dashboard

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: CMMC Compliance Dashboard"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/cmmc-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** section (left sidebar)
4. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
   - The workflow will automatically deploy from the `dist/` folder

### Step 4: Verify Deployment

1. Wait 2-3 minutes for the build to complete
2. Go to **Actions** tab to see build status
3. Once complete, your site will be available at:
   - `https://YOUR_USERNAME.github.io/cmmc-dashboard/`

### Step 5: Configure Custom Domain (Optional)

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `cmmc.example.com`)
3. Click **Save**
4. Update your domain's DNS records:
   - Add CNAME record pointing to `YOUR_USERNAME.github.io`
5. Wait 24 hours for DNS propagation

## Option 2: Manual Deployment

### Step 1: Build the Project

```bash
# Navigate to project directory
cd /path/to/cmmc-dashboard

# Install dependencies
npm install

# Build for production
npm run build
```

### Step 2: Create GitHub Repository

Follow Steps 1-2 from Option 1 above.

### Step 3: Create and Push gh-pages Branch

```bash
# Create orphan gh-pages branch
git checkout --orphan gh-pages

# Remove all files
git rm -rf .

# Copy built files from dist directory
cp -r dist/* .

# Add all files
git add .

# Commit
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git push origin gh-pages
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** section
4. Under **Build and deployment**:
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `gh-pages` and `/root` folder
5. Click **Save**

### Step 5: Verify Deployment

Your site will be available at `https://YOUR_USERNAME.github.io/cmmc-dashboard/`

## Option 3: Deploy to Netlify (Alternative)

### Step 1: Connect to Netlify

1. Go to [Netlify.com](https://netlify.com)
2. Click **Sign up** and connect your GitHub account
3. Click **New site from Git**
4. Select your GitHub repository

### Step 2: Configure Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- Click **Deploy site**

### Step 3: Access Your Site

Your site will be available at a Netlify-generated URL (e.g., `cmmc-dashboard-123.netlify.app`)

## Option 4: Deploy to Vercel (Alternative)

### Step 1: Connect to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Click **Sign up** and connect your GitHub account
3. Click **Import Project**
4. Select your GitHub repository

### Step 2: Configure Project

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- Click **Deploy**

### Step 3: Access Your Site

Your site will be available at a Vercel-generated URL

## Continuous Deployment

### Automatic Updates

Once deployed, any push to the `main` branch will automatically trigger a new build and deployment:

```bash
# Make changes to your code
# ...

# Commit and push
git add .
git commit -m "Update CMMC controls"
git push origin main

# GitHub Actions will automatically build and deploy
# Check the Actions tab to monitor progress
```

## Troubleshooting

### Build Fails

**Problem**: Build fails with "command not found" errors

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Site Not Loading

**Problem**: GitHub Pages site shows 404 error

**Solution**:
1. Verify the repository is public
2. Check that GitHub Pages is enabled in Settings
3. Wait 5 minutes for DNS propagation
4. Clear browser cache and try again

### Commands Not Working

**Problem**: Copy-to-clipboard feature not working

**Solution**:
- Ensure you're using HTTPS (not HTTP)
- Check browser console for errors
- Try a different browser

### Deployment Stuck

**Problem**: GitHub Actions workflow is stuck or taking too long

**Solution**:
1. Go to **Actions** tab
2. Click the stuck workflow
3. Click **Cancel workflow**
4. Push a new commit to trigger a fresh build

## Local Testing

Before deploying, test the build locally:

```bash
# Build the project
npm run build

# Preview the build
npm run preview

# Open browser to http://localhost:4173
```

## Updating the Dashboard

### Add New CMMC Controls

1. Edit `/client/src/lib/cmmc-data.ts`
2. Add new controls to the `CMMC_CONTROLS` array
3. Commit and push:
   ```bash
   git add .
   git commit -m "Add new CMMC controls"
   git push origin main
   ```

### Update Commands

1. Edit `/client/src/lib/cmmc-data-enhanced.ts`
2. Update PowerShell, Linux, or macOS commands
3. Commit and push as above

### Modify Styling

1. Edit `/client/src/index.css` for global styles
2. Edit component files in `/client/src/pages/` and `/client/src/components/`
3. Commit and push as above

## Security Considerations

### Protect Sensitive Information

- **Never commit secrets** (API keys, passwords, etc.)
- Use environment variables for sensitive data
- Keep the repository public (required for GitHub Pages)
- Review code before pushing to main branch

### GitHub Secrets

To use secrets in GitHub Actions:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add your secret (e.g., `API_KEY`)
4. Use in workflow: `${{ secrets.API_KEY }}`

## Performance Optimization

### Reduce Build Size

```bash
# Check bundle size
npm run build

# Analyze dependencies
npm list
```

### Enable Caching

The GitHub Actions workflow already includes npm caching for faster builds.

## Monitoring

### Check Deployment Status

1. Go to **Actions** tab
2. View recent workflow runs
3. Click on a run to see details

### View Build Logs

1. Click on a workflow run
2. Click **build-and-deploy** job
3. Expand steps to see logs

## Support & Resources

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Vite Documentation**: https://vitejs.dev/
- **React Documentation**: https://react.dev/
- **CMMC Information**: https://www.acq.osd.mil/cmmc/

## Next Steps

1. ✅ Deploy the dashboard
2. ✅ Test all features in production
3. ✅ Share the URL with your team
4. ✅ Start tracking CMMC compliance
5. ✅ Update controls as you implement them

## Support

For issues or questions:
- Check the troubleshooting section above
- Review GitHub Actions logs
- Contact GitHub Support: https://support.github.com

---

**Created by Muhammad Bilal**
CMMC Level 2 Compliance Dashboard v2.0
