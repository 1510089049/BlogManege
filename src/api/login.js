import requests from "@/utils/request";

export const login = () => {
    return requests.get('/user')
}