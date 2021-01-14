import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_TRACKS':
            return action.payload
        default:
            return state;
    }
}

const fetchTracks = dispatch => async () => {
    try {
        const response = await trackerApi.get('/tracks');
        dispatch({ type: 'FETCH_TRACKS', payload: response.data })
    } catch (error) {
        console.log('fetchTracks api error', error)
    }
};
const createTrack = dispatch => async (name, locations) => {
    try {
        const response = await trackerApi.post('/tracks', { name, locations });
        console.log('createTrack api response', response)
    } catch (error) {
        console.log('createTrack api error', error)
    }
};

export const { Context, Provider } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack },
    []
)