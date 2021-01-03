import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ERROR':
            return { ...state, errorMessage: action.payload }
        case 'SIGNUP':
            return { errorMessage: '',  token: action.payload }
        default: 
            return state
    }
}

const signup = (dispatch) => async ({ email, password }) => {
    try {
        console.log('emailsdf', email, password)
        const response = await trackerApi.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'SIGNUP', payload: response.data.token });
        navigate('TrackListScreen')
    } catch (error) {
        dispatch({ type: 'ADD_ERROR', payload: error.response.data })
        console.log('signup error!', error.response.data)
    }
}
const signin = (dispatch) => ({ email, password }) => {}
const signout = (dispatch) => () => {}

export const { Context, Provider } = createDataContext(
    authReducer,
    { signup, signin, signout },
    { token: null, errorMessage: '' }
);