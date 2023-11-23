import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';

const Profile = ({ navigation }) => {
    socket.on('broadcast-notification', (data) => {
        console.log('Received rescue request:', data);
    });
    return (
        <>
            <View>
                <Text style={{ fontSize: 30 }}>Welcome Profile</Text>
            </View>
        </>
    );
};

export default Profile;
