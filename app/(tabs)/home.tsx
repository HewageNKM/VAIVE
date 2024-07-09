import React, {useState} from 'react';
import {FlatList, Image, RefreshControl, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import {getAllPosts, getLatestPosts} from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";

const Home = () => {
    const {data: posts, refetch} = useAppwrite(getAllPosts)
    const {data: latestPost} = useAppwrite(getLatestPosts)
    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = () => async () => {
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
    }
    console.log(latestPost)
    return (
        <SafeAreaView className="h-full bg-primary">
            <FlatList data={posts} keyExtractor={(item) => item.$id} ListHeaderComponent={() => (
                <View className='my-6 px-4 space-y-6'>
                    <View className="justify-between items-center flex-row mb-6">
                        <View>
                            <Text className="font-pmedium text-sm text-gray-100">
                                Welcome back,
                            </Text>
                            <Text className="text-2xl text-white font-psemibold">
                                User
                            </Text>
                        </View>
                        <View className="mt-1.5">
                            <Image source={images.logoSmall} resizeMode="contain" className="w-9 h-10"/>
                        </View>
                    </View>
                    <SearchInput/>
                    <View className="w-full flex-1 pt-5 pb-8">
                        <Text className="text-lg mb-3 font-pregular text-gray-100">Latest Videos</Text>
                        <Trending posts={latestPost ?? []}/>
                    </View>
                </View>
            )} renderItem={({item}) => (<VideoCard video={item} key={item.$id}/>)} ListEmptyComponent={() => (
                <EmptyState title="No Videos Found" subTitle="Be First One to Upload"/>
            )} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            </FlatList>
        </SafeAreaView>
    );
};

export default Home;