import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
    const [createReview, result] = useMutation(CREATE_REVIEW)

    const create = async ({ repositoryOwner, repositoryName, rating, review }) => {
        const result = await createReview({ variables: { review: { ownerName: repositoryOwner, repositoryName, rating: Number(rating), text: review } } })
        console.log(result)
        return result
    }

    return [create, result]
}

export default useCreateReview
