import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/storefront/Header';
import Footer from '@/components/storefront/Footer';
import CartDrawer from '@/components/storefront/CartDrawer';
import WhatsAppFloatingButton from '@/components/storefront/WhatsAppFloatingButton';
import CustomCursor from '@/components/storefront/CustomCursor';
import AIStyleAssistant from '@/components/storefront/AIStyleAssistant';

export const metadata: Metadata = {
  metadataBase: new URL('https://dhigaafashions.com'),
  title: 'Dhigaa Fashions — Where Grace Meets Grandeur | Luxury Sarees Erode',
  description:
    'Dhigaa Fashions is an ultra-realistic luxury boutique rooted in Erode, Tamil Nadu. Handcrafted pure Kanchipuram silk sarees, Chettinad cottons, bespoke bridal trousseau and custom blouse stitching.',
  keywords: [
    'Dhigaa Fashions',
    'Kanchipuram silk sarees in Erode',
    'boutique in Erode',
    'Chettinad cotton sarees',
    'South Indian bridal wear',
    'Tamil Nadu handloom sarees',
    'custom blouse stitching Erode',
    'pattu pavadai',
    'where every thread has a story',
  ],
  authors: [{ name: 'Dhigaa Fashions Atelier' }],
  openGraph: {
    title: 'Dhigaa Fashions — Where Grace Meets Grandeur',
    description:
      'Where every thread has a story. Authentic pure mulberry Kanchipuram silk and Chettinad cotton handlooms directly from Erode, Tamil Nadu.',
    url: 'https://dhigaafashions.com',
    siteName: 'Dhigaa Fashions',
    images: [
      {
        url: '/assets/logo.png',
        width: 1200,
        height: 630,
        alt: 'Dhigaa Fashions Boutique',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Dhigaa Fashions',
    description:
      'Luxury Indian boutique offering handcrafted Kanchipuram silks, Chettinad cottons, bridal wear and bespoke tailoring.',
    telephone: '+91 9092806555',
    email: 'dhigaafashions@gmail.com',
    url: 'https://dhigaafashions.com',
    logo: 'https://dhigaafashions.com/assets/logo.png',
    image: 'https://dhigaafashions.com/assets/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '128 Nethaji Road',
      addressLocality: 'Erode',
      addressRegion: 'Tamil Nadu',
      postalCode: '638001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 11.341,
      longitude: 77.7172,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:30',
        closes: '21:00',
      },
    ],
    priceRange: '₹₹₹',
    sameAs: [
      'https://www.instagram.com/dhigaa_fashions/',
      'https://wa.me/919092806555',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="bg-[#FAF7F2] dark:bg-[#1B1512] text-[#2B211C] dark:text-[#F5EEE2] min-h-screen flex flex-col font-sans transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <CustomCursor />
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <CartDrawer />
                <WhatsAppFloatingButton />
                <AIStyleAssistant />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
