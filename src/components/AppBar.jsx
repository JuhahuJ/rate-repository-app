import { View, StyleSheet, ScrollView } from 'react-native'
import Text from './Text'
import { Link } from 'react-router-native'

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
	return <View style={styles.container}>
		<ScrollView horizontal>
			<Link to="/" >
				<Text color='white' padding='padding' fontWeight='bold'>Repositories</Text>
			</Link>
			<Link to="/signin" >
				<Text color='white' padding='padding' fontWeight='bold'>Sign in</Text>
			</Link>
		</ScrollView>
	</View>
}

export default AppBar