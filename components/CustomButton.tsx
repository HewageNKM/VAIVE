import React from 'react';
import {Text, TouchableOpacity} from "react-native";

const CustomButton = ({title,handlePress,isLoading,containerStyles,textStyle}) => {
    return (
        <TouchableOpacity disabled={isLoading} onPress={handlePress} className={`bg-secondary rounded-xl px-2 py-1 min-h-[62px] justify-center items-center ${containerStyles} ${isLoading? 'opacity-50': ''}`}>
            <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;