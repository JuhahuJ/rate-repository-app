import { ActivityIndicator, FlatList, Linking, Pressable, StyleSheet, View } from 'react-native'
import Text from './Text'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'
import RepositoryItem from './RepositoryItem'
import theme from '../theme'
import { format } from 'date-fns'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    height: 10,
  },
  reviewScore: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    margin: 10,
  },
  reviewContent: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  reviewText: {
    flexWrap: 'wrap',
    flexShrink: 1,
  },
})

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={{ backgroundColor: 'white', paddingBottom: 20, marginBottom: 10 }}>
      <RepositoryItem item={repository} />
      <Pressable style={styles.button} onPress={() => Linking.openURL(repository.url)}>
        <Text style={styles.buttonText}>Open in Github</Text>
      </Pressable>
    </View>
  )
}

export const ReviewItem = ({ review, showRepository }) => {
  const whatToShow = showRepository 
  ? review.repository.fullName 
  : review.user.username

  return (
    <View style={styles.container}>
      <View style={styles.reviewScore}>
        <Text color='primary'>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={{ paddingTop: 10 }} fontWeight='bold'>{whatToShow}</Text>
        <Text color='textSecondary'>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} />

const SingleRepository = ({ id }) => {
  const { data, loading } = useQuery(GET_REPOSITORY, {fetchPolicy: 'cache-and-network', variables: { repositoryId: id } })

  if (loading) return <View style={{ justifyContent: 'center', flex: 1 }}><ActivityIndicator size='large' /></View>

  const reviews = data.repository.reviews.edges.map(edge => edge.node)

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
    />
  )
}

export default SingleRepository
