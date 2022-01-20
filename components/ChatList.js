import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-rn";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import ChatRow from "./ChatRow";
import { db } from "../firebase";

const ChatList = () => {
    const [matches, setmatches] = useState(0);

    const {user} = useAuth()

    useEffect(() => 
        onSnapshot(
            query(
                collection(db, "matches"),
                where("usersMatched", "array-contains", user.uid)
            ),
            (snapshot) =>
                setmatches(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                )
        ),
        [user]

    );

    return (
        matches.length > 0 ? (

        <FlatList
        style={tw('h-full')} 
        data={matches}
        keyExtractor={item => item.id}
        renderItem={({item})=> <ChatRow matchDetails={item} />}
        />

        ):(
            <View style={tw('p-5')}>
                <Text style={tw('text-center text-lg')}> No matches at the moment</Text>
            </View>
        )
    );
};

export default ChatList;
