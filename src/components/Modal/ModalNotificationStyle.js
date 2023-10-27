import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    alertContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    alertContent: {
        backgroundColor: '#FFF',
        padding: 20,
    },
    customerHeader: {
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
    addressText: {
        color: '#ccc',
    },
    carInfo: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        height: 70,
        marginTop: 10,
        gap: 3,
    },
    carText: {
        color: '#ccc',
    },
    carStatus: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        height: 50,
        marginTop: 10,
        gap: 5,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
        marginTop: 50,
    },

    btnConfirm: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        backgroundColor: '#FF7527',
        borderRadius: 10,
    },
    btnText: {
        color: '#fff',
        fontWeight: '500',
    },
    btnCancel: {
        justifyContent: 'center',
        marginRight: 10,
    },
    btnTextCancel: {
        fontWeight: '500',
    },
});

export default styles;
