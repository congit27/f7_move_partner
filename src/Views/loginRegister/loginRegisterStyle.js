import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    loginContainer: {
        marginHorizontal: 40,
        flex: 1,
        height: Dimensions.get('window').height,
    },
    title: {
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 180,
        marginBottom: 50,
    },
    colorRed: {
        color: 'red',
    },

    titleSignup: {
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 80,
        marginBottom: 20,
    },

    loginContent: {
        marginVertical: 15,
    },

    inputContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        marginBottom: 10,
    },

    logoSdt: {
        width: 30,
        height: 20,
        marginRight: 10,
    },
    inputSdt: {
        flex: 1,
        height: 40,
        borderLeftWidth: 1,
        paddingLeft: 10,
    },

    btnContinue: {
        backgroundColor: '#FF7527',
        padding: 15,
        borderRadius: 10,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    btnSignup: {
        backgroundColor: 'wheat',
        padding: 5,
        borderRadius: 5,
    },

    btnTextSignup: {
        textAlign: 'center',
        color: '#333',
        fontSize: 17,
        fontWeight: 'bold',
    },
    registerCont: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;
