import { SafeAreaView, View, Text, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import * as React from 'react'
import { useNavigation } from '@react-navigation/native';
import { login, register } from '../utils/api';
import Auth from '../utils/auth';
import { Input, Icon, Button } from '@rneui/themed';
import { useSelector, useDispatch, } from 'react-redux'
import { ActionTypes, AppState } from "../utils/redux/reducers"
import { AppDispatch } from "../utils/redux/store";

const Login = () => {
   const nav = useNavigation()
   const [formState, setFormState] = React.useState({ email: '', password: '', username: '' });
   const [confirm, setConfirm] = React.useState<string>("");
   const dispatch = useDispatch<AppDispatch>()
   const state = useSelector(state => state) as AppState
   const [registration, setRegistration] = React.useState<boolean>(false)
   const [spin, setSpin] = React.useState<boolean>(false)

   React.useLayoutEffect(() => {
      nav.setOptions({
         headerShown: false
      })
   }, [])
   const handleFormSubmit = async () => {
      // event.preventDefault();
      try {
         dispatch({ type: ActionTypes.SET_LOADING, loading: true });

         const { token, user } = await login({ email: formState.email, password: formState.password })

         Auth.login(token);

         dispatch({ type: ActionTypes.SET_CURRENT_USER, user: user });
         dispatch({ type: ActionTypes.SET_LOADING, loading: false });

         console.log("working")

      } catch (e) {

         dispatch({ type: ActionTypes.SET_ERROR, error: !!e });
         dispatch({ type: ActionTypes.SET_LOADING, loading: false });
         console.log(e)
      }
   };



   return (
      <SafeAreaView className="h-screen bg-slate-700 flex items-center justify-center ">
         <Text className='text-6xl text-white font-bold'>Login</Text>

         <View className='w-full p-16'>

            <Input
               placeholder='john_smith@example.com'
               className='w-full text-white'
               label="Email"
               onChangeText={newText => setFormState({
                  ...formState,
                  email: newText,
               })}
               inputStyle={{ color: "#FFF" }}
            />
            <Input placeholder="Password"
               secureTextEntry={true}
               label="Password"
               onChangeText={newText => setFormState({
                  ...formState,
                  password: newText,
               })}
               inputStyle={{ color: "#FFF" }}

            />

            {/* <Input
            // containerStyle={{}}
            // // disabledInputStyle={{ background: "#ddd" }}
            // inputContainerStyle={{}}
            // errorMessage="Oops! that's not correct."
            // errorStyle={{}}
            // errorProps={{}}
            // label="User Form"
            // labelStyle={{}}
            // labelProps={{}}
            // leftIcon={<Icon name="account-outline" size={20} />}
            // leftIconContainerStyle={{}}
            // rightIcon={<Icon name="close" size={20} />}
            // rightIconContainerStyle={{}}
            // placeholder="Enter Name"
            /> */}
            <Button

               title="Log in"
               loading={state.isLoading}
               loadingProps={{ size: 'small', color: 'white' }}
               buttonStyle={{
                  backgroundColor: 'black',
                  borderWidth: 2,
                  borderColor: 'white',
                  borderRadius: 30,


               }}
               containerStyle={{
                  marginVertical: 10,

               }}
               titleStyle={{ fontWeight: 'bold' }}
               onPress={handleFormSubmit}
            />


         </View>
      </SafeAreaView>
   )
}

export default Login