import React from 'react';
import {FlatList, Image, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import {getUserPosts, signOut} from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import {useGlobalContext} from "@/context/GlobalProvider";
import icons from "@/constants/icons";
import InfoBox from "@/components/InfoBox";
import {router} from "expo-router";

const Profile = () => {
    const {user, setUser, setIsLoggedIn} = useGlobalContext();
    const {data: posts, refetch} = useAppwrite(getUserPosts, user?.$id)
    const logout = async () => {
        await signOut()
        setUser(null)
        setIsLoggedIn(false)

        router.replace('/sign-in')
    }
    return (
        <SafeAreaView className="h-full bg-primary">
            <FlatList data={posts ?? []} keyExtractor={(item) => item.$id} ListHeaderComponent={() => (
                <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
                    <TouchableOpacity onPress={logout} className="w-full items-end mb-10">
                        <Image source={icons.logout} resizeMode="contain" className='w-6 h-6'/>
                    </TouchableOpacity>
                    <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                        <Image className="w-[90%] h-[90%]" resizeMode="cover" source={{uri: user?.avatar}}/>
                    </View>
                    <InfoBox title={user?.username || "User"} containerStyles="mt-5" titleStyles="text-lg"/>
                    <View className="mt-5 flex-row">
                        <InfoBox title={posts?.length || 0} subtitle="Posts" containerStyles="mr-10"
                                 titleStyles="text-xl"/>
                        <InfoBox title="1.4k" subtitle="Followers" titleStyles="text-xl"/>
                    </View>
                </View>
            )} renderItem={({item}) => (<VideoCard video={item} key={item.$id}/>)} ListEmptyComponent={() => (
                <EmptyState title="No Videos Found" subTitle={`No videos found for this`}/>
            )}>
            </FlatList>
        </SafeAreaView>
    );
};

export default Profile;