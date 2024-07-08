import React, {useState} from 'react';
import {Alert, Image, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import {Link, router} from 'expo-router';
import {createUser} from '@/lib/appwrite';

const SignUp = () => {
    const [form, setForm] = useState({
        userName: '',
        email: '',
        password: ''
    })
    const submit = async () => {
        console.log(form)
        if (!form.userName || !form.email || !form.password) {
            Alert.alert('Error', 'Please fill all fields with valid data')
            return
        }
        setIsSubmitting(true)
        try {
            const session = await createUser(form.userName, form.email, form.password)
            setForm({userName: '', email: '', password: ''})
            router.replace("/home")
        } catch (e) {
            console.error(e)
            Alert.alert('Error', e.message)
        } finally {
            setIsSubmitting(false)
        }
        const newUser = await createUser(form.userName, form.email, form.password)
        console.log(newUser)
    }
    const [isSubmitting, setIsSubmitting] = useState(false)
    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView>
                <View className="w-full justify-center items-center px-4 my-5 h-full">
                    <Image source={images.logo} resizeMode="contain" className="w-[150px]"/>
                    <Text className="text-white font-psemibold text-2xl"> Sign Up in to VAIVE</Text>
                    <FormField title="Username" value={form.userName}
                               handleChangeText={(e) => setForm({...form, userName: e})} otherStyles="mt-7 w-full"/>
                    <FormField title="Email" value={form.email} handleChangeText={(e) => setForm({...form, email: e})}
                               otherStyles="mt-7 w-full" keyboardType="email"/>
                    <FormField title="Password" value={form.password}
                               handleChangeText={(e) => setForm({...form, password: e})} otherStyles="mt-7 w-full"/>
                    <CustomButton isLoading={isSubmitting} title="Sign Up" handlePress={submit}
                                  containerStyles="mt-7 w-full"/>
                    <View className="justify-center item-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">have an account already?</Text>
                        <Link href="/sign-in" className="text-secondary text-lg font-psemibold">Sign In</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;