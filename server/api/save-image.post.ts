import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readFormData(event)
    const file = formData.get('image')
    
    if (!file) {
      throw createError({
        statusCode: 400,
        statusMessage: '请选择图片文件'
      })
    }
    
    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        statusMessage: '不支持的文件类型，请选择图片文件'
      })
    }
    
    // 生成文件名
    const timestamp = Date.now()
    const originalName = file.name
    const extension = originalName.split('.').pop()
    const imageName = `${timestamp}-${originalName}`
    
    // 确保 public/images 目录存在
    const imagesDir = join(process.cwd(), 'public/images')
    await mkdir(imagesDir, { recursive: true })
    
    // 保存文件
    const targetPath = join(imagesDir, imageName)
    const buffer = await file.arrayBuffer()
    await writeFile(targetPath, Buffer.from(buffer))
    
    return {
      success: true,
      imagePath: `/images/${imageName}`,
      imageName: imageName,
      originalName: originalName
    }
    
  } catch (error) {
    console.error('保存图片失败:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '图片保存失败: ' + error.message
    })
  }
}) 