import React, { useContext } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';

const TrackListScreen = ({ navigation }) => {
    const { fetchTracks, state } = useContext(TrackContext);
    const unsubscribe = navigation.addListener('focus', e => {
        fetchTracks()
      });
    return (
        <>
            <FlatList 
                data={state}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('TrackDetailScreen', { id: item._id })}>
                            <ListItem>
                                <ListItem.Content>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </TouchableOpacity> 
                    )
                }}
            />
        </>
    )
}

export default TrackListScreen;