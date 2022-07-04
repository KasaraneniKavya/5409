import axios from "axios";
import { getIdToken } from "./cognitoAuth";

export async function axiosWithAuth(method, path) {
    try {
        const idToken = await getIdToken();
        return await axios
            .create({
                baseURL: "http://group42-dal-2.us-east-1.elasticbeanstalk.com/",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${idToken}`,
                },
            })
            [method](path);
    } catch (err) {
        throw err;
    }
}