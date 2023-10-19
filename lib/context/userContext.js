import { createContext } from "react";
import React from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({
        email : "",
        id : "",
        image : "",
        name : "",
        type : "",
    });
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
        {children}
        </UserContext.Provider>
    );
}

export const useUser = () => React.useContext(UserContext);

email
: 
"kasinathansj@gmail.com"
id
: 
"652e9e5a808961168df7ad4e"
image
: 
"https://lh3.googleusercontent.com/a/ACg8ocKgELMSyMRdBV0K3Qn0R0XuRSnAruJo5xu2TbOPXKTx=s96-c"
name
: 
"kasi nathan s j"