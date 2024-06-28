import { Image, StyleSheet, View } from "react-native"
import Text from "./Text"
import theme from "../theme"

const styles = StyleSheet.create({
	container: {
		paddingLeft: 10,
		paddingTop: 10,
		flexDirection: 'row',
	},
	counts: {
		paddingTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	info: {
		flexDirection: 'column',
		paddingLeft: 10,
		flex: 1,
	},
	avatar: {
		width: 40,
		height: 40,
	},
	description: {
		flexShrink: 1,
		flexWrap: 'wrap',
		paddingBottom: 7,
		color: 'gray',
	},
	blueBackground: {
		backgroundColor: theme.colors.primary,
		color: 'white',
		padding: 5,
		borderRadius: 3,
		alignSelf: 'flex-start',
	},
	countItem: {
		flex: 1,
		alignItems: 'center',
	},
})

const formatCount = (count) => {
	if (count < 1000) {
		return count.toString()
	} else return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
}

const RepositoryItem = ({ item }) => (
	<View style={{ paddingBottom: 10, borderBottomWidth: 10, borderBottomColor: 'lightgray' }}>
		<View style={styles.container}>
			<Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
			<View style={styles.info}>
				<Text fontWeight='bold'>{item.fullName}</Text>
				<Text style={styles.description}>{item.description}</Text>
				<Text style={styles.blueBackground}>{item.language}</Text>
			</View>
		</View>
		<View style={styles.counts}>
			<View style={styles.countItem}>
				<Text >{formatCount(item.stargazersCount)}</Text>
				<Text style={{color: 'gray'}}>Stars</Text>
			</View>
			<View style={styles.countItem}>
				<Text >{formatCount(item.forksCount)}</Text>
				<Text style={{color: 'gray'}}>Forks</Text>
			</View>
			<View style={styles.countItem}>
				<Text >{formatCount(item.reviewCount)}</Text>
				<Text style={{color: 'gray'}}>Reviews</Text>
			</View>
			<View style={styles.countItem}>
				<Text >{formatCount(item.ratingAverage)}</Text>
				<Text style={{color: 'gray'}}>Rating</Text>
			</View>
		</View>
	</View>
)

export default RepositoryItem