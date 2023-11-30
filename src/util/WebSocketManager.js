import io from 'socket.io-client';
import pushNotificationsRegister from './pushNotificationsRegister';
import axios from 'axios';

class WebSocketManager {
    constructor() {
        this.expoPushToken = null;
        this.socket = null;
        this.listeners = [];
    }

    connect() {
        if (this.socket && this.socket.connected) {
            this.disconnect();
        }

        this.socket = io('https://f7movebackend-production.up.railway.app');

        this.socket.on('connect', () => {
            console.log('Connected to the server');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from the server');
        });
    }

    async sendExpoPushToken() {
        this.expoPushToken = await pushNotificationsRegister();

        if (!this.socket || !this.socket.connected) {
            console.log('Not connected. Connecting...');
            this.connect();
        }

        this.socket.emit('send-expo-push-token', { token: this.expoPushToken });
        console.log('token: ', this.expoPushToken);
    }

    receiveRequest() {
        if (!this.socket || !this.socket.connected) {
            console.log('Not connected. Connecting...');
            this.connect();
        }

        this.socket.on('new-rescue-request', (data) => {
            console.log('Check rescue requestt>>>>:', data);
            this.notifyListeners(data);
        });
    }

    closeReceiveRequest() {
        if (!this.socket || !this.socket.connected) {
            console.log('Not connected. Connecting...');
            this.connect();
        }
        this.socket.emit('close-connect');
    }

    async sendAcceptRequestNotification(location, data) {
        if (!this.socket || !this.socket.connected) {
            console.log('Not connected. Connecting...');
            this.connect();
        }

        //Save data receive request to database
        try {
            await axios
                // .post('https://f7movebackend-production.up.railway.app/api/login-partner', {
                .post('http://192.168.31.138:8080/api/save-rescue-require-partner', {
                    nameCustomer: data.userName,
                    namePartner: data.namePartner,
                    reason: data.statusContent,
                });
        } catch (error) {
            console.log('Axios error: ', error);
        }

        this.socket.emit('accept-request', { acceptedState: true, location: location });
    }

    sendCameNotification() {
        if (!this.socket || !this.socket.connected) {
            console.log('Not connected. Connecting...');
            this.connect();
        }
        this.socket.emit('come-notification', { isCome: true });
    }

    sendCostNotice(data) {
        if (!this.socket || !this.socket.connected) {
            console.log('Not connected. Connecting...');
            this.connect();
        }
        this.socket.emit('cost-notice', data);
    }

    disconnect() {
        if (this.socket && this.socket.connected) {
            this.socket.disconnect();
        }
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    removeListener(listener) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    notifyListeners(data) {
        this.listeners.forEach((listener) => {
            listener(data);
        });
    }
}

export default WebSocketManager;
