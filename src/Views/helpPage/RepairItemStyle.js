import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
    },
    serviceContainer: {
        marginVertical: 10,
        flex: 1,
    },
    line: {
        borderBottomWidth: 1,
        borderBlockColor: '#CCC',
        marginTop: 15,
    },
    itemContainer: {
        marginTop: 50,
    },
    repairItemContent: {
        // paddingHorizontal: 20,
    },
    text: {
        fontWeight: '500',
        color: '#03337A',
        fontSize: 16,
    },
    dropdownStyle: {
        marginHorizontal: 20,
    },
    repairItem: {
        flexDirection: 'row',
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 15,
        gap: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    image: {
        height: 30,
        width: 30,
        marginLeft: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 23,
        marginTop: 70,
        fontWeight: '900',
    },

    repairItemRight: {
        flexDirection: 'column',
    },
    textTitle: {
        color: '#03337A',
        fontWeight: '500',
        fontSize: 16,
    },
    textDetail: {
        fontSize: 12,
        color: '#9A9A9A',
    },
    textTotalPrice: {
        fontSize: 16,
        marginTop: 20,
        alignItems: 'center',
        textAlign: 'center',
    },
    helpBtn: {
        backgroundColor: '#FF7527',
        padding: 15,
        borderRadius: 10,
        paddingHorizontal: 20,
        marginTop: 30,
        marginBottom: 60,
    },
    colorRed: {
        color: 'red',
        fontSize: 23,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

export default styles;
