import React from 'react';
import { useState } from 'react';
import { View, Image, Text, TouchableOpacity, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from './HomeStyle';

const Home = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} title="Marker" />
                </MapView>
                <View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.btnOpenReceiveRequest} onPress={toggleOpen}>
                        <Text style={styles.btnText}>
                            {isOpen ? 'Đã mở chế độ nhận yêu cầu' : 'Mở chế độ nhận yêu cầu'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default Home;
