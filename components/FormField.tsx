import React, {useState} from 'react';
import {View, Text, Input, TextInput, Keyboard, TouchableOpacity, Image} from "react-native";
import images from "@/constants/images";
import icons from "@/constants/icons";


const FormField = ({title,value,placeholder,handleChangeText,otherStyles}) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`{space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
            <View className="w-full flex-row h-16 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center">
                <TextInput secureTextEntry={title === "Password" && !showPassword} value={value} onChangeText={handleChangeText} placeholderTextColor="#7b7b8b" placeholder={placeholder} className="flex-1 p-2 text-white font-psemibold text-base"/>
                {title === "Password" && (<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image resizeMode="contain" className="w-6 h-6" source={showPassword ? icons.eye : icons.eyeHide}/>
                </TouchableOpacity>)}
            </View>
        </View>
    );
};

export default FormField;