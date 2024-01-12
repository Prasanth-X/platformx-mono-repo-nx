import { handleHtmlTags, trimString } from '@platformx/utilities'

export const updateStructureDataVOD = (
  title = '',
  description = '',
  videoUrl = '',
  thumbnailURL = '',
) => {
  const VodStructureData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'VideoObject',
        contentUrl: videoUrl,
        name: title ? trimString(handleHtmlTags(title), 100) : '',
        description: description
          ? trimString(handleHtmlTags(description), 200)
          : '',
        embedUrl: videoUrl,
        thumbnailUrl: {
          '@id': thumbnailURL,
        },
      },
    ],
  }
  return VodStructureData
}

export const formatUrl = (enteredVal) => {
  let tmp = enteredVal.toLowerCase()
  tmp = tmp.replace(/\s/g, '-')
  tmp = tmp.replace(/[^a-z0-9\- ]/gi, '')
  return tmp
}
