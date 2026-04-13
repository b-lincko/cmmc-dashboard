# CMMC Level 2 Compliance Dashboard

A comprehensive, responsive web-based dashboard for tracking and implementing CMMC (Cybersecurity Maturity Model Certification) Level 2 compliance controls. This tool helps organizations manage all 110 CMMC controls with progress tracking, categorized views, and step-by-step implementation guides.

**Created by Muhammad Bilal**

## Features

### ✅ Core Features
- **Login System**: Secure authentication with admin/admin credentials (demo)
- **110 CMMC Controls**: Complete list of all CMMC Level 2 controls with detailed descriptions
- **Progress Tracking**: Real-time progress bar showing completion percentage
- **Session Persistence**: All changes are automatically saved to browser localStorage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Table of Contents**: Organized by domain (AC, AT, AU, CA, CM, IA, IR, MA, MP, PE, PS, RA, SC, SI)

### 📊 Multiple Views

#### 1. **Dashboard Overview**
- Overall progress statistics
- Completion breakdown by difficulty level (Easy, Moderate, Hard)
- Category-based completion summary
- Quick access to all views

#### 2. **All Controls Checklist**
- Complete list of 110 CMMC controls
- Filter by difficulty level
- Filter by category (Active Directory, Network, Physical, Mobile, Policy)
- Sort by ID, Difficulty, Category, or Status
- Search functionality
- Checkbox to mark controls as completed

#### 3. **Table of Contents**
- Controls organized by domain
- Quick navigation to specific domains
- Domain-level completion statistics

#### 4. **Difficulty-Based View**
- Controls organized by implementation difficulty
- Easy → Moderate → Hard progression
- Step-by-step implementation guides for each control
- Recommended implementation order

#### 5. **Category-Based View**
- Controls organized by implementation category
- Implementation tips for each category
- Detailed step-by-step guides
- Categories:
  - 👤 **Active Directory**: User accounts, authentication, access management
  - 🌐 **Network**: Network security, firewalls, encryption
  - 🏢 **Physical**: Physical security, facilities, equipment
  - 📱 **Mobile**: Mobile devices, remote work, portable storage
  - 📋 **Policy**: Security policies, procedures, training

## Getting Started

### Prerequisites
- Node.js 22.13.0 or higher
- npm or pnpm package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cmmc-dashboard.git
   cd cmmc-dashboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - Login with credentials: `admin` / `admin`

### Building for Production

```bash
pnpm build
# or
npm run build
```

The production build will be created in the `dist/` directory.

## Deployment to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. **Create `.github/workflows/deploy.yml`**
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '22'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch and `/root` folder

### Option 2: Manual Deployment

1. **Build the project**
   ```bash
   pnpm build
   ```

2. **Create `gh-pages` branch**
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r dist/* .
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

3. **Enable GitHub Pages in repository settings**

## Usage Guide

### Login
1. Open the application
2. Enter username: `admin`
3. Enter password: `admin`
4. Click "Login"

### Tracking Compliance
1. **Mark Controls as Complete**: Click the checkbox next to each control
2. **View Progress**: Check the progress bar in the Overview tab
3. **Filter Controls**: Use the dropdown filters to view specific difficulty levels or categories
4. **Search**: Use the search box to find specific controls by ID or title

### Implementation Strategy

**Recommended Approach:**
1. Start with **Easy Controls** for quick wins and momentum
2. Progress to **Moderate Controls** for medium-effort implementations
3. Finally tackle **Hard Controls** which require significant planning

**By Category Approach:**
1. Start with your organization's most critical category
2. Implement all controls in that category
3. Move to the next category

### Step-by-Step Implementation
Each control includes:
- **Description**: What the control requires
- **Implementation Steps**: Detailed steps to implement the control
- **Category**: Which domain the control belongs to
- **Difficulty**: Implementation complexity level

## Control Categories Explained

### 👤 Active Directory (27 controls)
- User account management
- Authentication and authorization
- Access control policies
- Group Policy implementation

**Quick Start:**
- Review current user accounts
- Implement strong password policies
- Enable MFA for all users
- Set up regular access reviews

### 🌐 Network (21 controls)
- Firewall configuration
- Network segmentation
- Encryption protocols
- Intrusion detection

**Quick Start:**
- Review firewall rules
- Implement network segmentation
- Enable encryption for all communications
- Deploy intrusion detection systems

### 🏢 Physical (20 controls)
- Server room security
- Equipment protection
- Media disposal
- Visitor management

**Quick Start:**
- Secure server rooms with access controls
- Implement visitor management
- Secure media storage and disposal
- Monitor physical access logs

### 📱 Mobile (20 controls)
- Mobile device management
- Remote work security
- Portable storage control
- Device encryption

**Quick Start:**
- Enable device encryption
- Implement mobile device management
- Secure remote work environments
- Control portable storage usage

### 📋 Policy (22 controls)
- Security policies and procedures
- Employee training
- Incident response
- Documentation and compliance

**Quick Start:**
- Document security policies
- Conduct security awareness training
- Establish incident response procedures
- Maintain compliance documentation

## Data Storage

All data is stored locally in your browser using localStorage:
- Login status
- Username
- Control completion status
- Progress tracking

**Note**: Data is stored per browser/device. Clearing browser data will reset progress.

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Routing**: Wouter
- **State Management**: React Hooks
- **Build Tool**: Vite
- **Package Manager**: pnpm

## File Structure

```
cmmc-dashboard/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx          # Login page
│   │   │   ├── Dashboard.tsx      # Main dashboard
│   │   │   ├── DifficultyView.tsx # Difficulty-based view
│   │   │   └── CategoryView.tsx   # Category-based view
│   │   ├── components/
│   │   │   ├── ControlsList.tsx   # Controls list component
│   │   │   └── TableOfContents.tsx # TOC component
│   │   ├── lib/
│   │   │   └── cmmc-data.ts       # CMMC controls data
│   │   ├── App.tsx                # Main app component
│   │   └── index.css              # Global styles
│   ├── public/
│   │   └── favicon.ico
│   └── index.html
├── server/
│   └── index.ts                   # Express server (static)
├── package.json
└── README.md
```

## Customization

### Modifying Controls
Edit `/client/src/lib/cmmc-data.ts` to:
- Add new controls
- Modify existing control descriptions
- Change implementation steps
- Update categories or difficulty levels

### Styling
- Global styles: `/client/src/index.css`
- Component styles: Tailwind CSS classes in component files
- Theme colors: Modify CSS variables in `index.css`

### Authentication
To change login credentials, modify `/client/src/pages/Login.tsx`:
```typescript
const validUsername = "admin";
const validPassword = "admin";
```

## Troubleshooting

### Progress not saving?
- Check if localStorage is enabled in your browser
- Try clearing browser cache and logging in again

### Controls not displaying?
- Ensure JavaScript is enabled
- Try refreshing the page
- Check browser console for errors

### Responsive issues?
- Zoom out browser to 90-100%
- Test on different screen sizes
- Clear browser cache

## Future Enhancements

- [ ] Export progress report to PDF
- [ ] Multi-user support with cloud sync
- [ ] Email reminders for incomplete controls
- [ ] Integration with compliance management tools
- [ ] Automated compliance scoring
- [ ] Team collaboration features
- [ ] Mobile app version
- [ ] Dark mode support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the creator.

## Credits

**Created by Muhammad Bilal**

CMMC Level 2 Compliance Dashboard v1.0

---

**Disclaimer**: This dashboard is a tool to help track CMMC compliance efforts. It should not be considered a substitute for professional compliance consulting. Always consult with CMMC experts and assessors for official compliance guidance.
