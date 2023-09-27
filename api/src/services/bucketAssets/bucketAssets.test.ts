import type { BucketAsset } from '@prisma/client'

import {
  bucketAssets,
  bucketAsset,
  createBucketAsset,
  updateBucketAsset,
  deleteBucketAsset,
} from './bucketAssets'
import type { StandardScenario } from './bucketAssets.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('bucketAssets', () => {
  scenario('returns all bucketAssets', async (scenario: StandardScenario) => {
    const result = await bucketAssets()

    expect(result.length).toEqual(Object.keys(scenario.bucketAsset).length)
  })

  scenario(
    'returns a single bucketAsset',
    async (scenario: StandardScenario) => {
      const result = await bucketAsset({ id: scenario.bucketAsset.one.id })

      expect(result).toEqual(scenario.bucketAsset.one)
    }
  )

  scenario('creates a bucketAsset', async () => {
    const result = await createBucketAsset({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a bucketAsset', async (scenario: StandardScenario) => {
    const original = (await bucketAsset({
      id: scenario.bucketAsset.one.id,
    })) as BucketAsset
    const result = await updateBucketAsset({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a bucketAsset', async (scenario: StandardScenario) => {
    const original = (await deleteBucketAsset({
      id: scenario.bucketAsset.one.id,
    })) as BucketAsset
    const result = await bucketAsset({ id: original.id })

    expect(result).toEqual(null)
  })
})
