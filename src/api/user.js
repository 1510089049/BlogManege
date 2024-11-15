import requests from "@/utils/request";


export const getUser = () => {
    return requests.get("/user")
}

export const getUserByID = (id) => {
    return requests.get(`user/${id}`)
}
