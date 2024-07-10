import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import {ResizeMode, Video} from "expo-av";
import icons from "@/constants/icons";
import CustomButton from "@/components/CustomButton";

const Create = () => {
    const [uploading, setUploading] = useState(false)
    const [form, setForm] = useState({
        title: '',
        video: null,
        thumbnail: null
    })
    const submit = () => {

    }
    return (
        <SafeAreaView className="bg-primary h-full w-full">
            <ScrollView className="px-4 my-6">
                <Text className="text-2xl text-white font-psemibold">
                    Upload a Video
                </Text>
                <FormField otherStyles="mt-10" placeholder="Give a title to your video..." title="Video Title"
                           value={form.title} handleChangeText={(e) => setForm({...form, title: e})}/>
                <View className="mt-3">
                    <Text className="text-base font-pmedium text-gray-100">Upload a Video</Text>
                    <TouchableOpacity>
                        {form.video ? (<Video isLooping useNativeControls resizeMode={ResizeMode.COVER}
                                              className="w-full h-64 rounded-2xl" source={{uri: form.video.uri}}/>) :
                            <View className="w-full h-40 px-4 rounded-2xl justify-center items-center  bg-black-100">
                                <View className="border justify-center items-center border-dashed border-secondary-100">
                                    <Image source={icons.upload} resizeMode="contain" className="w-10 h-10"/>
                                </View>
                            </View>}
                    </TouchableOpacity>
                    <View className="mt-7 space-y-2">
                        <Text className="text-xl text-gray-100">
                            Upload thumbnail
                        </Text>
                        <TouchableOpacity>
                            {form.thumbnail ? (<Image resizeMode="cover" className="w-full h-64 rounded-2xl"
                                                      source={{uri: form.thumbnail.uri}}/>) :
                                <View
                                    className="w-full h-16 px-4 border-2 border-black-200 flex-row space-x-2 rounded-2xl justify-center items-center bg-black-100">
                                    <Image source={icons.upload} resizeMode="contain" className="w-1/2 h-1/2"/>
                                    <Text className="text-sm text-gray-100 font-pmedium">Choose a image</Text>
                                </View>}
                        </TouchableOpacity>
                    </View>
                </View>
                <FormField otherStyles="mt-10" placeholder="The prompt you used to create video" title="AI Prompt"
                           value={form.title} handleChangeText={(e) => setForm({...form, title: e})}/>
                <CustomButton handlePress={submit} isLoading={uploading} title="Submit and Publish"
                              containerStyles="mt-7"/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Create;