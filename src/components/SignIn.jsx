import { TextInput, Pressable, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Text from './Text'
import theme from '../theme'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
})

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.touched.username && formik.errors.username && styles.inputError]}
        placeholder="Username"
        onChangeText={formik.handleChange('username')}
        value={formik.values.username}
        autoCapitalize="none"
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[styles.input, formik.touched.password && formik.errors.password && styles.inputError]}
        placeholder="Password"
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        secureTextEntry
        autoCapitalize="none"
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
	const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      const {data} = await signIn({ username, password })
      console.log(data)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return <SignInForm onSubmit={onSubmit} />
}

export default SignIn
