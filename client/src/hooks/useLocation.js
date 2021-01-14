import { useState, useEffect } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(false);

    useEffect(() => {
        let subscriber;
        const startWatching = async () => {
            const response = await requestPermissionsAsync();
            if (!response.granted) {
                setErr(err);
                return;
            }
            subscriber = await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            }, (location) =>  {
                callback(location)
            })
        }

        if (shouldTrack) {
            startWatching();
        } else {
            if (!subscriber) {
                return;
            } 
            subscriber.remove();
            subscriber = null;
        }
        return () => {
            if (subscriber) {
                subscriber.remove()
            }
        }
    }, [shouldTrack, callback])

    return [err];
}