import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  	query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
  		repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
					ownerAvatarUrl
				}
			}
		}
	}
`

export const GET_CURRENT_USER = gql`
  	query Me($includeReviews: Boolean = false) {
		me {
			id
			username
			reviews @include(if: $includeReviews) {
				edges {
					node {
						createdAt
						id
						rating
						text
						user {
							username
						}
						repository {
							fullName
						}
					}
				}
			}
		}
	}

`

export const GET_REPOSITORY = gql`
	query GetRepository($repositoryId: ID!) {
		repository(id: $repositoryId) {
			fullName
			description
			language
			stargazersCount
			forksCount
			reviewCount
			ratingAverage
			id
			ownerAvatarUrl
			url
			reviews {
				edges {
					node {
						createdAt
						id
						rating
						text
						user {
							username
						}
					}
				}
			}
		}
	}
`