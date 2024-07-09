import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import icons from "@/constants/icons";
import {ResizeMode, Video} from "expo-av";

const VideoCard = ({video: {title, thumbnail, video, user: {username, avatar}}}) => {
    const [play,setPlay] = useState(false)
    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg justify-center items-center p-0.5">
                        <Image source={{uri: avatar}} className="w-full h-full rounded-lg" resizeMode="cover"/>
                    </View>
                    <View className="justify-center gap-y-1 flex-1 ml-3">
                        <Text numberOfLines={1} className="text-sm text-white font-psemibold">{title}</Text>
                        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                            {username}
                        </Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image source={icons.menu} resizeMode="contain" className="w-5 h-5"/>
                </View>
            </View>
            {play ? (
                <View className="w-full h-60 mt-3">
                <Video source={{uri:video}} resizeMode={ResizeMode.CONTAIN} className="w-full h-60 mt-3" shouldPlay={true} useNativeControls={true} onPlaybackStatusUpdate={(status)=>{
                    if (status.didJustFinish) {
                        setPlay(false)
                    }
                }}/>
            </View>):(<TouchableOpacity activeOpacity={0.7} onPress={()=> setPlay(true)} className="w-full h-60 mt-3 justify-center relative items-center">
                <Image source={{uri:thumbnail}} className="w-full h-full rounded-xl mt-3" resizeMode="cover"/>
                <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain"/>
            </TouchableOpacity>)}
        </View>
    );
};

export default VideoCard;