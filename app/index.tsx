import React from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Image, ScrollView, Text, View} from "react-native";
import images from "@/constants/images";
import CustomButton from "@/components/CustomButton";
import {StatusBar} from "expo-status-bar";
import {Redirect, router} from "expo-router";
import {useGlobalContext} from "@/context/GlobalProvider";

const Index = () => {
   const {isLoading,isLoggedIn} = useGlobalContext();
    if (!isLoading && isLoggedIn) return <Redirect href="/home"/>;
    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView contentContainerStyle={{height:'100%'}}>
                <View className="w-full justify-center items-center h-full px-4">
                    <Image source={images.logo} resizeMode="contain" className="w-[150px] h-[100px]"/>
                    <Image source={images.cards} className="max-w-[400px] w-full h-[300px]" resizeMode="contain"/>
                    <View className="relative mt-5">
                        <Text className="text-3xl text-center text-white font-bold">Discover Endless Visual Possibilities with <Text className="text-secondary-200">VAIVE</Text></Text>
                        <Image source={images.path} className="w-[138px] absolute bottom-0 -right-5 h-[15px]" resizeMode='contain'/>
                    </View>
                    <CustomButton handlePress={()=>router.push('/sign-in')} title="Get Started" isLoading={false} containerStyles="w-full mt-7"/>
                </View>
            </ScrollView>
            <StatusBar style="light" backgroundColor="#161622"/>
        </SafeAreaView>
    );
};

export default Index;