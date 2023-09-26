import fs from 'fs'

import type { APIGatewayEvent, Context } from 'aws-lambda'

import { logger } from 'src/lib/logger'
import { asset as findAsset } from 'src/services/assets'
/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.info(`${event.httpMethod} ${event.path}: downloadFile function`)
  try {
    const body = JSON.parse(event.body) as { id: string }
    const asset = await findAsset({ id: body.id })
    console.log('🚀 ~ file: downloadFile.ts:28 ~ handler ~ asset:', asset)
    const file = await fs.promises.readFile(asset.location)
    const mime = asset.ext.split(':')[1]
    return {
      statusCode: 200,
      headers: {
        'Content-Type': mime,
        'Content-Length': file.length,
      },
      body: `${asset.ext};${file.toString('base64')}`,
      isBase64Encoded: true,
    }
  } catch (err) {
    console.error(err)
    return {
      status: 500,
      body: 'Something went wrong with your download',
    }
  }
}
