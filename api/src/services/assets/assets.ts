import fs from 'fs'
import path from 'path'

import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

const ASSETS_DIR = path.join(__dirname, '..', '/files')

const saveFile = async (base64Str: string, name: string) => {
  const base64File = base64Str.split(';base64').pop()
  if (!fs.existsSync(ASSETS_DIR)) {
    await fs.promises.mkdir(ASSETS_DIR)
  }
  const fileName = path.join(ASSETS_DIR, name)
  await fs.promises.writeFile(fileName, base64File, { encoding: 'base64' })
  return fileName
}

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
  const location = await saveFile(input.file, input.name)
  return db.asset.create({
    data: { name: input.name, location },
  })
}

export const updateAsset: MutationResolvers['updateAsset'] = ({
  id,
  input,
}) => {
  return db.asset.update({
    data: input,
    where: { id },
  })
}

export const deleteAsset: MutationResolvers['deleteAsset'] = ({ id }) => {
  return db.asset.delete({
    where: { id },
  })
}
