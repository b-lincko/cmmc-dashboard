# CMMC Level 2 Compliance Dashboard - Pure HTML/CSS/JS

**Created by Muhammad Bilal**

A lightweight, single-file CMMC compliance tracking dashboard built with pure HTML, CSS, and JavaScript. No build process, no dependencies, no frameworks. Just download and deploy to GitHub Pages!

## 🚀 Quick Start

### Option 1: Deploy to GitHub Pages (Recommended)

1. **Create a GitHub Repository**
   - Go to [github.com](https://github.com)
   - Click **+** → **New repository**
   - Name it: `cmmc-dashboard`
   - Choose **Public**
   - Click **Create repository**

2. **Push Code to GitHub**
   ```bash
   cd /home/ubuntu/cmmc-pure
   git init
   git add .
   git commit -m "Initial commit: CMMC Dashboard"
   git remote add origin https://github.com/YOUR_USERNAME/cmmc-dashboard.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository Settings
   - Click **Pages** (left sidebar)
   - Under **Build and deployment**, select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**

4. **Access Your Site**
   ```
   https://YOUR_USERNAME.github.io/cmmc-dashboard/
   ```

### Option 2: Run Locally

1. **Download the file**
   - Save `index.html` to your computer

2. **Open in browser**
   - Double-click `index.html`
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Then open: http://localhost:8000
     ```

## 🔐 Login Credentials

- **Username**: `admin`
- **Password**: `admin`

Change these in the HTML file if needed (search for `credentials`).

## ✨ Features

- ✅ **All 110 CMMC Controls** with descriptions
- ✅ **Progress Tracking** with visual progress bar
- ✅ **Session Persistence** using browser localStorage
- ✅ **Responsive Design** for desktop, tablet, mobile
- ✅ **Multiple Views**:
  - Overview with statistics
  - All controls with filtering
  - Table of contents by domain
  - Difficulty-based sorting
  - Category-based sorting
  - Command reference (Windows, Linux, macOS)
- ✅ **Copy-to-Clipboard** for all commands
- ✅ **No Build Process** - just HTML/CSS/JS
- ✅ **No Dependencies** - works offline
- ✅ **GitHub Pages Ready** - deploy instantly

## 📋 File Structure

```
cmmc-pure/
├── index.html          # Complete application (single file!)
└── README.md          # This file
```

That's it! Just one HTML file with everything embedded.

## 🎯 How to Use

### 1. Login
- Enter username: `admin`
- Enter password: `admin`
- Click **Login**

### 2. Track Progress
- Check/uncheck controls as you implement them
- Progress automatically saves to your browser
- View statistics on the Overview tab

### 3. Browse Controls
- **All Controls**: View all 110 controls with filtering
- **By Difficulty**: Start with Easy, move to Hard
- **By Category**: Organize by implementation area
- **Table of Contents**: Browse by NIST domain

### 4. Copy Commands
- Go to **Commands** tab
- Choose your platform (Windows, Linux, macOS)
- Click **Copy** button on any command
- Paste into your terminal

## 💾 Data Storage

- All progress is saved in **browser localStorage**
- Data persists between sessions
- Each browser/device has separate data
- Clear browser data to reset progress

## 🌐 Deployment Options

### GitHub Pages (Free)
```bash
git push origin main
# Automatically deployed to GitHub Pages
```

### Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `index.html` file
3. Get instant deployment

### Any Web Server
- Copy `index.html` to any web server
- No build process needed
- Works on Apache, Nginx, IIS, etc.

## 🔧 Customization

### Change Login Credentials

Find this section in the HTML:
```javascript
credentials: {
    username: 'admin',
    password: 'admin'
}
```

Change to your desired credentials.

### Add More Controls

Find the `cmmcControls` array and add new controls:
```javascript
{
    id: "XX.L2-X.X.X",
    title: "Your control title",
    domain: "XX",
    difficulty: "Easy",
    category: "Active Directory",
    description: "Control description"
}
```

### Modify Styling

All CSS is in the `<style>` tag. Customize colors, fonts, spacing, etc.

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## ⚡ Performance

- **File size**: ~150KB (single HTML file)
- **Load time**: < 1 second
- **Memory usage**: < 10MB
- **No external dependencies**
- **Works offline** (after first load)

## 🔒 Security Notes

- All data stored locally in browser
- No data sent to servers
- No tracking or analytics
- No cookies (except localStorage)
- Use HTTPS in production
- Change default credentials

## 🐛 Troubleshooting

### Progress Not Saving?
- Check if localStorage is enabled in browser
- Try clearing cache and reloading
- Try a different browser

### Can't Login?
- Check username/password (case-sensitive)
- Clear browser cache
- Try incognito/private window

### Commands Not Copying?
- Ensure you're using HTTPS (not HTTP)
- Check browser console for errors (F12)
- Try a different browser

### Site Not Loading?
- Check internet connection
- Verify GitHub Pages is enabled
- Wait 5 minutes for DNS propagation
- Clear browser cache

## 📚 CMMC Resources

- **NIST 800-171**: https://csrc.nist.gov/publications/detail/sp/800-171/rev-2/final
- **CMMC Program**: https://www.acq.osd.mil/cmmc/
- **DoD Cybersecurity**: https://www.defense.gov/News/Releases/Release/Article/2239465/

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console (F12)
3. Check GitHub Pages documentation
4. Refer to NIST 800-171 documentation

## 📄 License

Created by Muhammad Bilal
CMMC Level 2 Compliance Dashboard v3.0
Free to use and modify

## 🎉 Getting Started

1. Download `index.html`
2. Open in browser or deploy to GitHub Pages
3. Login with admin/admin
4. Start tracking CMMC compliance
5. Share with your team

---

**Happy Implementing!** 🚀

For the latest version and updates, visit: https://github.com/YOUR_USERNAME/cmmc-dashboard
