import axios from 'axios';

const CAREER_API_BASE_URL = "https://ec2-13-213-233-77.ap-southeast-1.compute.amazonaws.com:9090/api/v1/candidates";

class CareerService {

    getCandidates(){
        return axios.get(CAREER_API_BASE_URL);
    }

    createCandidate(candidate){
        return axios.post(CAREER_API_BASE_URL, candidate);
    }

    getCandidateById(candidateId){
        return axios.get(CAREER_API_BASE_URL + '/' + candidateId);
    }

    updateCandidate(candidate, candidateId){
        return axios.put(CAREER_API_BASE_URL + '/' + candidateId, candidate);
    }

    deleteCandidate(candidateId){
        return axios.delete(CAREER_API_BASE_URL + '/' + candidateId);
    }
}

export default new CareerService()