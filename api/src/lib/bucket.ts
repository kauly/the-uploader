import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from '@aws-sdk/client-s3'

const BUCKET = 'the-uploader'

const client = new S3Client({
  region: 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
})

const contentTypeRegex =
  /data:(?<content_type>[a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/
const contentRegex = /data:.*\/.*,(?<file_content>.*)/

export const putObject = async (base64Str: string, name: string) => {
  try {
    const contentMatch = contentRegex.exec(base64Str)
    const contentTypeMatch = contentTypeRegex.exec(base64Str)

    if (!contentMatch || !contentTypeMatch) {
      throw 'Bad file!'
    }

    const { file_content } = contentMatch.groups
    const { content_type } = contentTypeMatch.groups

    const fileBuffer = Buffer.from(file_content, 'base64')
    await client.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: name,
        Body: fileBuffer,
        ContentType: content_type,
      })
    )
  } catch (err) {
    console.error(err)
  }
}

export const retrieveObject = async (name: string) => {
  try {
    const response = await client.send(
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: name,
      })
    )
    return response.Body
  } catch (error) {
    console.error(error)
  }
}
