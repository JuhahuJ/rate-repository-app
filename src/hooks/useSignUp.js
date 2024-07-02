import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../graphql/mutations'
import useSignIn from './useSignIn'

const useCreateUser = () => {
	const [createUser, result] = useMutation(CREATE_USER)
  const [signIn] = useSignIn()

	const create = async ({ username, password }) => {
		const result = await createUser({ variables: { user: { username, password } } })
		const { data } = await signIn({ username, password })
		console.log(data)
		return result
	}

	return [create, result]
}

export default useCreateUser
