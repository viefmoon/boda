# 💍 My Wedding App

An elegant and interactive digital wedding invitation app built with Next.js, TypeScript, and Framer Motion. This application provides a beautiful experience for inviting guests to your wedding with captivating animations and responsive design.

## ✨ Key Features

### 🎭 Letter Opening Animation

- Interactive letter animation that opens when clicked
- 3D envelope effect with wax seal
- Floating hearts and sparkle effects
- Support for query parameter `?to=name` for personalization

### 🏠 Hero Section

- Responsive layout with perfect screen height (`h-screen`)
- Animated couple photos with emoji avatars
- Gradient backgrounds with floating decorations
- CTA buttons for navigation between sections

### 🎵 Multimedia Features

- Music player with auto-play detection
- Audio controls with progress bar
- Background music with fallback for browser restrictions

### 🧭 Navigation

- Floating navigation bar with blur effect
- Mobile-friendly FAB (Floating Action Button)
- Scroll progress indicator
- Auto-detect active section with scroll spy
- Smooth scrolling between sections

### 📱 Complete Sections

- **Couple Introduction**: Couple presentation with animations
- **Wedding Details**: Date, time, and add to calendar
- **Countdown Timer**: Real-time countdown to wedding day
- **Venue Information**: Ceremony and reception locations with maps
- **Event Schedule**: Wedding event timeline
- **Gallery Preview**: Couple photos preview
- **RSVP Form**: Guest confirmation form
- **Closing Message**: Closing message from the couple

### 🌐 Internationalization (i18n)

- Multi-language support (Indonesian & English)
- React i18next integration
- Dynamic language switching
- Locale-specific date/time formatting

### 🎨 UI/UX Features

- Modern gradient designs with rose/pink theme
- Framer Motion animations in every section
- Responsive design for mobile, tablet, and desktop
- Tailwind CSS for styling
- TypeScript for type safety

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd my-wedding-app

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Testing with personalization

```bash
# Test with guest name
http://localhost:3000?to=John%20Doe
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/             # Reusable components
│   ├── letter-animation.tsx
│   ├── floating-particles.tsx
│   └── navigation-button.tsx
├── sections/               # Page sections
│   └── home/
│       ├── components/     # Section-specific components
│       └── view/          # Main page view
├── constants/              # App constants & config
│   ├── navigation.ts
│   └── wedding.ts         # Wedding configuration
├── hooks/                  # Custom React hooks
├── locales/               # Internationalization
│   └── langs/
│       ├── en/            # English translations
│       └── id/            # Indonesian translations
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## ⚙️ Configuration

### Wedding Configuration

Edit `src/constants/wedding.ts` to configure wedding details:

```typescript
export const WEDDING_CONFIG = {
  bride: {
    name: 'Sarah',
    fullName: 'Sarah Johnson',
  },
  groom: {
    name: 'Mike',
    fullName: 'Michael Smith',
  },
  date: new Date('2024-12-25T15:30:00'),
  venue: {
    ceremony: {
      name: 'Beautiful Garden',
      address: 'Jl. Taman Indah No. 123',
    },
    reception: {
      name: 'Grand Ballroom',
      address: 'Jl. Kemewahan No. 456',
    },
  },
};
```

### Navigation Sections

Edit `src/constants/navigation.ts` to configure navigation menu:

```typescript
export const NAVIGATION_SECTIONS = [
  { id: 'hero', label: 'Home', icon: '🏠' },
  { id: 'couple', label: 'Couple', icon: '💑' },
  // ...
];
```

### Audio Configuration

Place audio files in `public/assets/audio/` and update the path in the music player component.

## 🎨 Customization

### Theme Colors

The app uses Tailwind CSS with a rose/pink theme. To change colors:

1. Edit `tailwind.config.js` for custom colors
2. Update gradient classes in components
3. Modify CSS variables in `globals.css`

### Animations

All animations use Framer Motion. Configuration is located in:

- `src/constants/navigation.ts` - Navigation animations
- Individual components - Component-specific animations

### Responsive Design

Breakpoints used:

- `sm`: 640px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

## 🛠️ Development Scripts

```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # TypeScript type checking
```

## 📦 Dependencies

### Core

- **Next.js 15**: React framework dengan App Router
- **React 18**: UI library
- **TypeScript**: Type safety

### Styling & Animation

- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **CSS Modules**: Scoped styling

### Internationalization

- **react-i18next**: i18n library
- **i18next**: Internationalization framework

### Utils

- **clsx**: Conditional classnames
- **date-fns**: Date utilities

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Variables

For production, set environment variables:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Custom Domain

To use a custom domain, follow the [Vercel Custom Domain Guide](https://vercel.com/docs/projects/domains).

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Credits

- Design inspiration from modern wedding invitation trends
- Icons and emojis from Unicode Consortium
- Background music support for wedding ambiance

---

**Made with 💕 for beautiful wedding memories**
