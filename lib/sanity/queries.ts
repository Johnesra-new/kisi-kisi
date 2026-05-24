import { groq } from 'next-sanity'

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(isFeatured desc, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    "thumbnail": thumbnail.asset->url,
    techStack,
    liveUrl,
    githubUrl,
    isFeatured,
    status,
    publishedAt
  }
`

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    description,
    longDescription,
    "thumbnail": thumbnail.asset->url,
    "images": images[].asset->url,
    techStack,
    liveUrl,
    githubUrl,
    publishedAt
  }
`

export const CERTIFICATES_QUERY = groq`
  *[_type == "certificate"] | order(issuedAt desc) {
    _id,
    name,
    issuer,
    issuedAt,
    credentialUrl,
    "thumbnail": thumbnail.asset->url,
    category
  }
`

export const TECH_STACK_QUERY = groq`
  *[_type == "techStack"] | order(category asc, order asc) {
    _id,
    name,
    "icon": icon.asset->url,
    category,
    proficiency,
    role,
    description
  }
`
