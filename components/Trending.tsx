import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Image, ImageBackground, TouchableOpacity, View} from "react-native";
import {useVideoPlayer} from "expo-video";
import icons from "@/constants/icons";
import {ResizeMode, Video} from "expo-av";

const TrendingItem = ({item}) => {
    const [play, setPlay] = useState(false)

    return (
        <View className="mr-5">
            {play ? (
                    <Video
                        onError={(e) => console.log(e)}
                        className="w-52 h-72 rounded-[15px] shadow-lg overflow-hidden shadow-black/10"
                        source={{
                            uri: item.video,
                        }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        onPlaybackStatusUpdate={status => {
                            if (status.didJustFinish) {
                                setPlay(false)
                            }
                        }}
                    />
                ) :
                <TouchableOpacity className="relative items-center justify-center" onPress={()=> setPlay(true)} activeOpacity={0.7}>
                    <ImageBackground source={{uri:item.thumbnail}} className="w-52 shadow-lg overflow-hidden rounded-[15px] shadow-black/40 h-72" resizeMode="cover" />
                    <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain"/>
                </TouchableOpacity>
            }
        </View>
    )
}
const Trending = ({posts}) => {
    return (
        <FlatList horizontal data={posts} renderItem={({item}) => (
            <TrendingItem item={item}/>
        )}/>
    );
};

export default Trending;