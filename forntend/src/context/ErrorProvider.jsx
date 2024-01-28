import { createContext, useState } from "react";


const ErrorContext = createContext({});

// eslint-disable-next-line react/prop-types
export const ErrorProvider = ({ children }) => {
    
    const [errorObj, setErrorObj] = useState({
        error:false, 
        value:false, 
        title:"", 
        message:"",
    });

    return(
        <ErrorContext.Provider value={{ errorObj, setErrorObj }}>
            {children}
        </ErrorContext.Provider>
    )
}

export default ErrorContext;