'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Brand({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <Image src="/placeholder-logo.svg" alt="AAA" width={32} height={32} priority />
      <span className="text-2xl font-bold tracking-tight">
        <span className="text-primary">AA</span>A
      </span>
    </Link>
  )
}


