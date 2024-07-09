import React, {useEffect} from 'react';
import {FlatList, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import {searchPosts} from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import {useLocalSearchParams} from "expo-router";

const Search = () => {
    const {query} = useLocalSearchParams();
    const {data: posts, refetch} = useAppwrite(searchPosts, query)
    useEffect(() => {
        refetch()
    }, [query])
    return (
        <SafeAreaView className="h-full bg-primary">
            <FlatList data={posts} keyExtractor={(item) => item.$id} ListHeaderComponent={() => (
                <View className='my-6 px-4'>
                    <Text className="font-pmedium text-sm text-gray-100">
                        Search Results for
                    </Text>
                    <Text className="text-2xl text-white font-psemibold">
                        {query}
                    </Text>
                    <View className="mt-6 mb-8">
                        <SearchInput initialQuery={query}/>
                    </View>
                </View>
            )} renderItem={({item}) => (<VideoCard video={item} key={item.$id}/>)} ListEmptyComponent={() => (
                <EmptyState title="No Videos Found" subTitle={`No videos found for this ${query}`}/>
            )}>
            </FlatList>
        </SafeAreaView>
    );
};

export default Search;