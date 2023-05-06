
export const format = (time: number) => {
  const now = new Date(time)
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  let hour = now.getHours()
  let hourStr = hour > 9 ? hour : '0' + hour
  let min = now.getMinutes()
  let minStr = min > 9 ? min : '0' + min
  let second = now.getSeconds()
  let secondStr = second > 9 ? second : '0' + second
  return `${year}/${month}/${day} ${hourStr}:${minStr}:${secondStr}`
} 