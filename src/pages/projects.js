import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Img from 'gatsby-image'

const ProjectLink = styled(Link)`
  text-decoration: none;
  color: #2B2B2B;  
`
const ProjectBody = styled.div`
  flex-direction: row;
`
const Test = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 10em;
  margin-right: 2em;
`

export default ({ data }) => {
  console.log(data)
  return (
  <Layout>
      {data.allFile.edges.map(({ node }) => (
        <ProjectBody>
        <ProjectLink to={node.childMarkdownRemark.fields.slug} key={node.id}> 
        <Test>
        <h3>{node.childMarkdownRemark.frontmatter.title}</h3>
        <p>{node.childMarkdownRemark.excerpt}</p>
        </Test>
        <Img fixed={node.childMarkdownRemark.frontmatter.img.childImageSharp.fixed}/>
        </ProjectLink>
        </ProjectBody> 
      ))}
  </Layout>
  )
}

export const query = graphql`
  query {
    allFile(
      filter: {internal: {mediaType: {eq: "text/markdown"}}, 
        relativeDirectory: {regex: "/(pages)/(projects)/"}} 
    ) {
      edges {
        node {
          id
          relativeDirectory
          childMarkdownRemark {
            frontmatter {
              title
              date
              img {
                childImageSharp {
                  fixed(width: 400){
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }     
    }
  }
`