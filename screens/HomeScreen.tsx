import { SafeAreaView, Text, Button } from 'react-native'
import * as React from 'react'
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
   const nav = useNavigation()

   React.useLayoutEffect(() => {
      nav.setOptions({
         headerShown: false
      })
   }, [])
   return (
      <SafeAreaView className="flex items-center justify-center bg-gray-200 p-2" >
         <Text className="text-red-500" > Open up App.js to stasdfart working on your app! Yo </Text>
         <Button
            title="Go to Chats"
            onPress={() => navigation.navigate('Chats')}
         />
      </SafeAreaView>
   );
}

export default HomeScreen