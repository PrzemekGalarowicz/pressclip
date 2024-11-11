export const setCookie = (
  name: string,
  value: string,
  daysToExpire: number
) => {
  const expirationDate = new Date()
  expirationDate.setTime(
    expirationDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000
  )
  const expires = 'expires=' + expirationDate.toUTCString()
  document.cookie =
    name + '=' + encodeURIComponent(value) + ';' + expires + ';path=/'
}

export const getCookie = (name: string) => {
  const cookies = `; ${document.cookie}`
  const parts = cookies.split(`; ${name}=`)
  const value =
    parts.length === 2 ? parts.pop()?.split(';')?.shift() : undefined

  if (value) {
    return decodeURIComponent(value)
  }
}
