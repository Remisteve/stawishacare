
'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname()
  
  // Since we only have superadmin now, just return children without wrapper
  console.log('🔥 AUTH LAYOUT - Current path:', pathname)
  console.log('✅ CLEAN SUPERADMIN ONLY SETUP')
  
  return <>{children}</>
}
