import requests from "@/utils/request";
import store from "@/store";
import { admin } from "@/router/role";

export const getUserInfo = (data) => {
    const formdata = {
        "username": data.username,
        "password": data.password
    }
    // 发送登录请求并返回 Promise 对象
    return requests.post('/news/login', formdata)
        .then(response => {
            store.commit('setUserInfo', response.data);
            console.log("将登录返回值保存如下" + store.state.userInfo)
            return response; // 返回响应数据
        })
        .catch(error => {
            console.error("登录请求出错:", error);
            throw error; // 抛出错误，交由上层处理
        });
};

export const register = (data) => {
    const requestData = {
        id: data.id,
        username: data.username,
        password: data.password,
        like: data.like
    };
    return requests.post('/user', requestData)
        .then(response => {
            console.log("注册响应数据:", response.data);
            return response.data; // 返回响应数据
        })
        .catch(error => {
            console.error("注册请求出错:", error);
            throw error; // 抛出错误，交由上层处理
        });
};

export const uploadFile = (resourceType, file) => {
    const formData = new FormData();
    formData.append('file', file);

    return requests.post(`/resource/${resourceType}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(response => {
            console.log("上传响应数据:", response.data);
            return response.data; // 返回响应数据
        })
        .catch(error => {
            console.error("上传请求出错:", error);
            throw error; // 抛出错误，交由上层处理
        });
};

export const Ping = () => {
    // null,{
    //     Authorization: 'Bearer ' + store.state.userInfo.data
    // }
    console.log("PING 运行中:" + "Authorization: 'Bearer ' " + store.state.userStatus.data)
    // 发送登录请求并返回 Promise 对象
    return requests.get('/ping')
        .then(response => {
            store.commit('setUserStatus', response.data);
            console.log(store.state.userStatus);
            return response.data; // 返回响应数据
        })
        .catch(error => {
            console.error("登录请求出错:", error);
            throw error; // 抛出错误，交由上层处理
        });
};

export const GetUserList = () => {
    // 发送登录请求并返回 Promise 对象
    return requests.get('/user')
        .then(response => {
            // store.commit('setUserStatus', response.data);
            // console.log(store.state.userStatus);
            console.log(response)
            return response.data; // 返回响应数据
        })
        .catch(error => {
            console.error("登录请求出错:", error);
            throw error; // 抛出错误，交由上层处理
        });
};

export const GetUserSearch = (username) => {
    const requestData = {
        id: 1,
        username: username,
        password: " ",
        like: " "
    };
    return requests.post('/user/abstuc', requestData)
        .then(response => {
            console.log(response)
            return response.data; // 返回响应数据
        })
        .catch(error => {
            console.error("登录请求出错:", error);
            throw error; // 抛出错误，交由上层处理
        });
};

export const DeleteUser = (id) => {
    return requests.delete(`/user/${id}`)
        .then(response => {
            console.log(response);
            return response; // 返回响应数据
        })
        .catch(error => {
            console.error("删除请求出错:", error);
            throw error; // 抛出错误，交由上层处理
        });
}

export const Modify = (data) => {
    return requests.put(`/user`, data).then(response => {
        return response.data; // 返回响应数据
    }).catch(error => {
        console.error("修改请求出错:", error)
        throw error; // 抛出错误，交由上层处理
    })


}



