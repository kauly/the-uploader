import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { putObject } from 'src/lib/bucket'
import { db } from 'src/lib/db'

export const bucketAssets: QueryResolvers['bucketAssets'] = () => {
  return db.bucketAsset.findMany()
}

export const bucketAsset: QueryResolvers['bucketAsset'] = ({ id }) => {
  return db.bucketAsset.findUnique({
    where: { id },
  })
}

export const bucketAssetByName: QueryResolvers['bucketAssetByName'] = ({
  name,
}) => {
  return db.bucketAsset.findFirst({
    where: { name },
  })
}

export const createBucketAsset: MutationResolvers['createBucketAsset'] =
  async ({ input }) => {
    const assetCopy = await bucketAssetByName({ name: input.name })
    const version = await putObject({
      base64Str: input.file,
      name: input.name,
      theCopy: assetCopy,
    })
    if (assetCopy && assetCopy.version === version) return assetCopy
    return db.bucketAsset.create({
      data: { name: input.name, version },
    })
  }

export const updateBucketAsset: MutationResolvers['updateBucketAsset'] = ({
  id,
  input,
}) => {
  return db.bucketAsset.update({
    data: input,
    where: { id },
  })
}

export const deleteBucketAsset: MutationResolvers['deleteBucketAsset'] = ({
  id,
}) => {
  return db.bucketAsset.delete({
    where: { id },
  })
}
