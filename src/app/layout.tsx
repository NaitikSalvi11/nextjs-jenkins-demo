import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js Jenkins Demo',
  description: 'Next.js app with Jenkins CI/CD pipeline',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
