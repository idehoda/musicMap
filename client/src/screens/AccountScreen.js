import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
    const { logout } = useContext(AuthContext)
    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text style={{ fontSize: 48}}>Account screen</Text>
            <Spacer>
                <Button title="Sign out" onPress={logout}/>
            </Spacer>
        </SafeAreaView>
    )
}

export default AccountScreen;