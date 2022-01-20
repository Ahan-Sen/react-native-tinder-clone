import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'tailwind-rn'

const MatchedScreen = () => {

    const navigation = useNavigation();
    const {params} = useRoute()

    const {loggedInProfile , userswiped } = params

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);



    return (
        <View style={[tw('h-full bg-red-500 pt-20'),{opacity: 0.89}]}>
            <View style={tw('justify-center px-10 pt-20')}>
                <Image 
                style={tw('h-20 w-full')}
                source={{uri:"https://links.papareact.com/mg9"}} />
            </View>

            <Text style={tw('text-white text-center mt-3')}>
                You and {userswiped.displayName} have liked each other.
            </Text>
            <View style={tw('flex-row justify-evenly mt-5')}>
                <Image 
                style={tw("h-32 w-32 rounded-full")}
                source={{uri:loggedInProfile.photoURL}}
                />
                <Image 
                style={tw("h-32 w-32 rounded-full")}
                source={{uri:userswiped.photoURL}}
                />
            </View>

            <TouchableOpacity 
            style={tw('bg-white m-5 px-10 py-8 rounded-full mt-20')}
            onPress = {()=> {
                navigation.goBack()
                navigation.navigate("Chat")
            }}
            >
                <Text style={tw('text-center')}>Send a Message</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MatchedScreen;
