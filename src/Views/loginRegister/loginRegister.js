import React, { useState } from 'react';
import { View, ToastAndroid, ActivityIndicator, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import axios from 'axios';

import styles from './loginRegisterStyle';

const LoginRegister = ({ navigation }) => {
    const [toggleLR, setToggleLR] = useState(true);
    const [userNameLogin, setUserNameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [noteMessage, setNoteMessage] = useState('');

    //partner state
    const [userNameP, setUserNameP] = useState('');
    const [passwordP, setPasswordP] = useState('');
    const [confirmPasswordP, setConfirmPasswordP] = useState('');
    const [fullNameP, setFullNameP] = useState('');
    const [phoneP, setPhoneP] = useState('');
    const [addressP, setAddressP] = useState('');
    const [noteMessageP, setNoteMessageP] = useState('');

    const [loading, setLoading] = useState(false);

    const handleToggle = () => {
        setToggleLR(!toggleLR);
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            await axios
                .post('https://f7movebackend-production.up.railway.app/api/login-partner', {
                    userName: userNameLogin,
                    password: passwordLogin,
                })
                .then((res) => {
                    if (res.data.EC !== 0) {
                        console.log('>>>Check data: ', res.data);
                        setNoteMessage(res.data.EM);
                    } else {
                        navigation.navigate('MainDrawer');
                    }
                    setLoading(false);
                });
        } catch (error) {
            console.log('Axios error: ', error);
        }
    };

    const handleSignup = async () => {
        setLoading(true);
        setNoteMessageP('');
        if (!userNameP || !passwordP || !confirmPasswordP || !phoneP || !addressP || !fullNameP) {
            setNoteMessageP('Enter all fields');
            return;
        }

        if (passwordP !== confirmPasswordP) {
            setNoteMessageP('Password confirm incorrect!.');
            return;
        }

        try {
            await axios
                .post('https://f7movebackend-production.up.railway.app/api/register-partner', {
                    loginAccount: userNameP,
                    password: passwordP,
                    fullName: fullNameP,
                    phoneNumber: phoneP,
                    address: addressP,
                })
                .then((res) => {
                    if (res.data.EC !== 0) {
                        console.log('>>>Check data: ', res.data);
                        setNoteMessageP(res.data.EM);
                    } else {
                        showToastWithGravity('Create account success!');
                        setToggleLR(!toggleLR);
                    }
                    setLoading(false);
                })
                .catch((err) => console.log(err));
        } catch (error) {
            console.log('Axios error: ', error);
        }
    };

    const showToastWithGravity = (text) => {
        ToastAndroid.showWithGravity(text, ToastAndroid.LONG, ToastAndroid.TOP);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {loading && (
                <View style={styles.loading}>
                    <ActivityIndicator />
                </View>
            )}
            {toggleLR ? (
                <View style={styles.loginContainer}>
                    <Text style={styles.title}>Login</Text>
                    <Text>Enter your phone number:</Text>
                    <View style={styles.loginContent}>
                        <TextInput
                            placeholder="Phone Number with Country code..."
                            onChangeText={setUserNameLogin}
                            style={styles.inputContent}
                        />

                        <TextInput
                            placeholder="Password..."
                            autoCompleteType="tel"
                            secureTextEntry
                            onChangeText={setPasswordLogin}
                            style={styles.inputContent}
                        />
                        <Text style={styles.colorRed}>{noteMessage}</Text>
                    </View>

                    <View style={styles.loginBtn}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.btnContinue} onPress={handleLogin}>
                            <Text style={styles.btnText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.registerCont}>
                        <Text>No account? </Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.btnSignup} onPress={handleToggle}>
                            <Text style={styles.btnTextSignup}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.loginContainer}>
                    <Text style={styles.titleSignup}>Register</Text>
                    <View style={styles.loginContent}>
                        <Text>Login account:</Text>
                        <TextInput
                            placeholder="Login account..."
                            style={styles.inputContent}
                            onChangeText={setUserNameP}
                        />
                        <Text>Full name:</Text>
                        <TextInput
                            placeholder="First and lastname..."
                            style={styles.inputContent}
                            onChangeText={setFullNameP}
                        />
                        <Text>Phone Number:</Text>
                        <TextInput
                            placeholder="Phone number..."
                            style={styles.inputContent}
                            keyboardType="numeric"
                            onChangeText={setPhoneP}
                        />
                        <Text>Address:</Text>
                        <TextInput placeholder="Address..." style={styles.inputContent} onChangeText={setAddressP} />
                        <Text>Password:</Text>
                        <TextInput
                            placeholder="Password..."
                            style={styles.inputContent}
                            secureTextEntry
                            onChangeText={setPasswordP}
                        />
                        <Text>Confirm Password:</Text>
                        <TextInput
                            placeholder="Confirm Password..."
                            style={styles.inputContent}
                            secureTextEntry
                            onChangeText={setConfirmPasswordP}
                        />
                        <Text style={styles.colorRed}>{noteMessageP}</Text>
                    </View>

                    <View style={styles.loginBtn}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.btnContinue} onPress={handleSignup}>
                            <Text style={styles.btnText}>SIGNUP</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.registerCont}>
                        <Text>Have account! </Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.btnSignup} onPress={handleToggle}>
                            <Text style={styles.btnTextSignup}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

export default LoginRegister;
