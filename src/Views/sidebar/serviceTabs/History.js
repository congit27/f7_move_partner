import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';

export default function History() {
    return (
        <View style={[styles.scene]}>
            <Text style={[styles.textS]}>Chưa có hoạt động nào</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    textS: {
        marginTop: 20,
        textAlign: 'center',
    },
});
