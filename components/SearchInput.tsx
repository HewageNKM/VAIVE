import React, {useState} from 'react';
import {Alert, Image, TextInput, TouchableOpacity, View} from "react-native";
import icons from "@/constants/icons";
import {router, usePathname} from "expo-router";


const SearchInput = ({initialQuery}) => {
    const pathName = usePathname()
    const [query, setQuery] = useState(initialQuery || "")
    return (
        <View
            className="w-full space-x-4 flex-row h-16 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center">
            <TextInput value={query} onChangeText={(e) => setQuery(e)} placeholderTextColor="#CDCDE0"
                       placeholder="Search for a video topic"
                       className="flex-1 text-base mt-0.5 p-2 font-pregular text-white"/>
            <TouchableOpacity className="mr-3" onPress={() => {
                if (!query) {
                    return Alert.alert("Error", "Please enter a search query")
                }
                if (pathName.startsWith("/search")) {
                    router.setParams({query})
                } else {
                    router.push(`/search/${query}`)
                }
            }}>
                <Image resizeMode="contain" className="w-5 h-5" source={icons.search}/>
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;