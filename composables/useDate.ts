export const useDate = () => {
  // 格式化日期为中文格式
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return ''
    
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // 格式化日期为简短格式
  const formatShortDate = (dateString: string | null | undefined) => {
    if (!dateString) return ''
    
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  // 格式化相对时间
  const formatRelativeTime = (dateString: string | null | undefined) => {
    if (!dateString) return ''
    
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return '今天'
    if (diffInDays === 1) return '昨天'
    if (diffInDays < 7) return `${diffInDays}天前`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}周前`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}个月前`
    
    return `${Math.floor(diffInDays / 365)}年前`
  }

  return {
    formatDate,
    formatShortDate,
    formatRelativeTime
  }
} 