import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';


export default function Confirm() {
    return (
        <View style={[styles.scene]}>
            <Text style={[styles.textS]}>Không có hoạt động nào</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    textS: {
        marginTop: 20,
        textAlign: 'center'
    }
});