import {
    Avatar,
    Button,
    Divider, FAB,
    IconButton,
    List,
    Modal,
    Portal,
    Text,
    TextInput,
    TouchableRipple
} from "react-native-paper";
import {FlatList, StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {updateProfile} from "@firebase/auth";
import {auth, dbRealTime} from "../../configs/FirebaseConfig";
import firebase from "firebase/auth";
import {EmailCardComponent} from "./components/EmailCardComponent";
import {NewMessageComponent} from "./components/NewMessageComponent";
import {ref,onValue} from "firebase/database";

interface IUserDataUpdate {
    name: string,
}

export interface IEmail {
    id: string
    to: string,
    subject: string,
    message: string,
}

export const HomeScreen = () => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [userData, setUserData] = useState<IUserDataUpdate>({
        name: ''
    });
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalEmail, setShowModalEmail] = useState<boolean>(false)
    const [emails, setEmails] = useState<IEmail[]>([]);
    const updateData = (key: string, value: string) => {
        setUserData({...userData!, [key]: value})
    }

    const handlerUpdate = async () => {
        await updateProfile(user!, {displayName: userData.name})
        setShowModal(false);
    }
    const getAllEmails = ()=>{
        const emailRef = ref(dbRealTime,'emails')
        onValue(emailRef, (snapshot) =>{
            const data = snapshot.val();
            const getKeys = Object.keys(data);
            const newData: IEmail[] = [];
            getKeys.forEach((key)=> {
                const value = {...data[key], id: key} as IEmail;
                newData.push(value)
            })
            setEmails(newData);
        })
    }

    useEffect(() => {
        setUser(auth.currentUser);
        setUserData({name: auth.currentUser?.displayName ?? ''})
        getAllEmails();
    }, [])
    return (
        <>
            <SafeAreaView style={styles.root}>
                <View style={styles.headerContent}>
                    <Avatar.Text label={"CA"} size={50}/>
                    <View>
                        <Text variant={"bodySmall"}>Bienvenido</Text>
                        <Text variant={"labelLarge"}>{userData.name}</Text>
                    </View>
                    <View style={{alignItems: "flex-end", flex: 1}}>
                        <IconButton onPress={() => setShowModal(true)} mode={"contained"} icon={"cog"} size={30}/>
                    </View>
                </View>
                <View>
                    <FlatList data={emails} renderItem={({item}) => <EmailCardComponent email={item}/>}
                              keyExtractor={(item, index) => index.toString()}/>
                </View>
            </SafeAreaView>
            <Portal>
                <Modal visible={showModal} contentContainerStyle={styles.modal}>
                    <Text variant={"headlineSmall"}>My profile</Text>
                    <Divider/>
                    <TextInput label={"Name"} mode={"outlined"} value={userData.name}
                               onChangeText={(e) => updateData('name', e)}/>
                    <TextInput label={"Email"} mode={"outlined"} value={user?.email!} disabled/>
                    <Button mode={"contained"} onPress={handlerUpdate}>Update</Button>
                </Modal>
            </Portal>
            <FAB icon={"plus"} variant={"primary"} style={styles.fab}  onPress={() => setShowModalEmail(true)}/>
            <NewMessageComponent visible={showModalEmail} setVisible={setShowModalEmail}/>
        </>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,

    },
    headerContent: {
        marginVertical: 20,
        marginHorizontal: 20,
        flexDirection: "row",
        gap: 15,
        alignItems: "center"
    },
    modal: {
        gap: 15,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    fab: {
        position: "absolute",
        bottom: 15,
        right: 15
    }
})
