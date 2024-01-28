import { createContext, useState } from "react";


const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    
    const [userInfo, setUserInfo] = useState({
        userAPI : '',
        email : '',
        template : 1,
        host : '',
        dbuser : '',
        dbpassword : '',
        database : '' 
    });

    return(
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;