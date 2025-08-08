import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Creative Surplus",
  description: "A card-based site for creative prompts",
  metadataBase: new URL("https://creative-surplus.com"),
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7472.JPG-eohk23VMxMYHdImr0AHt9GMAFCiKrB.jpeg",
        sizes: "32x32",
        type: "image/jpeg",
      },
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7472.JPG-eohk23VMxMYHdImr0AHt9GMAFCiKrB.jpeg",
        sizes: "16x16",
        type: "image/jpeg",
      },
    ],
    apple: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7472.JPG-eohk23VMxMYHdImr0AHt9GMAFCiKrB.jpeg",
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
    shortcut: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7472.JPG-eohk23VMxMYHdImr0AHt9GMAFCiKrB.jpeg",
        sizes: "192x192",
        type: "image/jpeg",
      },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Creative Surplus",
  },
  openGraph: {
    type: "website",
    url: "https://creative-surplus.com",
    title: "Creative Surplus",
    description: "A card-based site for creative prompts",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7472.JPG-eohk23VMxMYHdImr0AHt9GMAFCiKrB.jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Surplus",
    description: "A card-based site for creative prompts",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7472.JPG-eohk23VMxMYHdImr0AHt9GMAFCiKrB.jpeg",
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, minimal-ui"
        />
        <link rel="canonical" href="https://creative-surplus.com" />
        <link
          rel="mask-icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7472.JPG-eohk23VMxMYHdImr0AHt9GMAFCiKrB.jpeg"
          color="#000000"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
