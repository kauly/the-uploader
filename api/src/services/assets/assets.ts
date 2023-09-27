import fs from 'fs'
import path from 'path'

import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

const ASSETS_DIR = path.join(__dirname, '..', '/files')
const regex = /(.*)\/[^\/]+$/

const saveFile = async (
  base64Str: string,
  name: string
): Promise<{ location: string; ext: string }> => {
  const base64 = base64Str.split(';base64')
  if (!fs.existsSync(ASSETS_DIR)) {
    await fs.promises.mkdir(ASSETS_DIR)
  }
  const fileName = path.join(ASSETS_DIR, name)
  await fs.promises.writeFile(fileName, base64[1], { encoding: 'base64' })
  return { location: fileName, ext: base64[0] }
}

const deleteFile = async (location: string) => {
  try {
    if (fs.existsSync(location)) {
      await fs.promises.unlink(location)
    }
  } catch (err) {
    console.error(err)
  }
}

const renameFile = async (
  location: string,
  newName: string
): Promise<string> => {
  try {
    if (fs.existsSync(location)) {
      const newPath = location.replace(regex, `$1`).concat(`/${newName}`)
      await fs.promises.rename(location, newPath)
      return newPath
    }
  } catch (err) {
    console.error(err)
  }
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
  const data = await saveFile(input.file, input.name)
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
