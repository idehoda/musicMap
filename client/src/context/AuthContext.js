import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ERROR':
            return { ...state, errorMessage: action.payload }
        case 'SIGNIN':
            return { errorMessage: '',  token: action.payload }
        case 'LOGOUT':
            return { token: null, errorMessage: ''}
        case 'CLEAR_ERROR_MESSAGE':
            return { ...state, errorMessage: '' }
        default: 
            return state
    }
}

const tryLocalSignIn = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'SIGNIN', payload: token });
        navigate('TrackListScreen');
    } else {
        navigate('SignupScreen')
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
}
const signup = (dispatch) => async ({ email, password }) => {
    try {
        const response = await trackerApi.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'SIGNIN', payload: response.data.token });
        navigate('TrackListScreen');
    } catch (error) {
        dispatch({ type: 'ADD_ERROR', payload: error.response.data })
        console.log('signup error!', error.response.data)
    }
}

const signin = (dispatch) => async ({ email, password }) => {
    try {
        const response = await trackerApi.post('/login', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'SIGNIN', payload: response.data.token });
        navigate('TrackListScreen');
    } catch (error) {
        dispatch({ type: 'ADD_ERROR', payload: error.response.data })
        console.log('signup error!', error.response.data)
    }
}

const logout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('SignupScreen')
}

export const { Context, Provider } = createDataContext(
    authReducer,
    { signup, signin, clearErrorMessage, tryLocalSignIn, logout },
    { token: null, errorMessage: '' }
);