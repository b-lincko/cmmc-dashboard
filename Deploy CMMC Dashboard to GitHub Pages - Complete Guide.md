# Deploy CMMC Dashboard to GitHub Pages - Complete Guide

**Created by Muhammad Bilal**

## 🚀 Quick Setup (5 minutes)

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click **+** icon (top right) → **New repository**
3. Fill in:
   - **Repository name**: `cmmc-dashboard`
   - **Description**: CMMC Level 2 Compliance Dashboard
   - **Public** (required for GitHub Pages)
4. Click **Create repository**

### Step 2: Push Code to GitHub

Copy and paste these commands one by one:

```bash
# Navigate to project directory
cd /home/ubuntu/cmmc-dashboard

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: CMMC Compliance Dashboard"

# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/cmmc-dashboard.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Step 3: Enable GitHub Pages

1. Go to your repository: `https://github.com/YOUR_USERNAME/cmmc-dashboard`
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**
5. Wait 2-3 minutes for automatic build

### Step 4: Access Your Site

Your dashboard will be live at:
```
https://YOUR_USERNAME.github.io/cmmc-dashboard/
```

**Login credentials:**
- Username: `admin`
- Password: `admin`

---

## 📋 Detailed Step-by-Step Instructions

### Prerequisites Check

Before starting, verify you have:

```bash
# Check Git is installed
git --version

# Check Node.js is installed
node --version

# Check npm is installed
npm --version
```

If any are missing, install them from:
- Git: https://git-scm.com/download
- Node.js: https://nodejs.org/

### Complete Setup Process

#### 1. Clone or Download Project

**Option A: If you have Git**
```bash
git clone https://github.com/YOUR_USERNAME/cmmc-dashboard.git
cd cmmc-dashboard
```

**Option B: If you downloaded the project**
```bash
cd /path/to/cmmc-dashboard
```

#### 2. Install Dependencies

```bash
npm install
```

This installs all required packages (takes 2-3 minutes).

#### 3. Test Locally (Optional)

```bash
npm run dev
```

Then open: `http://localhost:5173`

Press `Ctrl+C` to stop the server.

#### 4. Build for Production

```bash
npm run build
```

This creates a `dist/` folder with the production build.

#### 5. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: CMMC Compliance Dashboard"
```

#### 6. Add GitHub Remote

```bash
git remote add origin https://github.com/YOUR_USERNAME/cmmc-dashboard.git
git branch -M main
git push -u origin main
```

**Important**: Replace `YOUR_USERNAME` with your GitHub username!

#### 7. Enable GitHub Pages

1. Go to: `https://github.com/YOUR_USERNAME/cmmc-dashboard/settings`
2. Click **Pages** in left sidebar
3. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**
4. Wait 2-3 minutes

#### 8. Access Your Site

Visit: `https://YOUR_USERNAME.github.io/cmmc-dashboard/`

---

## 🔧 Troubleshooting

### "Repository not found" Error

**Problem**: `fatal: repository 'https://github.com/YOUR_USERNAME/cmmc-dashboard.git' not found`

**Solution**:
1. Check you replaced `YOUR_USERNAME` with your actual username
2. Verify repository exists on GitHub
3. Check you're logged in to GitHub

```bash
# Check git configuration
git config --global user.name
git config --global user.email

# If not set, configure:
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Build Fails

**Problem**: GitHub Actions build fails

**Solution**:
1. Go to **Actions** tab on GitHub
2. Click the failed workflow
3. Expand the logs to see the error
4. Common fixes:
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

### Site Shows 404

**Problem**: GitHub Pages shows 404 error

**Solution**:
1. Verify repository is **Public**
2. Check GitHub Pages is enabled in Settings
3. Wait 5 minutes for DNS propagation
4. Clear browser cache (Ctrl+Shift+Delete)
5. Try incognito/private window

### Site Not Updating

**Problem**: Changes don't appear on GitHub Pages

**Solution**:
```bash
# Make your changes
# Then:
git add .
git commit -m "Update description"
git push origin main

# Check Actions tab to verify build succeeded
# Wait 2-3 minutes for deployment
```

---

## 📤 Making Updates

### Update Controls or Commands

1. Edit files locally:
   ```bash
   # Edit control data
   nano client/src/lib/cmmc-data.ts
   
   # Or edit implementation guide
   nano client/src/lib/cmmc-data-enhanced.ts
   ```

2. Test locally:
   ```bash
   npm run dev
   ```

3. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update CMMC controls"
   git push origin main
   ```

4. GitHub Actions automatically builds and deploys

### Update Styling

1. Edit CSS:
   ```bash
   nano client/src/index.css
   ```

2. Or edit component files:
   ```bash
   nano client/src/pages/Dashboard.tsx
   ```

3. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update styling"
   git push origin main
   ```

---

## 🔐 Custom Domain (Optional)

### Add Your Own Domain

1. Buy a domain from:
   - GoDaddy
   - Namecheap
   - Google Domains
   - Or any registrar

2. Go to GitHub repository Settings → Pages

3. Under **Custom domain**, enter your domain:
   ```
   cmmc.yourdomain.com
   ```

4. Click **Save**

5. Update your domain's DNS records:
   - **Type**: CNAME
   - **Name**: @
   - **Value**: `YOUR_USERNAME.github.io`

6. Wait 24 hours for DNS propagation

7. Access at: `https://cmmc.yourdomain.com`

---

## 📊 Monitoring Deployment

### Check Build Status

1. Go to your repository
2. Click **Actions** tab
3. See recent workflow runs
4. Click a run to see details

### View Deployment Logs

1. Click on the workflow run
2. Click **build-and-deploy** job
3. Expand steps to see logs
4. Look for errors or warnings

### Check Site Status

1. Visit your site: `https://YOUR_USERNAME.github.io/cmmc-dashboard/`
2. Open browser DevTools (F12)
3. Check Console tab for errors
4. Check Network tab for failed requests

---

## 🔄 Continuous Integration

### Automatic Deployment

Every time you push to `main` branch:

```bash
git push origin main
```

GitHub Actions automatically:
1. Builds the project
2. Runs tests
3. Deploys to GitHub Pages
4. Updates your live site

### Manual Trigger

To manually trigger a build:

1. Go to **Actions** tab
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button

---

## 📚 File Structure

After deployment, your site uses:

```
dist/
├── index.html          # Main page
├── assets/
│   ├── index-*.js      # JavaScript bundles
│   └── index-*.css     # CSS bundles
└── ...
```

GitHub Pages serves these files automatically.

---

## 🚨 Important Notes

### Public Repository

- Your repository is **public** (required for GitHub Pages)
- Anyone can see your code
- This is normal and secure
- Don't commit sensitive data (passwords, API keys)

### Browser Storage

- All data stored in browser localStorage
- Not synced to cloud
- Clears if user clears browser data
- Each browser/device has separate data

### Credentials

- Default credentials are `admin`/`admin`
- Change these in production
- Edit `client/src/pages/Login.tsx` to customize

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] GitHub Pages enabled in Settings
- [ ] Build succeeded (check Actions tab)
- [ ] Site accessible at GitHub Pages URL
- [ ] Login works with admin/admin
- [ ] Dashboard loads all controls
- [ ] Commands copy to clipboard
- [ ] Progress saves when checking controls
- [ ] All navigation links work

---

## 🆘 Getting Help

### If Something Goes Wrong

1. **Check GitHub Actions logs**:
   - Go to Actions tab
   - Click failed workflow
   - Expand logs to find error

2. **Check browser console**:
   - Open DevTools (F12)
   - Look for red errors
   - Note the error message

3. **Verify prerequisites**:
   - Repository is public
   - GitHub Pages is enabled
   - Branch is set to main
   - Source is set to GitHub Actions

4. **Try rebuilding**:
   ```bash
   rm -rf node_modules dist
   npm install
   npm run build
   git add .
   git commit -m "Rebuild"
   git push origin main
   ```

---

## 📞 Support Resources

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Vite Documentation**: https://vitejs.dev/
- **React Documentation**: https://react.dev/

---

## 🎉 You're Done!

Your CMMC Dashboard is now live on GitHub Pages!

**Next Steps**:
1. Share the URL with your team
2. Start tracking CMMC compliance
3. Update controls as you implement them
4. Export progress for audits

---

**Created by Muhammad Bilal**
CMMC Level 2 Compliance Dashboard v2.0
