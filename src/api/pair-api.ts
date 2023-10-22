import request from "@/api/axios-config";

export const getPairs = () => {
    return request.get<Pair[]>("http://localhost:8080/api" + "/pair")
}