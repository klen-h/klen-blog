import { readFile } from 'fs/promises'
import { join } from 'path'

const DATA_PATH = join(process.cwd(), 'data', 'posts.json')

export default defineEventHandler(async () => {
  try {
    const data = await readFile(DATA_PATH, 'utf-8')
    const posts = JSON.parse(data)
    return posts
  } catch (error) {
    console.error('读取文章数据失败:', error)
    return []
  }
}) 