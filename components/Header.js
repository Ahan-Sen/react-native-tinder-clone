import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-rn"

const Header = ({ title, callEnabled }) => {
    const navigation = useNavigation();

    return (
        <View style={tw("p-2 flex-row justify-center justify-between mt-10")}>
            <View style={tw("flex flex-row items-center")}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={34} color={"#FF5864"} />
                </TouchableOpacity>
                <Text style={tw("text-2xl font-bold pl-2")}>{title}</Text>
            </View>

            {callEnabled && (
                <TouchableOpacity >
                    <Foundation name="telephone" size={20} color={"red"} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Header;
