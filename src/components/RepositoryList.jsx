import React, { useState } from 'react'
import { FlatList, View, StyleSheet, ActivityIndicator, TextInput } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { Picker } from '@react-native-picker/picker'
import { useDebounce } from 'use-debounce'

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
})

const orderings = {
	'latest': { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
	'highest': { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
	'lowest': { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
}

const Header = ({ selectedOrdering, setSelectedOrdering, search, setSearch }) => {
	const selectedValue = Object.keys(orderings).find(
		key => orderings[key].orderBy === selectedOrdering.orderBy && orderings[key].orderDirection === selectedOrdering.orderDirection
	)

	return (
		<View>
			<TextInput
				placeholder="Search..."
				value={search}
				onChangeText={(value) => setSearch(value)}
				style={{ padding: 10, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
			/>
			<Picker
				selectedValue={selectedValue}
				onValueChange={(itemValue) =>
					setSelectedOrdering(orderings[itemValue])
				}>
				<Picker.Item label="Latest repositories" value="latest" />
				<Picker.Item label="Highest rated repositories" value="highest" />
				<Picker.Item label="Lowest rated repositories" value="lowest" />
			</Picker>
		</View>
	)
}

const ItemSeparator = () => <View style={styles.separator} />

export class RepositoryListContainer extends React.Component {
	renderHeader = () => {
		const { selectedOrdering, setSelectedOrdering, search, setSearch } = this.props

		return (
			<Header
				selectedOrdering={selectedOrdering}
				setSelectedOrdering={setSelectedOrdering}
				search={search}
				setSearch={setSearch}
			/>
		)
	}

	render() {
		const { repositories } = this.props

		const repositoryNodes = repositories
			? repositories.edges.map(edge => edge.node)
			: []

		return (
			<View>
				<FlatList
					data={repositoryNodes}
					ItemSeparatorComponent={ItemSeparator}
					renderItem={({ item }) => <RepositoryItem item={item} />}
					keyExtractor={item => item.id}
					ListHeaderComponent={this.renderHeader}
				/>
			</View>
		)
	}
}

const RepositoryList = () => {
	const [selectedOrdering, setSelectedOrdering] = useState({ orderBy: 'CREATED_AT', orderDirection: 'DESC' })
	const [search, setSearch] = useState('')
	const [searchValue] = useDebounce(search, 500)
	const { data, loading } = useRepositories({ ...selectedOrdering, searchKeyword: searchValue })

	if (loading) return <View style={{ justifyContent: 'center', flex: 1 }}><ActivityIndicator size='large' /></View>

	const repositories = data ? data.repositories : null

	return (
		<RepositoryListContainer 
			repositories={repositories} 
			selectedOrdering={selectedOrdering} 
			setSelectedOrdering={setSelectedOrdering} 
			search={search}
			setSearch={setSearch} 
		/>
	)
}

export default RepositoryList
