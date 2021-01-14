import React from 'react';

import { Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { navigationRef } from './src/navigationRef';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



// const switchNavigator = createSwitchNavigator({
//   ResolveAuthScreen, 
//   loginFlow: createStackNavigator({
//     SignupScreen,
//     SigninScreen,
//   }),
//   mainFlow: createBottomTabNavigator({
//     TrackListFlow,
//     TrackCreateScreen,
//     AccountScreen
//   })
// })

const TrackListFlow = () => (
  <Stack.Navigator>
    <Stack.Screen name="TrackListScreen" component={TrackListScreen} options={{ disp }}/>
    <Stack.Screen name="TrackDetailScreen" component={TrackDetailScreen} />
  </Stack.Navigator>
);

const LoginFlow = () => (
  <Stack.Navigator>
    <Stack.Screen name="SignupScreen" component={SignupScreen} />
    <Stack.Screen name="SigninScreen" component={SigninScreen} />
  </Stack.Navigator>
);

const MainFlow = () => (
  <Tab.Navigator>
    <Tab.Screen name="TrackListFlow" component={TrackListFlow} />
    <Tab.Screen name="TrackCreateScreen" component={TrackCreateScreen} />
    <Tab.Screen name="AccountScreen" component={AccountScreen} />
  </Tab.Navigator>
);
const A = ({ navigation }) => <Button title="a screen" onPress={() => navigation.navigate('B')} />
const B = ({ navigation }) => <Button title="b screen" onPress={() => navigation.navigate('A')} />

const App = () => (
  <SafeAreaProvider>
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {/* <Stack.Screen name="A" component={A} />
        <Stack.Screen name="B" component={B} /> */}
        <Stack.Screen name="ResolveAuthScreen" component={ResolveAuthScreen} />
        <Stack.Screen name="LoginFlow" component={LoginFlow} />
        <Stack.Screen name="MainFlow" component={MainFlow} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
)

export default () => (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
)
