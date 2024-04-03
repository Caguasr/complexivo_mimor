import react, {useState} from "react";
import {Button, Text, TextInput} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from "../configs/FirebaseConfig";

interface FormAuth {
    email: string;
    password: string;
}

export const LoginScreen = () => {
    const [formAuth, setFormAuth] = useState<FormAuth>({
        email: "",
        password: "",
    })
    const setValuesForm = (key: string, value: string) => {
        setFormAuth({...formAuth, [key]: value})
    }

    const handlerLogin = async () => {
        if (!formAuth.password || !formAuth.email) return;
        try {
            const result = await signInWithEmailAndPassword(auth, formAuth.email, formAuth.password);
            console.log(result.user)
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <View style={styles.root}>
            <Text variant={"displayMedium"} style={{textAlign: "center"}}> Sing in</Text>
            <TextInput mode={"outlined"} label={"Email"} onChangeText={(e) => setValuesForm('email', e)}/>
            <TextInput mode={"outlined"} label={"Password"} onChangeText={(e) => setValuesForm('password', e)}/>
            <Button mode={"contained"} onPress={handlerLogin}>Sing in</Button>
        </View>
    );
}
export const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        // alignItems:"center",
        gap: 10,
        paddingHorizontal: 20
    }
})
