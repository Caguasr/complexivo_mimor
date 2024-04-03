import {IEmail} from "./HomeScreen/HomeScreen";
import {StyleSheet, View} from "react-native";
import {Button, Divider, Text, TextInput} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {ref, remove, update} from "firebase/database";
import {dbRealTime} from "../configs/FirebaseConfig";


export const DetailEmailScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    // @ts-ignore
    const {email} = route.params;
    const [editForm, setEditForm] = useState<IEmail>({
        id:'',
        subject:'',
        message:'',
        to:''
    })
    const handlerChangeMessage =(value: string) => {
        setEditForm({...editForm, message: value})
    }
    const handlerUpdateEmail= async ()=> {
        const refEmail  = ref(dbRealTime, "emails/" + editForm.id)
        await update(refEmail, {message: editForm.message})
        navigation.goBack();
    }
    const handlerDeleteEmail= async ()=> {
        const refEmail  = ref(dbRealTime, "emails/" + editForm.id)
        await remove(refEmail)
        navigation.goBack();
    }
    useEffect(() => {
        setEditForm(email)
    }, []);
    return (
        <SafeAreaView style={styles.root}>
            <View>
                <Text variant={"headlineSmall"}>Subject: {editForm.subject}</Text>
                <Divider/>
            </View>
            <View>
                <Text variant={"bodyLarge"}>To: {editForm.to}</Text>
                <Divider/>
            </View>
            <View style={{gap: 10}}>
                <Text style={{fontWeight:"bold", fontSize: 18}}>Message</Text>
                <TextInput value={editForm.message} mode={"flat"} multiline={true} numberOfLines={4} onChangeText={(e)=>handlerChangeMessage(e)}/>
            </View>
            <Button mode={"contained"} onPress={handlerUpdateEmail}>Update</Button>
            <Button icon={"trash-can"} onPress={handlerDeleteEmail} mode={"contained"} style={{backgroundColor:"#a73333"}}>Delete</Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        gap: 20,
        paddingHorizontal: 20,
        backgroundColor: "#fff"
    }
})
