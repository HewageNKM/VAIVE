import React from 'react';
import {Image, Text, View} from "react-native";
import {Tabs} from "expo-router";
import icons from "@/constants/icons";

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className="justify-center items-center">
            <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6"/>
            <Text className={`${focused ? 'font-bold': 'font-normal'} text-xs`} style={{color:color}}>{name}</Text>
        </View>
    )
}
const TabsLayout = () => {
    return (
        <>
            <Tabs screenOptions={{tabBarShowLabel:false,headerShown:false,tabBarActiveTintColor:"#ef2828",tabBarInactiveTintColor:"#ffd2d2", tabBarStyle: {backgroundColor:"#0F181E"}}}>
                <Tabs.Screen name="home" options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon icon={icons.home} color={color} focused={focused} name="Home"/>)
                }}/>
                <Tabs.Screen name="create" options={{
                    title: "Create",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon icon={icons.home} color={color} focused={focused} name="Create"/>)
                }}/>
                <Tabs.Screen name="bookmark" options={{
                    title: "bookmark",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon icon={icons.bookmark} color={color} focused={focused} name="Bookmark"/>)
                }}/>
                <Tabs.Screen name="profile" options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon icon={icons.profile} color={color} focused={focused} name="Profile"/>)
                }}/>
            </Tabs>
        </>
    );
};

export default TabsLayout;