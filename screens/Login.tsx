import { SafeAreaView, View, Text, TextInput, Button } from 'react-native'
import * as React from 'react'
import { useNavigation } from '@react-navigation/native';
import { login, register } from '../utils/api';
import Auth from '../utils/auth';
import { Input, Icon } from '@rneui/themed';
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
   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
         dispatch({ type: ActionTypes.SET_LOADING, loading: true });

         const { token, user } = registration ? await register(formState) : await login({ email: formState.email, password: formState.password })

         Auth.login(token);

         dispatch({ type: ActionTypes.SET_CURRENT_USER, user: user });
         dispatch({ type: ActionTypes.SET_LOADING, loading: false });


      } catch (e) {

         dispatch({ type: ActionTypes.SET_ERROR, error: !!e });
         dispatch({ type: ActionTypes.SET_LOADING, loading: false });

      }
   };


   const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target;
      setFormState({
         ...formState,
         [name]: value,
      });
   };
   return (
      <SafeAreaView className="h-screen bg-slate-500 flex items-center justify-center">
         <View>
            <Text>Login</Text>
         </View>
      </SafeAreaView>
   )
}

export default Login