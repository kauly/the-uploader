import type { Prisma, Asset } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AssetCreateArgs>({
  asset: {
    one: { data: { name: 'String', location: 'String' } },
    two: { data: { name: 'String', location: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Asset, 'asset'>
