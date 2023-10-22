import request from "@/api/axios-config";

export const getMatches = () => {
    return request.get<Match[]>("http://localhost:8080/api" + "/match")
}

export const createMatch = (data: any) => {
    return request.post<Match>("http://localhost:8080/api" + "/match", data);
}