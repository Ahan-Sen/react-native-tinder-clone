import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import ChatList from '../components/ChatList';
import Header from '../components/Header';

export default function ChatScreen() {

    const navigation = useNavigation()


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);


    return (
        <SafeAreaView>
            <Header title="Chat" />
            <ChatList />
        </SafeAreaView>
    )
}
