import React from 'react';
import './globals.css'

// Default metadata for all pages
export const metadata = {
  title: 'My E-Commerce Site',
  description: 'Shop the latest products at unbeatable prices!',
  keywords: 'e-commerce, shopping, buy online, best deals, discounts',
  openGraph: {
    title: 'My E-Commerce Site',
    description: 'Shop the latest products at unbeatable prices!',
    url: 'https://www.myecommercesite.com',
    images: ['https://www.myecommercesite.com/og-image.jpg'],
    siteName: 'My E-Commerce Site',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@myecommercesite',
    title: 'My E-Commerce Site',
    description: 'Shop the latest products at unbeatable prices!',
    image: 'https://www.myecommercesite.com/twitter-image.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* SEO Metadata */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />

        {/* You can dynamically set the title and description based on the page */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        
        {/* Open Graph and Twitter Card */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0]} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
      </head>
      
      <body>
        {children}
      </body>
    </html>
  );
}
