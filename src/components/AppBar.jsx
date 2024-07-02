import { View, StyleSheet, ScrollView } from 'react-native'
import Text from './Text'
import { Link } from 'react-router-native'
import { GET_CURRENT_USER } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		backgroundColor: '#303133',
		height: 90,
		display: 'flex',
		flexDirection: 'row',
	},
})

const AppBar = () => {
	const {data} = useQuery(GET_CURRENT_USER, { fetchPolicy: 'cache-and-network' })

	return <View style={styles.container}>
		<ScrollView horizontal>
			<Link to="/" >
				<Text color='white' padding='padding' fontWeight='bold'>Repositories</Text>
			</Link>
			{data?.me && <Link to="/createreview" >
				<Text color='white' padding='padding' fontWeight='bold'>Create a review</Text>
			</Link>}
			{data?.me && <Link to="/myreviews" >
				<Text color='white' padding='padding' fontWeight='bold'>My reviews</Text>
			</Link>}
			{!data?.me && <Link to="/signin" >
				<Text color='white' padding='padding' fontWeight='bold'>Sign in</Text>
			</Link>}
			{data?.me && <Link to="/signout" >
				<Text color='white' padding='padding' fontWeight='bold'>Sign out</Text>
			</Link>}
			{!data?.me && <Link to="/signup" >
				<Text color='white' padding='padding' fontWeight='bold'>Sign up</Text>
			</Link>}
		</ScrollView>
	</View>
}

export default AppBar