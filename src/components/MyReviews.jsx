import { useQuery } from "@apollo/client"
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native"
import { GET_CURRENT_USER } from "../graphql/queries"
import { ReviewItem } from "./SingleRepository"

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
})

const MyReviews = () => {
	const { data, loading } = useQuery(GET_CURRENT_USER, { variables: {includeReviews: true}, fetchPolicy: 'cache-and-network' })

	if (loading) return <View style={{ justifyContent: 'center', flex: 1 }}><ActivityIndicator size='large' /></View>

  const reviews = data.me.reviews.edges.map(edge => edge.node)

	const ItemSeparator = () => <View style={styles.separator} />

	return (
		<View>
			<FlatList
				data={reviews}
				ItemSeparatorComponent={ItemSeparator}
				renderItem={({ item }) => <ReviewItem review={item} showRepository={true} />}
				keyExtractor={({ id }) => id}
			/>
		</View>
	)
}

export default MyReviews