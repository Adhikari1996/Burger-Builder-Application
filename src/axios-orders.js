import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-app-project-4f46c.firebaseio.com/'
});

export default instance;