import { TextInput, Pressable, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Text from './Text'
import theme from '../theme'
import { useNavigate } from 'react-router-native'
import useCreateReview from '../hooks/useCreateReview'

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingTop: 20,
		backgroundColor: 'white',
		paddingBottom: 20
	},
	input: {
		height: 50,
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 15,
	},
	button: {
		backgroundColor: theme.colors.primary,
		paddingVertical: 15,
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
	},
	inputError: {
		borderColor: 'red',
	},
})

const initialValues = {
	repositoryOwner: '',
	repositoryName: '',
	rating: '',
	review: '',
}

const validationSchema = yup.object().shape({
	repositoryOwner: yup
		.string()
		.required('Repository owner name required'),
	repositoryName: yup
		.string()
		.required('Repository name is required'),
	rating: yup
		.number()
		.required('Rating is required')
		.min(0, 'Rating must be a value between 0 and 100')
		.max(100, 'Rating must be a value between 0 and 100'), 	
	review: yup
		.string()
})

const CreateReviewForm = ({ onSubmit }) => {
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	})

	return (
		<View style={styles.container}>
			<TextInput
				style={[styles.input, formik.touched.repositoryOwner && formik.errors.repositoryOwner && styles.inputError]}
				placeholder="Repository owner name"
				onChangeText={formik.handleChange('repositoryOwner')}
				value={formik.values.repositoryOwner}
				autoCapitalize="none"
			/>
			{formik.touched.repositoryOwner && formik.errors.repositoryOwner && (
				<Text style={{ color: '#d73a4a' }}>{formik.errors.repositoryOwner}</Text>
			)}
			<TextInput
				style={[styles.input, formik.touched.repositoryName && formik.errors.repositoryName && styles.inputError]}
				placeholder="Repository name"
				onChangeText={formik.handleChange('repositoryName')}
				value={formik.values.repositoryName}
				autoCapitalize="none"
			/>
			{formik.touched.repositoryName && formik.errors.repositoryName && (
				<Text style={{ color: '#d73a4a' }}>{formik.errors.repositoryName}</Text>
			)}
			<TextInput
				style={[styles.input, formik.touched.rating && formik.errors.rating && styles.inputError]}
				placeholder="Rating between 0 and 100"
				onChangeText={formik.handleChange('rating')}
				value={formik.values.rating}
				autoCapitalize="none"
			/>
			{formik.touched.rating && formik.errors.rating && (
				<Text style={{ color: '#d73a4a' }}>{formik.errors.rating}</Text>
			)}
			<TextInput
				style={styles.input}
				placeholder="Review"
				onChangeText={formik.handleChange('review')}
				value={formik.values.review}
				autoCapitalize="none"
				multiline
			/>
			<Pressable style={styles.button} onPress={formik.handleSubmit}>
				<Text style={styles.buttonText}>Create a review</Text>
			</Pressable>
		</View>
	)
}

const CreateReview = () => {
	const [create] = useCreateReview()
	const navigate = useNavigate()

	const onSubmit = async (values) => {
		const { repositoryOwner, repositoryName, rating, review } = values
		try {
			const { data } = await create({ repositoryOwner, repositoryName, rating, review })
			navigate(`/${data.createReview.repositoryId}`)
		} catch (error) {
			console.error(error)
		}
	}

	return <CreateReviewForm onSubmit={onSubmit} />
}

export default CreateReview
