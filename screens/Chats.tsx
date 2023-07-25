import { SafeAreaView, Text, Button } from 'react-native'
import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SearchBar } from '@rneui/themed';
const Chats = ({ navigation }) => {
   const nav = useNavigation()
   const [search, setSearch] = React.useState<string>("");
   React.useLayoutEffect(() => {
      nav.setOptions({
         headerShown: false
      })
   }, [])
   const updateSearch = (search) => {
      setSearch(search);
   };
   return (
      <SafeAreaView className="  bg-gray-200  h-screen" >
         <SearchBar
            placeholder="Search For Users"
            onChangeText={updateSearch}
            value={search}
         />
         {/* <Button
            title="Go to Home"
            onPress={() => navigation.navigate('Home')}
         /> */}
      </SafeAreaView>
   )
}

export default Chats