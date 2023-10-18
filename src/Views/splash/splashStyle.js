import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: 200,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flex: 1,
    },
    logoContainer: {
        flex: 1,
        width: 150,
        height: 150,
        textAlign: 'center',
    },
    logoF7: {
        width: 150,
        height: 150,
        resizeMode: 'stretch',
    },
    appNameLogo: {
        textAlign: 'center',
        fontSize: 50,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#1C4E48',
    },
    appNameDetail: {
        textAlign: 'center',
        fontSize: 25,
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 30,
    },
    btnTextContainer: {
        backgroundColor: '#FF7527',
        padding: 10,
        width: 300,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 22,
        color: '#ffffff',
        fontWeight: '700',
    },
});

export default styles;
