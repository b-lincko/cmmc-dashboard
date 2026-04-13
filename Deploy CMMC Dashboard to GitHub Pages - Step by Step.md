# Deploy CMMC Dashboard to GitHub Pages - Step by Step

**Created by Muhammad Bilal**

## ✅ What You Have

- `index.html` - Complete CMMC Dashboard (69KB, single file)
- `README.md` - Documentation
- No dependencies, no build process needed!

## 🚀 Deploy in 5 Minutes

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Sign in (create account if needed - it's free)
3. Click **+** icon (top right) → **New repository**
4. Fill in:
   - **Repository name**: `cmmc-dashboard`
   - **Description**: CMMC Level 2 Compliance Dashboard
   - **Public** (required for GitHub Pages)
5. Click **Create repository**

### Step 2: Upload Files

**Option A: Using Git (Recommended)**

Open terminal/command prompt and run:

```bash
# Navigate to the folder with index.html
cd /home/ubuntu/cmmc-pure

# Initialize git
git init

# Add all files
git add .

# Create commit
git commit -m "Initial commit: CMMC Dashboard"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/cmmc-dashboard.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**Option B: Using GitHub Web Interface**

1. Go to your repository: `https://github.com/YOUR_USERNAME/cmmc-dashboard`
2. Click **Add file** → **Upload files**
3. Drag and drop `index.html` and `README.md`
4. Click **Commit changes**

### Step 3: Enable GitHub Pages

1. Go to your repository: `https://github.com/YOUR_USERNAME/cmmc-dashboard`
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch**
   - **Branch**: Select **main**
   - **Folder**: Select **/ (root)**
5. Click **Save**

### Step 4: Access Your Dashboard

Your site is now live at:
```
https://YOUR_USERNAME.github.io/cmmc-dashboard/
```

**Login with:**
- Username: `admin`
- Password: `admin`

## 📋 Detailed Commands

### If You Have Git Installed

```bash
# 1. Navigate to folder
cd /home/ubuntu/cmmc-pure

# 2. Initialize git repository
git init

# 3. Configure git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 4. Add all files
git add .

# 5. Create initial commit
git commit -m "Initial commit: CMMC Compliance Dashboard"

# 6. Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/cmmc-dashboard.git

# 7. Rename branch to main
git branch -M main

# 8. Push to GitHub
git push -u origin main
```

### If You Don't Have Git

1. Download GitHub Desktop: https://desktop.github.com/
2. Create new repository
3. Add `index.html` and `README.md` files
4. Commit and push

## 🔍 Verify Deployment

1. Wait 2-3 minutes after pushing
2. Go to: `https://YOUR_USERNAME.github.io/cmmc-dashboard/`
3. You should see the login page
4. Login with `admin`/`admin`
5. Click through all pages to verify everything works

## ✨ Features Included

✅ All 110 CMMC controls
✅ Progress tracking with progress bar
✅ Session persistence (localStorage)
✅ Multiple views (Overview, Controls, Difficulty, Category, Commands)
✅ Filtering by difficulty and category
✅ Copy-to-clipboard for all commands
✅ Responsive design (desktop, tablet, mobile)
✅ Windows PowerShell commands
✅ Linux commands
✅ macOS commands
✅ "Created by Muhammad Bilal" attribution

## 🔐 Change Login Credentials

If you want to change the default credentials:

1. Open `index.html` in a text editor
2. Find this line (around line 800):
   ```javascript
   credentials: {
       username: 'admin',
       password: 'admin'
   }
   ```
3. Change to your desired credentials:
   ```javascript
   credentials: {
       username: 'your-username',
       password: 'your-password'
   }
   ```
4. Save the file
5. Push to GitHub:
   ```bash
   git add index.html
   git commit -m "Update credentials"
   git push origin main
   ```

## 🐛 Troubleshooting

### "Repository not found"
- Check you replaced `YOUR_USERNAME` with your actual GitHub username
- Verify repository exists on GitHub
- Try using HTTPS instead of SSH

### Build fails on GitHub
- Go to **Actions** tab
- Check the workflow logs
- Make sure `index.html` is in the root folder

### Site shows 404
- Wait 5 minutes for DNS propagation
- Clear browser cache (Ctrl+Shift+Delete)
- Verify GitHub Pages is enabled in Settings
- Check that repository is Public

### Can't login
- Default credentials are: `admin` / `admin`
- Check if you changed the credentials
- Try incognito/private window
- Clear browser cache

### Progress not saving
- Check if localStorage is enabled
- Try a different browser
- Check browser console for errors (F12)

## 📱 Mobile Access

Your dashboard works on mobile devices!

1. Get the URL: `https://YOUR_USERNAME.github.io/cmmc-dashboard/`
2. Open on phone/tablet
3. Bookmark it for quick access
4. All features work on mobile

## 🔄 Update Your Dashboard

To make changes:

```bash
# 1. Edit index.html locally
# 2. Save changes
# 3. Push to GitHub
git add index.html
git commit -m "Update description"
git push origin main

# 4. GitHub automatically deploys
# 5. Wait 1-2 minutes
# 6. Refresh your browser
```

## 🎯 Next Steps

1. ✅ Deploy to GitHub Pages
2. ✅ Login with admin/admin
3. ✅ Test all features
4. ✅ Share URL with your team
5. ✅ Start tracking CMMC compliance
6. ✅ Update controls as you implement them

## 📞 Support

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **CMMC Program**: https://www.acq.osd.mil/cmmc/
- **NIST 800-171**: https://csrc.nist.gov/publications/detail/sp/800-171/rev-2/final

## ✅ Deployment Checklist

- [ ] GitHub account created
- [ ] Repository created (cmmc-dashboard)
- [ ] Files pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Site accessible at GitHub Pages URL
- [ ] Login works (admin/admin)
- [ ] All pages load correctly
- [ ] Filters work
- [ ] Copy buttons work
- [ ] Progress saves when checking controls

---

**You're all set!** 🎉

Your CMMC Dashboard is now live on GitHub Pages.

Created by **Muhammad Bilal**
CMMC Level 2 Compliance Dashboard v3.0
