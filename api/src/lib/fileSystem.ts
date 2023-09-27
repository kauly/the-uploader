import fs from 'fs'
import path from 'path'

const ASSETS_DIR = path.join(__dirname, '..', '/files')
const removeFileNameRegex = /(.*)\/[^\/]+$/

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
      const newPath = location
        .replace(removeFileNameRegex, `$1`)
        .concat(`/${newName}`)
      await fs.promises.rename(location, newPath)
      return newPath
    }
  } catch (err) {
    console.error(err)
  }
}

export { renameFile, deleteFile, saveFile }
