import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import HomeScreen from 'screens/HomeScreen';
import Chats from 'screens/Chats';
import Auth from './utils/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from 'screens/Profile';
import Login from 'screens/Login';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()
export default function App() {
  const [signedIn, setSignedIn] = React.useState<boolean>(false)
  async function getAuth() {
    let ah = await Auth.loggedIn()
    console.log(ah)
    setSignedIn(!!ah)
  }
  React.useLayoutEffect(() => {
    getAuth()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {signedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeTabs} />
            {/* <Stack.Screen name="Chats" component={Chats} /> */}
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />

        )}

      </Stack.Navigator>


      < StatusBar style="auto" />


    </NavigationContainer>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator>

      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}


