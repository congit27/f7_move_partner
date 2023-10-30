import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    helpContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    helpText: {
        textAlign: 'center',
        marginTop: 0,
        fontWeight: '500',
    },
    helpContent: {
        padding: 20,

        // shadowOffset: { width: 0, height: 2 },
        // shadowColor: 'rgba(0, 0, 0, 0.1)',
        // shadowOpacity: 1,
        // shadowRadius: 4,
    },
    customerInfo: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        height: 50,
    },

    customerAddress: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        height: 50,
        marginTop: 10,
        gap: 5,
    },
    carInfo: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        height: 70,
        marginTop: 10,
        gap: 3,
    },
    text: {
        color: '#797979',
    },
    carStatus: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        height: 50,
        marginTop: 10,
        gap: 5,
    },
    helpBtn: {
        backgroundColor: '#FF7527',
        padding: 15,
        borderRadius: 10,
        marginTop: 350,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

export default styles;