import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const DATA_PATH = join(process.cwd(), 'data', 'posts.json')

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    const data = await readFile(DATA_PATH, 'utf-8')
    return JSON.parse(data)
  }
  if (event.req.method === 'POST') {
    const body = await readBody(event)
    if (Array.isArray(body)) {
      // 全量覆盖
      await writeFile(DATA_PATH, JSON.stringify(body, null, 2), 'utf-8')
      return { success: true }
    } else {
      // 追加
      const data = JSON.parse(await readFile(DATA_PATH, 'utf-8'))
      data.push(body)
      await writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8')
      return { success: true }
    }
  }
}) 