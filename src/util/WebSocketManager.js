import io from 'socket.io-client';
import pushNotificationsRegister from './pushNotificationsRegister';

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

        this.socket = io('https://railwaytest-production-1ca0.up.railway.app/');

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

    sendAcceptRequestNotification(location) {
        if (!this.socket || !this.socket.connected) {
            console.log('Not connected. Connecting...');
            this.connect();
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
