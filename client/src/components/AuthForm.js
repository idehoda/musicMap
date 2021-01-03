import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Spacer from './Spacer';
import { Text, Button, Input } from 'react-native-elements';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
            <Input
                autoCorrect={false}
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                label="Email" 
            />
            <Input
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                label="Password" 
            />
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <Spacer >
                <Button 
                    title={submitButtonText}
                    onPress={() => onSubmit({ email, password })}
                /> 
            </Spacer>
        </>
    )
}

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginHorizontal: 10,
        textAlign: 'center'
    }
})

export default AuthForm;