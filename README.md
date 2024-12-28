# Lakeside Landing Booking Site

A modern booking website for Lakeside Landing, a private lake retreat in rural Nebraska.

## Features

- Interactive booking calendar
- Photo gallery with lightbox
- Animated scroll sections
- Responsive design
- Material UI components
- Next.js 14 App Router

## Tech Stack

- Next.js 14
- TypeScript
- Material UI
- Framer Motion
- date-fns
- node-ical

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hustada/lakeside-landing2.git
   cd lakeside-landing2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) to view the site**

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
NEXT_PUBLIC_AIRBNB_ICAL_URL=your_airbnb_ical_url
```

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add the environment variables in Vercel's project settings
4. Deploy!

## Project Structure

```
lakeside-landing2/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   └── theme.ts         # Material UI theme configuration
├── public/              # Static assets
└── package.json         # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Contact

Mark Hustad - Project Owner
