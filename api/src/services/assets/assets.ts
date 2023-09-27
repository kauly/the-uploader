import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { saveFile, deleteFile, renameFile } from 'src/lib/fileSystem'

export const assets: QueryResolvers['assets'] = () => {
  return db.asset.findMany()
}

export const asset: QueryResolvers['asset'] = ({ id }) => {
  return db.asset.findUnique({
    where: { id },
  })
}

export const createAsset: MutationResolvers['createAsset'] = async ({
  input,
}) => {
  const data = await saveFile(input.file, input.name)
  if (typeof data === 'string') return

  return db.asset.create({
    data: { name: input.name, ...data },
  })
}

export const updateAsset: MutationResolvers['updateAsset'] = async ({
  id,
  input,
}) => {
  if (input.name) {
    const item = await asset({ id })
    const newLocation = await renameFile(item.location, input.name)
    return db.asset.update({
      data: { ...input, location: newLocation },
      where: { id },
    })
  }

  return db.asset.update({
    data: input,
    where: { id },
  })
}

export const deleteAsset: MutationResolvers['deleteAsset'] = async ({ id }) => {
  const item = await asset({ id })
  const location = item.location

  await deleteFile(location)

  return db.asset.delete({
    where: { id },
  })
}
