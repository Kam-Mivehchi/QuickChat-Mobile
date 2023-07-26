import { SafeAreaView, Text, Button, View } from 'react-native'
import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SearchBar } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux'
import { ActionTypes, AppState } from "../utils/redux/reducers"
import { getAllChats } from '../utils/api';
import ChatCard from 'components/chatCard';
const Chats = ({ navigation }) => {
   const nav = useNavigation()
   const [search, setSearch] = React.useState<string>("");
   const dispatch = useDispatch()
   const state = useSelector(state => state) as AppState


   React.useEffect(() => {
      const getMoviesFromApiAsync = async () => {
         try {
            dispatch({ type: ActionTypes.SET_LOADING, loading: true });
            const chats = await getAllChats();
            console.log(state.allChats)
            dispatch({ type: ActionTypes.SET_ALL_CHATS, chatroom: [...chats] });

            console.log(state.allChats)


            dispatch({ type: ActionTypes.SET_LOADING, loading: false });

            dispatch({ type: ActionTypes.SET_CURRENT_CHAT, chatroom: {} })

         } catch (error) {
            console.error(error);
         }
      };
      getMoviesFromApiAsync()

   }, [])

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
         {state.allChats.map((chat: IChatroom) => {

            return (
               <ChatCard key={chat._id} chatroom={chat} />

            )
         })}
      </SafeAreaView>
   )
}

export default Chats