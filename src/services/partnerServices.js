import axios from 'axios';

const handleGetAllServiceItems = async () => {
    try {
        return await axios.get('http://192.168.31.132:8080/api/get-all-services');
    } catch (error) {
        console.log(error);
    }
};

export { handleGetAllServiceItems };
