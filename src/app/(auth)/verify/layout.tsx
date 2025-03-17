// Inside (auth)/verify/layout.tsx
export const metadata = {
  title: 'Verify Your Account - My E-Commerce Site',
  description: 'Please verify your email to complete the registration process.',
};

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />

        {/* Title and Description for SEO (if relevant) */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>{children}</body>
    </html>
  );
}
