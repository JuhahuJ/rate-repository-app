import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query Repositories {
  	repositories {
    	edges {
      	node {
					fullName
					description
					language
					stargazersCount
					forksCount
					reviewCount
					ratingAverage
					id
      	}
    	}
  	}
	}
`

export const GET_CURRENT_USER = gql`
  	query Query {
		me {
			id
			username
		}
	}

`