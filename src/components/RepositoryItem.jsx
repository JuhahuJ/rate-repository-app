import { Image, Pressable, StyleSheet, View } from "react-native"
import Text from "./Text"
import theme from "../theme"
import { useNavigate } from "react-router-native"

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

const RepositoryItem = ({ item }) => {
	navigate = useNavigate()

	return (
		<View testID="repositoryItem" style={{ paddingBottom: 10, backgroundColor: 'white' }}>
			<Pressable onPress={() =>navigate(`/${item.id}`)}>
				<View style={styles.container}>
					<Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
					<View style={styles.info}>
						<Text fontWeight='bold'>{item.fullName}</Text>
						<Text color='textSecondary' style={styles.description}>{item.description}</Text>
						<Text style={styles.blueBackground}>{item.language}</Text>
					</View>
				</View>
				<View style={styles.counts}>
					<View style={styles.countItem}>
						<Text >{formatCount(item.stargazersCount)}</Text>
						<Text color='textSecondary'>Stars</Text>
					</View>
					<View style={styles.countItem}>
						<Text >{formatCount(item.forksCount)}</Text>
						<Text color='textSecondary'>Forks</Text>
					</View>
					<View style={styles.countItem}>
						<Text >{formatCount(item.reviewCount)}</Text>
						<Text color='textSecondary'>Reviews</Text>
					</View>
					<View style={styles.countItem}>
						<Text >{formatCount(item.ratingAverage)}</Text>
						<Text color='textSecondary'>Rating</Text>
					</View>
				</View>
			</Pressable>
		</View>
	)
}

export default RepositoryItem