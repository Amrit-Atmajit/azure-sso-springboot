import axios from 'axios';

const CAREER_API_BASE_URL = "https://ec2-13-213-233-77.ap-southeast-1.compute.amazonaws.com:9090/api/v1/writeToUs";

class WriteToUsService {

    getWriteToUs(){
        return axios.get(CAREER_API_BASE_URL);
    }

    createWriteToUs(writeToUs){
        return axios.post(CAREER_API_BASE_URL, writeToUs);
    }

    getWriteToUsById(writeToUsId){
        return axios.get(CAREER_API_BASE_URL + '/' + writeToUsId);
    }

    updateWriteToUs(writeToUs, writeToUsId){
        return axios.put(CAREER_API_BASE_URL + '/' + writeToUsId, writeToUs);
    }

    deleteWriteToUs(writeToUsId){
        return axios.delete(CAREER_API_BASE_URL + '/' + writeToUsId);
    }
}

export default new WriteToUsService()