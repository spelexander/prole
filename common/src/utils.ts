export const truncate = (input: string, size: number) =>
  input.length > size ? `${input.substring(0, size)}...` : input

/**
 * Validates a domain name entry excluding protocol prefix
 */
export const isValidDomainName = (url: string) =>
  Boolean(
    url &&
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(url)
  )

/**
 * Parses the hostname from the url
 */
export const parseHostName = (url: string | null | void) => {
  if (!url) {
    return null
  }

  let parsedUrl = url.trim()
  // no protocol add it for the regex
  if (
    !url.startsWith('http') &&
    !url.startsWith('ftp') &&
    !url.startsWith('ws')
  ) {
    parsedUrl = `https://${url}`
  }

  try {
    const hostName = new URL(parsedUrl).hostname

    if (hostName.startsWith('www.')) {
      return hostName.substring(4)
    }

    return hostName
  } catch (e) {
    return null
  }
}
