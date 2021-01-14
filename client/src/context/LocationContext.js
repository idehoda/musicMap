import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_LOCATION':
            return { ...state, locations: [...state.locations, action.payload] };
        case 'SET_CURRENT_LOCATION':
            return { ...state, currentLocation: action.payload };
        case 'START_RECORDING':
            return { ...state, recording: true };
        case 'STOP_RECORDING':
            return { ...state, recording: false };
        case 'CHANGE_NAME':
            return { ...state, name: action.payload };
        case 'RESET':
            return { ...state, name: '', locations: [] };
    
        default:
            return state;
    }
}

const reset = dispatch => (name) => {
    dispatch({ type: 'RESET' })
};
const changeName = dispatch => (name) => {
    dispatch({ type: 'CHANGE_NAME', payload: name })
};
const startRecording = dispatch => () => {
    dispatch({ type: 'START_RECORDING'})
};
const stopRecording = dispatch => () => {
    dispatch({ type: 'STOP_RECORDING'})
};
const addLocation = dispatch => (location, recording) => {
    dispatch({ type: 'SET_CURRENT_LOCATION', payload: location})
    if (recording) {
        dispatch({ type: 'ADD_LOCATION', payload: location})
    }
};

export const { Context, Provider } = createDataContext(
    locationReducer,
    { startRecording, stopRecording, addLocation, changeName, reset},
    { recording: false, locations: [], currentLocation: null, name: ''}
)