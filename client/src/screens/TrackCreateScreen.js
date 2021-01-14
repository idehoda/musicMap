import '../_mockLocation'
import React, { useContext, useCallback } from 'react';
import { Text } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as LocationContext } from '../context/LocationContext';
import Map from '../components/Map';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';

const TrackCreateScreen = ({ navigation }) => {
    const isFocused =  useIsFocused();
    const { addLocation, state } = useContext(LocationContext);
    const callback = useCallback((location) => {
        addLocation(location, state.recording)
    }, [state.recording]);

    const [err] = useLocation(isFocused || state.recording, callback);

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Map />
            { err ? <Text>Please enable location services</Text> : null }
            <TrackForm />
        </SafeAreaView>
    )
}

export default TrackCreateScreen;