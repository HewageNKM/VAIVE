import React from 'react';
import {Text, View} from "react-native";

const InfoBox = ({title,containerStyles,subtitle,titleStyles}) => {
    return (
        <View className={containerStyles}>
            <Text className={`${titleStyles} text-white text-center font-psemibold`}>{title}</Text>
            <Text className="font-pregular text-sm text-gray-100">{subtitle}</Text>
        </View>
    );
};

export default InfoBox;