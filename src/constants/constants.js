export const BASE_URL = import.meta.env.BASE_URL

export const AppRoutes= {
    login: BASE_URL + "/auth/login",
    register: BASE_URL + "/auth/register",
    userInfo: BASE_URL + "/user/myInfo",
}