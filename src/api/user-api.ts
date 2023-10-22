import request from "@/api/axios-config";

export const me = () => {
    return request.get<User>("http://localhost:8080/api" + "/auth/me");
}

export const login = (data: any) => {
    return request.post<string>("http://localhost:8080/api" + "/auth/login", data);
}

export const register = (data: any) => {
    return request.post<string>("http://localhost:8080/api" + "/auth/register", data);
}

export const getUsers = () => {
    return request.get<User[]>('http://localhost:8080/api' + '/user');
}
