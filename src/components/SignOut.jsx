import { Pressable, StyleSheet } from "react-native"
import Text from "./Text"
import useAuthStorage from "../hooks/useAuthStorage"
import { useApolloClient } from "@apollo/client"
import { useNavigate } from "react-router-native"
import theme from "../theme"

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
	marginHorizontal: 20,
	marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

const SignOut = () => {
	const authStorage = useAuthStorage()
	const apolloClient = useApolloClient()
	const navigate = useNavigate()

	const signOut = async () => {
		await authStorage.removeAccessToken()
		apolloClient.resetStore()
		navigate('/')
	}

	return (
		<Pressable style={styles.button} onPress={signOut}>
			<Text style={styles.buttonText}>Sign out</Text>
		</Pressable>
	)
}

export default SignOut