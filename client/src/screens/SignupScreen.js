import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    return (
        <View style={styles.container}> 
            <AuthForm 
                headerText='Sign up for tracker'
                errorMessage={state.errorMessage}
                submitButtonText='Sign up'
                onSubmit={signup}
            />
            <NavLink 
                clearErrorMessage={clearErrorMessage}
                routeName="SigninScreen"
                text="Already have an account? Sign in instead!"
            />

        </View>
    ) 
}

SignupScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 100
    }
})

export default SignupScreen;