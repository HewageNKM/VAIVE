import React, {useState} from 'react';
import {Image, TextInput, TouchableOpacity, View} from "react-native";
import icons from "@/constants/icons";


const SearchInput = ({value, handleChangeText, otherStyles}) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className="w-full space-x-4 flex-row h-16 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center">
            <TextInput value={value} onChangeText={handleChangeText} placeholderTextColor="#7b7b8b" placeholder="Search for a video topic" className="flex-1 text-base mt-0.5 p-2 font-pregular text-white"/>
            <TouchableOpacity className="mr-3">
                <Image resizeMode="contain" className="w-5 h-5" source={icons.search}/>
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;