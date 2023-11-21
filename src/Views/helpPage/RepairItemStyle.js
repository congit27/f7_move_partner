import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    repairItemContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    titleText: {
        textAlign: 'center',
        marginTop: 50,
        fontWeight: '500',
    },
    line: {
        borderBottomWidth: 1,
        borderBlockColor: '#CCC',
        marginTop: 15,
    },
    repairItemContent: {
        padding: 20,
    },
    text: {
        fontWeight: '500',
        color: '#03337A',
        fontSize: 16,
    },
    dropdownStyle: {
        marginTop: 20,
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
        marginTop: 300,
        alignItems: 'center',
        textAlign: 'center',
    },
    helpBtn: {
        backgroundColor: '#FF7527',
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

export default styles;
