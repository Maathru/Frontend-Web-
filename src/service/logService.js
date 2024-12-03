import axiosInstance from "./axiosInstance";

class LogService {
    static async getLogs(){
        try {
            const response = await axiosInstance.get(`/logs`);
            return response.data;
        }catch(error){
            throw error;
        }
    }
}

export default LogService;