import { View, Text } from 'react-native'
import { Avatar, Badge, Icon, withBadge } from '@rneui/themed';
import React from 'react'
import dayjs from "dayjs"

import { useDispatch, useSelector } from 'react-redux'
import { ActionTypes, AppState } from "../utils/redux/reducers"
import { AppDispatch } from "../utils/redux/store";
const chatCard = ({ chatroom }: { chatroom: IChatroom }) => {
   const dispatch = useDispatch<AppDispatch>()
   const state = useSelector(state => state) as AppState

   return (
      <View>
         <Text>chatCard</Text>
         <Badge status="success" />
         <View>
            <Avatar
               rounded
               source={{
                  uri: chatroom.members[0].avatar,
               }}
               size="large"
            />

         </View>
         <View>
            <Text>{chatroom.lastMessage
               ?
               chatroom.lastMessage.content
               :
               "No Messages"}</Text>
         </View>
         <View>
            <Text>

               {dayjs(chatroom.updatedAt).format(" h:mm a")}
            </Text>

         </View>
      </View>
   )
}

export default chatCard