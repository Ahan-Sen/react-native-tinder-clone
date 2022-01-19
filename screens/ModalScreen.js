import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const ModalScreen = () => {
    const { user } = useAuth();
    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const incompleteForm = !image || !job || !age;

    const updateUserProfile = () =>{
        setDoc(doc(db, 'users', user.uid),{
            id: user.uid,
            displayName:user.displayName,
            photoURL: image,
            job: job,
            age: age,
            timestamp: serverTimestamp()
        }).then(()=>{
            navigation.navigate('Home')
        }).catch((err)=>{
            alert(error.message)
        })
    }

    return (
        <View style={tw("flex-1 items-center pt-1")}>
            <Image
                style={tw("h-20 w-full")}
                resizeMode="contain"
                source={{ uri: "https://links.papareact.com/2pf" }}
            />
            <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
                Welcome {user && user.displayName}
            </Text>

            <Text style={tw("text-center p-4 font-bold text-red-400")}>
                Step-1: The Profile Pic
            </Text>
            <TextInput
                style={tw("text-center text-xl pb-2")}
                value={image}
                onChangeText={(text) => setImage(text)}
                placeholder="Enter a Profile Pic URL"
            />
            <Text style={tw("text-center p-4 font-bold text-red-400")}>
                Step-2: The Job
            </Text>
            <TextInput
                style={tw("text-center text-xl pb-2")}
                value={job}
                onChangeText={(text) => setJob(text)}
                placeholder="Enter your occupation"
            />
            <Text style={tw("text-center p-4 font-bold text-red-400")}>
                Step-3: The Age
            </Text>
            <TextInput
                style={tw("text-center text-xl pb-2")}
                value={age}
                onChangeText={(text) => setAge(text)}
                placeholder="Enter your age"
                maxLength={2}
                keyboardType="numeric"
            />

            <TouchableOpacity
                disabled={incompleteForm}
                style={[tw("w-64 p-3 rounded-xl absolute bottom-10"),
                    incompleteForm? tw("bg-gray-400"): tw("bg-red-400")
                ]}
                onPress={updateUserProfile}
            >
                <Text style={tw("text-center text-white text-xl")}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    );
};;

export default ModalScreen;
