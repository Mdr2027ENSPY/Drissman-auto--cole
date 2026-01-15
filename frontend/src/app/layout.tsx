import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Drissman - Trouvez votre auto-école au Cameroun',
  description:
    'La première marketplace de mise en relation entre élèves et auto-écoles au Cameroun. Comparez les prix, les avis et réservez en ligne.',
  keywords: 'auto-école, Cameroun, permis, conduite, Yaoundé, Douala, Bafoussam',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}