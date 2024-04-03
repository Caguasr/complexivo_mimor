import {StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Divider, IconButton, Text, TouchableRipple} from "react-native-paper";
import {IEmail} from "../HomeScreen";
import {useNavigation} from "@react-navigation/native";


interface Props {
    email: IEmail,
}

export const EmailCardComponent = ({email}:Props) => {
    const navigation = useNavigation();
    return (
        <View>
            <TouchableRipple rippleColor={"rgba(102,79,163, 0.32)"} onPress={() => {
                // @ts-ignore
                navigation.navigate("Detail", {email})
            }}>
                <View style={styles.root}>
                    <Ionicons name={"mail"} size={30} color={"rgb(102,79,163)"}/>
                    <View>
                        <Text variant={"labelLarge"}>To: {email.to}</Text>
                        <Text variant={"bodyMedium"}>Subject: {email.subject}</Text>
                    </View>
                    <View style={{alignItems: "flex-end", flex: 1}}>
                        <IconButton icon={"arrow-right"} size={25} mode={"contained"} onPress={()=> {
                        }}/>
                    </View>
                </View>
            </TouchableRipple>
            <Divider/>
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    }
})
