import React, { useContext} from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';

const TrackListScreen = ({ navigation }) => {
    const { state, signup } = useContext(AuthContext);
    return (
        <>
            <Text style={{ fontSize: 48}}> TrackList screen </Text>
            <Button 
                title="Go on track detail" 
                onPress={() => navigation.navigate('TrackDetailScreen')}
            />
        </>
    )
}

const styles = StyleSheet.create({})

export default TrackListScreen;