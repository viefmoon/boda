# 💒 Wedding Invitation App

Beautiful, modern wedding invitation application built with Next.js 15, TypeScript, Tailwind CSS, and Motion animations.

## ✨ Features

- **Responsive Design**: Beautiful UI that works on all devices
- **Modern Animations**: Smooth transitions and interactions using Motion
- **Clean Architecture**: Well-organized component structure
- **TypeScript**: Full type safety and great developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Modular Components**: Reusable and maintainable component library

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── invitation/         # Invitation page route
│   └── page.tsx           # Home page
├── components/            # Shared components
├── hooks/                 # Custom React hooks
│   └── use-wedding.ts     # Wedding-specific hooks
├── lib/                   # Utility functions
│   └── wedding-utils.ts   # Wedding helper functions
└── sections/              # Feature sections
    ├── home/              # Home section components
    │   ├── components/
    │   └── view/
    └── invitation/        # Invitation section components
        ├── components/    # Individual components
        │   ├── hero-section.tsx
        │   ├── couple-introduction.tsx
        │   ├── wedding-details-card.tsx
        │   ├── countdown-timer.tsx
        │   ├── venue-information.tsx
        │   ├── event-schedule.tsx
        │   ├── rsvp.tsx
        │   ├── gallery-preview.tsx
        │   └── closing-message.tsx
        └── view/           # Main view component
            └── invitation-view.tsx
```

## 🎨 Design System

### Colors

- **Primary**: Rose/Pink gradients
- **Secondary**: Purple/Indigo accents
- **Neutral**: Gray tones for text and backgrounds

### Typography

- **Headers**: Font Serif for elegant headings
- **Body**: Sans-serif for readability
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components

- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Animations**: Gentle fade-ins and slide-ups

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Pages

### Home Page (`/`)

- Welcome section with couple names
- Wedding date and countdown
- Feature cards
- Love story preview

### Invitation Page (`/invitation`)

- Hero section with couple photos
- Couple introduction
- Wedding details with countdown
- Venue information
- Event schedule
- Photo gallery preview
- RSVP form
- Closing message

## 🔧 Customization

### Wedding Configuration

Edit the wedding details in `src/sections/invitation/view/invitation-view.tsx`:

```typescript
const weddingConfig = {
  date: new Date('2025-09-15T16:00:00'),
  bride: {
    name: 'Mio',
    fullName: 'Akiyama Mio',
    photo: '/path-to-photo.jpg',
  },
  groom: {
    name: 'Fiqri',
    fullName: 'M. Fiqri Haikhar Anwar',
    photo: '/path-to-photo.jpg',
  },
  venue: {
    ceremony: {
      name: "St. Mary's Cathedral",
      address: '123 Church Street, Downtown',
      time: '4:00 PM',
    },
    reception: {
      name: 'Grand Ballroom Hotel',
      address: '456 Wedding Ave, City Center',
      time: '6:30 PM',
    },
  },
};
```

### Colors and Styling

Modify Tailwind classes in components or extend the theme in `tailwind.config.ts`.

### Adding New Sections

1. Create a new component in `src/sections/invitation/components/`
2. Export it from `src/sections/invitation/components/index.ts`
3. Import and use it in `src/sections/invitation/view/invitation-view.tsx`

## 🛠️ Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Custom Hooks

#### `useCountdown(targetDate: Date)`

Provides real-time countdown to the wedding date:

```typescript
const { days, hours, minutes, seconds } = useCountdown(weddingDate);
```

#### `useScrollSpy(sectionIds: string[])`

Tracks which section is currently in view:

```typescript
const activeSection = useScrollSpy(['hero', 'couple', 'details']);
```

#### `useInView(threshold?: number)`

Detects when an element enters the viewport:

```typescript
const [setRef, inView] = useInView(0.3);
```

### Utility Functions

#### Wedding Utilities (`src/lib/wedding-utils.ts`)

- `formatWeddingDate(date: Date)` - Format date for display
- `formatWeddingTime(date: Date)` - Format time for display
- `calculateTimeRemaining(targetDate: Date)` - Calculate countdown
- `generateGoogleCalendarLink(event)` - Create calendar links
- `generateMapLink(address: string)` - Create map links

## 🎯 Best Practices

### Component Structure

- Use TypeScript interfaces for props
- Implement proper error boundaries
- Follow React best practices
- Use semantic HTML elements

### Performance

- Lazy load images
- Use `motion` animations efficiently
- Implement proper memoization where needed
- Optimize bundle size

### Accessibility

- Include proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios
- Use semantic HTML

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 💡 Tips for Customization

1. **Photos**: Replace placeholder URLs with actual couple photos
2. **Content**: Update all text content to match your story
3. **Colors**: Modify the color scheme to match your wedding theme
4. **Sections**: Add or remove sections based on your needs
5. **RSVP**: Connect the RSVP form to your preferred backend service

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing documentation
2. Search through issues
3. Create a new issue with detailed information

---

Made with ❤️ for your special day
