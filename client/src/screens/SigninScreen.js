import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninScreen = ({ navigation }) => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);
    const unsubscribe = navigation.addListener('blur', e => {
        clearErrorMessage()
      });

    return (
        <View style={styles.container}> 
            <AuthForm 
                headerText='Sign in'
                errorMessage={state.errorMessage}
                submitButtonText='Sign in'
                onSubmit={signin}
            />
            <NavLink
                clearErrorMessage={clearErrorMessage}
                routeName="SignupScreen"
                text="Don't have an account? Sign up instead!"
            />

        </View>
    ) 
}

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;