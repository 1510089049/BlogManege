import requests from "@/utils/request";

export const GetBookList = (data) => {
    const datas = {
        "id": data.id,
        "bookName": data.bookName,
        "price": data.price,
        "store": data.store
    }
    return requests.post(`/book/getBook`, datas).then(response => {
        return response.data; // 返回响应数据
    }).catch(error => {
        console.error("修改请求出错:", error)
        throw error; // 抛出错误，交由上层处理
    })
}

export const SaveBook = (data) => {
    const datas = {
        "id": data.id,
        "bookName": data.bookName,
        "price": data.price,
        "store": data.store
    }
    return requests.post(`/book/addBook`, datas).then(response => {
        return response.data; // 返回响应数据
    }).catch(error => {
        console.error("修改请求出错:", error)
        throw error; // 抛出错误，交由上层处理
    })
}

export const DelBook = (data) => {
    const datas = {
        "id": data.id,
        "bookName": data.bookName,
        "price": data.price,
        "store": data.store
    }
    return requests.post(`/book/del`, datas).then(response => {
        return response.data; // 返回响应数据
    }).catch(error => {
        console.error("修改请求出错:", error)
        throw error; // 抛出错误，交由上层处理
    })
}

export const updateBook = (data) => {
    const datas = {
        "id": data.id,
        "bookName": data.bookName,
        "price": data.price,
        "store": data.store
    }
    return requests.post(`/book/updateBook`, datas).then(response => {
        return response.data; // 返回响应数据
    }).catch(error => {
        console.error("修改请求出错:", error)
        throw error; // 抛出错误，交由上层处理
    })
}

export const GetMusic = (page, id) => {
    return requests.get(`/admin/music/${id}`, {
        "page": page,
        "size": 8,
        "orders": [
            {
                "column": "string",
                "asc": true
            }
        ],
        "id": id,
        "name": "",
        "albumName": "",
        "artistName": "",
        "offset": 0
    }).then(response => {
        return response.data; // 返回响应数据
    }).catch(error => {
        console.error("修改请求出错:", error)
        throw error; // 抛出错误，交由上层处理
    })
}

export const GetLrc = (id) => {
    return requests.get(`/lrc/${id}`).then(response => {
        return response.data; // 返回响应数据
    }).catch(error => {
        console.error("修改请求出错:", error)
        throw error; // 抛出错误，交由上层处理
    })
}