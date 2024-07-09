import React, {useState} from 'react';
import {Alert, Image, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import {Link, router} from 'expo-router';
import {signIn} from "@/lib/appwrite";

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const submit = async () => {
        if (!form.password || !form.email) {
            Alert.alert("Error", "Please enter the valid details")
            return
        }
        setIsSubmitting(true)
        try {
            const session = await signIn(form.email, form.password)
            setForm({password: '', email: ''})
            router.replace("/home")
        } catch (e) {
            Alert.alert("Error", e.message)
            console.log(e)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView>
                <View className="w-full justify-center items-center px-4 my-5 h-full">
                    <Image source={images.logo} resizeMode="contain" className="w-[150px]"/>
                    <Text className="text-white font-psemibold text-2xl"> Log in to VAIVE</Text>
                    <FormField title="Email" value={form.email} handleChangeText={(e) => setForm({...form, email: e})}
                               otherStyles="mt-7 w-full" keyboardType="email"/>
                    <FormField title="Password" value={form.password}
                               handleChangeText={(e) => setForm({...form, password: e})} otherStyles="mt-7 w-full"/>
                    <CustomButton isLoading={isSubmitting} title="Sign In" handlePress={submit}
                                  containerStyles="mt-7 w-full"/>
                    <View className="justify-center item-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
                        <Link href="/sign-up" className="text-secondary text-lg font-psemibold">Sign Up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;