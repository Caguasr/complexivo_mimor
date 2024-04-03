import {StyleSheet, View} from "react-native";
import {Button, Divider, IconButton, Modal, Portal, Text, TextInput} from "react-native-paper";
import {useState} from "react";
import {dbRealTime} from "../../../configs/FirebaseConfig";
import {ref, push, set} from 'firebase/database'
import firebase from "firebase/compat";

interface Props {
    visible: boolean,
    setVisible: Function
}

interface ISaveEmail {
    to: string;
    subject: string;
    message: string;
}

export const NewMessageComponent = ({visible, setVisible}: Props) => {

    const [emailForm, setEmailForm] = useState<ISaveEmail>({
        to: '',
        subject: '',
        message: '',
    })
    const handlerChangeValues = (key: string, value: string) => {
        setEmailForm({
            ...emailForm,
            [key]: value
        })
    }

    const handlerSaveEmail = async () => {
        if (!emailForm.to || !emailForm.subject || !emailForm.message) return;
        const emailRef = ref(dbRealTime, 'emails');
        const newEmail = push(emailRef)
        try {
            await set(newEmail, emailForm)
            setEmailForm({
                message: '',
                subject: '',
                to: ''
            })
        } catch (e) {
            console.log(e)
        }
        setVisible(false)
    }
    return (
        <Portal>
            <Modal visible={visible} contentContainerStyle={styles.root}>
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    <Text variant={"headlineMedium"}>New email</Text>
                    <IconButton icon={"close"} onPress={()=> setVisible(false)}/>
                </View>
                <Divider/>

                <TextInput label={"To"} mode={"outlined"} keyboardType={"email-address"}
                           onChangeText={(e) => handlerChangeValues('to', e)}/>
                <TextInput label={"Subject"} mode={"outlined"} onChangeText={(e) => handlerChangeValues('subject', e)}/>
                <TextInput label={"Message"} mode={"outlined"} multiline={true} numberOfLines={7}
                           onChangeText={(e) => handlerChangeValues('message', e)}/>
                <Button mode={"contained"} onPress={handlerSaveEmail}>Send</Button>
            </Modal>
        </Portal>
    )
}
const styles = StyleSheet.create({
    root: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        padding: 20,
        gap: 20
    }
})
