import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate, useParams } from 'react-router-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import SignIn from './SignIn'
import SignOut from './SignOut'
import SignUp from './SignUp'
import SingleRepository from './SingleRepository'
import CreateReview from './CreateReview'
import MyReviews from './MyReviews'

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1,
		backgroundColor: '#e1e4e8'
	},
})

const RepositoryWrapper = () => {
	const { id } = useParams()
	return <SingleRepository id={id} />
}

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			<Routes>
				<Route path="/" element={<RepositoryList />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signout" element={<SignOut />} />
				<Route path="*" element={<Navigate to="/" replace />} />
				<Route path=":id" element={<RepositoryWrapper />} />
				<Route path="/createreview" element={<CreateReview />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/myreviews" element={<MyReviews />} />
			</Routes>
		</View>
	)
}

export default Main