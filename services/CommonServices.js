import { get, post, API, postWithoutAuth } from "../Utils/index"


const loginToMomix = async (profile) => {
    return await postWithoutAuth(`${API}/User/login`, {
        "request": {
            "userId": profile.id,
            "firstName": profile.first_name,
            "lastName": profile.last_name,
            "hometown": "[private]"
        },
        "languageCode": "en"
    })
}

const CheckIn = async (qrCode) => {
    const userDetail = JSON.parse(localStorage.getItem("userDetails"));
    const data = {
        id: userDetail.id, 
        userId: userDetail.userId, 
        qrCode
    }
    return await post(`${API}/User/check-in`, data)
}


const getMetaInfo = () => {
    return get(`${API}/Meta/info`)
}

const OrderBill = () => {
    const userDetail = JSON.parse(localStorage.getItem("userDetails"));
    const data = {
        id: userDetail.id, 
        userId: userDetail.userId, 
    }
    return post(`${API}/Order/order-bill`, data)
}

const CallWaiter = () => {
    const userDetail = JSON.parse(localStorage.getItem("userDetails"));
    const data = {
        id: userDetail.id, 
        userId: userDetail.userId, 
    }
    return post(`${API}/Order/call-waiter`, data)
}

export { loginToMomix, CheckIn, getMetaInfo, OrderBill, CallWaiter }
