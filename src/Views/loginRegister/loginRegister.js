import React from 'react';
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native';

import styles from './LoginRegisterStyle';

const LoginRegister = ({ navigation }) => {
    return (
        <>
            <View style={styles.loginContainer}>
                <Text style={styles.title}>Login & Register</Text>
                <Text>Enter your phone number:</Text>
                <View style={styles.loginContent}>
                    <TextInput
                        placeholder="Phone Number with Country code..."
                        keyboardType="phone-pad"
                        autoCompleteType="tel"
                        style={styles.inputContent}
                    />
                </View>
                <View style={styles.loginBtn}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnContinue}
                        onPress={() => navigation.navigate('OtpVerifier')}
                    >
                        <Text style={styles.btnText}>Send Otp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default LoginRegister;
