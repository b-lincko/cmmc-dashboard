# CMMC Dashboard - Quick Start Guide

**Created by Muhammad Bilal**

## 🚀 Get Started in 5 Minutes

### 1. Login to Dashboard

- **URL**: `http://localhost:3000` (development) or your deployed URL
- **Username**: `admin`
- **Password**: `admin`

### 2. Main Dashboard Features

#### Overview Tab
- See overall compliance progress
- View completion by difficulty (Easy/Moderate/Hard)
- Check category-based completion

#### All Controls Tab
- View all 110 CMMC controls
- Filter by difficulty level
- Filter by category
- Check/uncheck controls as you implement them
- Progress automatically saves

#### Table of Contents Tab
- Browse controls organized by domain
- Quick navigation by NIST domain
- Domain-level statistics

### 3. Advanced Views

#### By Difficulty View
- Start with Easy controls for quick wins
- Progress to Moderate controls
- Tackle Hard controls last
- Each control shows step-by-step implementation guide

#### By Category View
- Organize by implementation area:
  - 👤 Active Directory
  - 🌐 Network
  - 🏢 Physical
  - 📱 Mobile
  - 📋 Policy
- Implementation tips for each category
- Detailed step-by-step guides

#### Implementation Guide
- Detailed commands for each control
- Platform-specific instructions:
  - Windows PowerShell
  - Group Policy
  - Registry
  - Linux
  - macOS
- Copy-to-clipboard functionality
- Prerequisites and verification steps

#### Command Reference
- Quick access to all commands
- Organized by platform
- Downloadable cheat sheet
- Easy copy-to-clipboard

## 📋 Implementation Workflow

### Recommended Approach

1. **Start with Easy Controls** (Quick Wins)
   - Implement 10-15 easy controls first
   - Build momentum
   - Gain confidence

2. **Move to Moderate Controls** (Medium Effort)
   - Requires more planning
   - May need tool installation
   - 2-4 hours per control

3. **Tackle Hard Controls** (Complex)
   - Requires significant planning
   - May need external expertise
   - 4-6 hours per control

### By Category Approach

1. Choose your most critical category
2. Implement all controls in that category
3. Move to next category
4. Repeat until all categories complete

## 🔧 Using Implementation Guides

### For Each Control

1. **Read Prerequisites**
   - Check required tools
   - Verify access levels
   - Prepare environment

2. **Choose Your Platform**
   - Windows (PowerShell/Group Policy/Registry)
   - Linux (Bash commands)
   - macOS (Terminal commands)

3. **Copy Commands**
   - Hover over command block
   - Click copy icon
   - Paste into terminal

4. **Verify Implementation**
   - Follow verification steps
   - Check Event Viewer/logs
   - Confirm control is working

5. **Mark as Complete**
   - Check the control checkbox
   - Progress bar updates automatically
   - Data saves to browser

## 💾 Data Storage

- All progress is saved locally in your browser
- Data persists between sessions
- Clear browser data to reset progress
- Export data by taking screenshots

## 🌐 Deployment

### Deploy to GitHub Pages

```bash
# 1. Create GitHub repository
# 2. Push code to GitHub
git push origin main

# 3. GitHub Actions automatically deploys
# 4. Access at: https://username.github.io/cmmc-dashboard/
```

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

## 📊 Progress Tracking

- **Progress Bar**: Shows overall completion percentage
- **Quick Stats**: Breakdown by difficulty and category
- **Control Checkboxes**: Mark controls as complete
- **Automatic Saving**: Changes save to localStorage

## 🔐 Security Notes

- Login credentials are for demo purposes
- Customize credentials in production
- All data stored locally (no cloud sync)
- Use HTTPS in production
- Keep browser updated

## 🛠️ Customization

### Change Login Credentials

Edit `/client/src/pages/Login.tsx`:
```typescript
const validUsername = "admin";
const validPassword = "admin";
```

### Add New Controls

Edit `/client/src/lib/cmmc-data.ts`:
```typescript
{
  id: "AC.L2-3.1.X",
  title: "Your control title",
  domain: "AC",
  difficulty: "Easy",
  category: "Active Directory",
  description: "Control description",
  steps: ["Step 1", "Step 2"],
  completed: false
}
```

### Modify Styling

Edit `/client/src/index.css` for global styles.

## 📱 Responsive Design

- **Desktop**: Full-featured interface
- **Tablet**: Optimized layout
- **Mobile**: Touch-friendly controls
- Sidebar collapses on small screens

## ⌨️ Keyboard Shortcuts

- `Tab`: Navigate between elements
- `Enter`: Activate buttons
- `Space`: Toggle checkboxes
- `Ctrl+C`: Copy commands

## 🐛 Troubleshooting

### Progress Not Saving?
- Check if localStorage is enabled
- Try clearing browser cache
- Use a different browser

### Commands Not Copying?
- Ensure you're using HTTPS
- Check browser console for errors
- Try a different browser

### Controls Not Displaying?
- Refresh the page
- Clear browser cache
- Check browser console

## 📚 Command Examples

### Quick Windows Setup
```powershell
# List all users
Get-ADUser -Filter * | Select-Object Name

# Enable firewall
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True

# Check BitLocker status
Get-BitLockerVolume
```

### Quick Linux Setup
```bash
# List users
cat /etc/passwd

# Enable firewall
sudo ufw enable

# Check sudo access
sudo -l
```

### Quick macOS Setup
```bash
# List users
dscl . list /Users

# Enable FileVault
sudo fdesetup enable

# Check sudo access
sudo -l
```

## 📖 Documentation

- **README.md**: Comprehensive project documentation
- **DEPLOYMENT_GUIDE.md**: Detailed deployment instructions
- **QUICK_START.md**: This file
- **Implementation Guide**: In-app detailed guides

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the README.md
3. Check browser console for errors
4. Refer to NIST 800-171 documentation

## 📞 Contact

**Created by Muhammad Bilal**
CMMC Level 2 Compliance Dashboard v2.0

---

## Next Steps

1. ✅ Login to dashboard (admin/admin)
2. ✅ Review Overview tab
3. ✅ Start with Easy controls
4. ✅ Use Implementation Guide for commands
5. ✅ Mark controls as complete
6. ✅ Deploy to GitHub Pages
7. ✅ Share with your team

Happy implementing! 🎉
