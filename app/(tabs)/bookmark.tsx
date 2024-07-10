import React from 'react';
import {FlatList, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";

const Bookmark = () => {
    return (
        <SafeAreaView className="h-full bg-primary">
            <FlatList data={[]} keyExtractor={() => {
            }} ListHeaderComponent={() => (
                <View className='my-6 px-4'>
                    <Text className="font-pmedium text-xl text-gray-100">
                        Bookmark
                    </Text>
                    <View className="mt-6 mb-8">
                        <SearchInput initialQuery={''}/>
                    </View>
                </View>
            )} renderItem={({item}) => (<VideoCard video={item} key={item.$id}/>)} ListEmptyComponent={() => (
                <EmptyState title="No Videos Found" subTitle={`Add to Bookmark`}/>
            )}>
            </FlatList>
        </SafeAreaView>
    );
};

export default Bookmark;