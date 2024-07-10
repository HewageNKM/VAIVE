import React, {useState} from 'react';
import {Alert, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import {ResizeMode, Video} from "expo-av";
import icons from "@/constants/icons";
import CustomButton from "@/components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import {createVideo} from "@/lib/appwrite";
import {useGlobalContext} from "@/context/GlobalProvider";

const Create = () => {
    const {user} = useGlobalContext();
    const [uploading, setUploading] = useState(false)
    const [form, setForm] = useState({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
    })
    const submit = async () => {
        if (!form.video || !form.thumbnail || !form.title || form.prompt) {
            return Alert.alert("Error", "Fill all the fields")
        }
        setUploading(true)

        try {
            const newPost = await createVideo({...form, userId: user.$id});
            Alert.alert("Success", "Post Uploaded Successfully")
        } catch (e) {
            console.log(e)
            Alert.alert("Error", "Uploading Fails")
        } finally {
            setForm({
                title: '',
                video: null,
                thumbnail: null,
                prompt: ''
            })
            setUploading(false)
        }
    }

    const openPicker = async (selectType) => {
        const result = await DocumentPicker.getDocumentAsync({
            type: selectType === 'image' ? ['image/png', 'image/jpg','image/jpeg'] : ['video/mp4', 'video/gif']
        })
        if (!result.canceled) {
            if (selectType === 'image') {
                setForm({...form, thumbnail: result.assets[0]})
            }

            if (selectType === 'video') {
                setForm({...form, video: result.assets[0]})
            }
        }
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
                    <TouchableOpacity onPress={() => openPicker("video")}>
                        {form.video ? (<Video resizeMode={ResizeMode.COVER}
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
                        <TouchableOpacity onPress={() => openPicker("image")}>
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
                           value={form.prompt} handleChangeText={(e) => setForm({...form, prompt: e})}/>
                <CustomButton handlePress={submit} isLoading={uploading} title="Submit and Publish"
                              containerStyles="mt-7"/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Create;