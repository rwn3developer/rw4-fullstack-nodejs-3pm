import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        let saveToken = localStorage.getItem('token');
        return { token: saveToken || null }
    })
    useEffect(() => {
        if (auth?.token) {
            localStorage.setItem('token', auth.token)
        }
    }, [auth])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )

}

const useAuth = () => {
    return useContext(AuthContext);
}

export { useAuth, AuthProvider }