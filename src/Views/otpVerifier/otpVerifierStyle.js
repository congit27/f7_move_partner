import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    verifyContainer: {
        marginHorizontal: 40,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 180,
        marginBottom: 10,
    },
    optSend: {
        textAlign: 'center',
        fontSize: 15,
    },

    verifyContent: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 40,
    },
    otpInputContainer: {
        height: 40,
        width: 100,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
    },
    otpInput: {
        textAlign: 'center',
    },

    btnVerify: {
        backgroundColor: '#45849f',
        padding: 15,
        borderRadius: 10,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

export default styles;
