import { useEffect } from 'react'

const BASE_URL = 'https://www.thestandardsavingsclub.com'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`
const SITE_NAME = 'The Standard Savings Club'

export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  noIndex = false,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Save at Local Boise Businesses`

  const canonical = `${BASE_URL}${path}`

  useEffect(() => {
    // Title
    document.title = fullTitle

    const setMeta = (selector, value) => {
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const attr = selector.includes('[name') ? 'name' : 'property'
        const key = selector.match(/["']([^"']+)["']/)?.[1]
        if (key) el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) { el = document.createElement('link'); el.rel = rel; document.head.appendChild(el) }
      el.href = href
    }

    // Primary
    setMeta('[name="description"]', description || '')
    setMeta('[name="robots"]', noIndex ? 'noindex, nofollow' : 'index, follow')
    setLink('canonical', canonical)

    // OG
    setMeta('[property="og:title"]', fullTitle)
    setMeta('[property="og:description"]', description || '')
    setMeta('[property="og:url"]', canonical)
    setMeta('[property="og:image"]', image)
    setMeta('[property="og:type"]', type)

    // Twitter
    setMeta('[name="twitter:title"]', fullTitle)
    setMeta('[name="twitter:description"]', description || '')
    setMeta('[name="twitter:image"]', image)
  }, [fullTitle, description, canonical, image, type, noIndex])

  return null
}
