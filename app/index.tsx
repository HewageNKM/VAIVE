import React from 'react';
import {View} from "react-native";
import {Link} from "expo-router";

const Index = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <Link href="/home"> Go To Home</Link>
        </View>
    );
};

export default Index;