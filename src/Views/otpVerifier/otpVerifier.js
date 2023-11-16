import React from 'react';
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native';

import styles from './OtpVerifierStyle';

const OtpVerifier = ({ navigation }) => {
    return (
        <>
            <View style={styles.verifyContainer}>
                <Text style={styles.title}>OTP Verification</Text>

                <View style={styles.verifyContent}>
                    <View style={styles.otpInputContainer}>
                        <TextInput
                            placeholder="Enter OTP"
                            // onChangeText={setCode}
                            keyboardType="number-pad"
                            autoCompleteType="tel"
                            style={styles.otpInput}
                        />
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnVerify}
                        onPress={() => navigation.navigate('MainDrawer')}
                    >
                        <Text style={styles.btnText}>Verify</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default OtpVerifier;
