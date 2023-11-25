import * as Location from 'expo-location';

export const getLocation = async () => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        return location;
    } catch (error) {
        console.error('An error occurred while accessing the location:', error);
    }
};

export const convertLocationToAddress = async (location) => {
    try {
        let address = await Location.reverseGeocodeAsync(location.coords);
        return {
            street: address[0].street,
            district: address[0].district, //null
            subregion: address[0].subregion,
            city: address[0].city, //null
        };
    } catch (error) {
        console.error('An error occurred while accessing the location:', error);
        return null;
    }
};
