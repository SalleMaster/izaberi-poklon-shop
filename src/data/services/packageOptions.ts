import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'
import { PackageOption } from '@prisma/client'

export type GetPackageOptionsReturnType = Promise<PackageOption[]>

export const getPackageOptions = cache(
  async (): GetPackageOptionsReturnType => {
    console.log('getPackageOptions')

    await connection()

    return await prisma.packageOption.findMany({
      orderBy: { updatedAt: 'desc' },
    })
  }
)
