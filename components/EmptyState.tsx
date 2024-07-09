import React from 'react';
import {Image, Text, View} from "react-native";
import images from "@/constants/images";
import CustomButton from "@/components/CustomButton";
import {router} from "expo-router";

const EmptyState = ({title,subTitle}) => {
    return (
        <View className="items-center px-4 justify-center">
            <Image source={images.empty} className="w-[270px] h-[215px]" resizeMode="contain"/>
            <Text className="text-2xl text-white font-psemibold">
                {title}
            </Text>
            <Text className="font-pmedium text-sm text-gray-100">
                {subTitle}
            </Text>
            <CustomButton title="Create a Video" containerStyles="w-full my-5" handlePress={()=> router.push('/create')}/>
        </View>
    );
};

export default EmptyState;