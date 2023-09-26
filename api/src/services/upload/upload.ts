import fs from 'fs'
import path from 'path'

import type { MutationResolvers } from 'types/graphql'

const ASSETS_DIR = path.join(__dirname, '../../', '/files')

export const saveFile: MutationResolvers['saveFile'] = async ({ file }) => {
  console.log(
    "🚀 ~ file: upload.ts:9 ~ constsaveFile:MutationResolvers['saveFile']= ~ file:",
    file
  )
  try {
    const fileArrayBuffer = await file.arrayBuffer()
    await fs.promises.writeFile(
      path.join(ASSETS_DIR, file.name),
      Buffer.from(fileArrayBuffer)
    )
  } catch (e) {
    console.error(e)
    return false
  }
}
