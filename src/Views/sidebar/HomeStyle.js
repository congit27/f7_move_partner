import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    map: {
        flex: 1,
    },
    btnOpenReceiveRequest: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
        backgroundColor: '#FF7527',
        padding: 10,
        borderRadius: 20,
    },

    btnText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default styles;
