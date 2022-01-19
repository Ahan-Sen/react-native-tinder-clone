import { useNavigation } from "@react-navigation/native";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    View,
    Text,
    Button,
    SafeAreaView,
    TouchableOpacity,
    Image,
    StyleSheet,
} from "react-native";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";


const HomeScreen = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const swipeRef = useRef(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useLayoutEffect(
        () =>
            onSnapshot(doc(db, "users", user.uid), (snapshot) => {
                if (!snapshot.exists()) {
                    navigation.navigate("Modal");
                }
            }),
        []
    );

    useEffect(() => {
        let unsub;

        const fetchCards = async () => {
            unsub = onSnapshot(collection(db, "users"), (snapshot) => {
                setProfiles(
                    snapshot.docs.filter(doc => doc.id !== user.uid).map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
            });
        };
        fetchCards();
        return unsub;
    },[]);

    return (
        <SafeAreaView style={tw("mt-10 flex-1")}>
            <View style={tw("items-center relative")}>
                <TouchableOpacity style={tw("absolute left-5 top-3")} onPress={logout}>
                    <Image
                        style={tw("h-10 w-10 rounded-full")}
                        source={{
                            uri:
                                user && user.photoURL
                                    ? user.photoURL
                                    : "https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg",
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
                    <Image
                        style={tw("h-14 w-14")}
                        source={{
                            uri: "https://logos-world.net/wp-content/uploads/2020/09/Tinder-Emblem.png",
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={tw("absolute right-5 top-3")}
                    onPress={() => navigation.navigate("Chat")}
                >
                    <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
                </TouchableOpacity>
            </View>

            <View style={tw("flex-1")}>
                <Swiper
                    ref={swipeRef}
                    containerStyle={{ backgroundColor: "transparent" }}
                    cards={profiles}
                    stackSize={5}
                    cardIndex={0}
                    animateCardOpacity
                    verticalSwipe={false}
                    onSwipedLeft={() => {
                        console.log("Swipe PASS");
                    }}
                    onSwipedRight={() => {
                        console.log("Swipe Match");
                    }}
                    backgroundColor="#4FD0E9"
                    overlayLabels={{
                        left: {
                            title: "NOPE",
                            style: {
                                label: {
                                    textAlign: "right",
                                    color: "red",
                                },
                            },
                        },
                        right: {
                            title: "Match",
                            style: {
                                label: {
                                    color: "#4DED30",
                                },
                            },
                        },
                    }}
                    renderCard={(card) =>
                        card ? (
                            <View
                                key={card.id}
                                style={tw("bg-white h-3/4 rounded-xl relative")}
                            >
                                <Image
                                    style={tw("absolute top-0 h-full w-full rounded-xl")}
                                    source={{ uri: card.photoURL }}
                                />
                                <View
                                    style={[
                                        tw(
                                            "absolute bottom-0 bg-white w-full h-20 flex-row justify-between items-center px-6 py-2 rounded-b-xl"
                                        ),
                                        styles.cardShadow,
                                    ]}
                                >
                                    <View>
                                        <Text style={tw("text-xl font-bold")}>
                                            {card.firstName} {card.lastName}
                                        </Text>
                                        <Text>{card.job}</Text>
                                    </View>
                                    <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                                </View>
                            </View>
                        ) : (
                            <View
                                style={[
                                    tw(
                                        "relative bg-white h-3/4 rounded-xl justify-center items-center"
                                    ),
                                    styles.cardShadow,
                                ]}
                            >
                                <Text style={tw("font-bold pb-5")}>No More Cards</Text>
                                <Image
                                    style={tw("h-20 w-full")}
                                    height={100}
                                    width={200}
                                    source={{
                                        uri: "http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/loudly-crying-face.png",
                                    }}
                                />
                            </View>
                        )
                    }
                />
            </View>
            <View style={tw("flex-row justify-evenly mb-5")}>
                <TouchableOpacity
                    style={tw(
                        "items-center justify-center rounded-full w-16 h-16 bg-red-200"
                    )}
                    onPress={() => swipeRef.current.swipeLeft()}
                >
                    <Entypo name="cross" size={24} color={"red"} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw(
                        "items-center justify-center rounded-full w-16 h-16 bg-green-200"
                    )}
                    onPress={() => swipeRef.current.swipeRight()}
                >
                    <AntDesign name="heart" size={24} color={"green"} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
});
