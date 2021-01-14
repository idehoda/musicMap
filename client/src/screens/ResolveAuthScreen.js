import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { Text } from 'react-native'

const ResolveAuthScreen = () => {
    const { tryLocalSignIn } = useContext(AuthContext);
    console.log('auth...')
    useEffect(() => {
        tryLocalSignIn();
    }, [])
    return null;
}

export default ResolveAuthScreen;
