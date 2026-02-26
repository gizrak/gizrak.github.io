import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, title, image, url, type, article, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const siteUrl = site.siteMetadata.siteUrl
  const canonicalUrl = url ? `${siteUrl}${url}` : null
  const ogType = type || `website`
  const defaultImage = `${siteUrl}/assets/images/gizrak.jpg`
  const metaImage = image || defaultImage

  return (
    <Helmet
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        // Open Graph
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: ogType,
        },
        ...(canonicalUrl
          ? [{ property: `og:url`, content: canonicalUrl }]
          : []),
        {
          property: `og:site_name`,
          content: defaultTitle,
        },
        {
          property: `og:locale`,
          content: `ko_KR`,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          property: `og:image:width`,
          content: `1200`,
        },
        {
          property: `og:image:height`,
          content: `630`,
        },
        // Article-specific OG tags
        ...(article?.publishedTime
          ? [
              {
                property: `article:published_time`,
                content: article.publishedTime,
              },
            ]
          : []),
        ...(article?.author
          ? [
              {
                property: `article:author`,
                content: article.author,
              },
            ]
          : []),
        // Twitter Card
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter
            ? `@${site.siteMetadata.social.twitter}`
            : ``,
        },
        {
          name: `twitter:site`,
          content: site.siteMetadata?.social?.twitter
            ? `@${site.siteMetadata.social.twitter}`
            : ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: metaImage,
        },
      ]}
    >
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {children}
    </Helmet>
  )
}

export default Seo
