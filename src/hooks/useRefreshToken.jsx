import axios from "axios";
import useAuth from "./useAuth"

function useRefreshToken() {
    const { auth, setAuth} = useAuth()

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        console.log(auth)
        console.log(response)
        setAuth(perVal => ({...perVal, accessToken: response.data.access_token}))
        return response.data.access_token
    }
    return refresh;
}

export default useRefreshToken
