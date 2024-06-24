import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';

export const UserContext = createContext({});

interface User {
    status: boolean;
    userType: number;
    email: string;
}

export function AuthorizeView(props: { children: React.ReactNode }) {
    const [authorized, setAuthorized] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const emptyUser: User = { userType: -1, email: "", status: false };
    const [user, setUser] = useState<User>(emptyUser);

    useEffect(() => {
        let retryCount = 0;
        const maxRetries = 10;
        const delay = 1000;

        const wait = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

        async function fetchWithRetry(url: string, options: any) {
            try {
                console.log(url);
                const response = await fetch(url, options);

                if (response.status === 200) {
                    console.log("Authorized");
                    const userData = await response.json();
                    setUser({
                        email: userData.email,
                        userType: userData.userType,
                        status: userData.status
                    });
                    setAuthorized(true);
                    return response;
                } else if (response.status === 401) {
                    console.log("Unauthorized");
                    return response;
                } else {
                    throw new Error("" + response.status);
                }
            } catch (error) {
                retryCount++;
                if (retryCount > maxRetries) {
                    throw error;
                } else {
                    await wait(delay);
                    return fetchWithRetry(url, options);
                }
            }
        }

        fetchWithRetry("/pingauth", {
            method: "GET",
        })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    } else {
        if (authorized && !loading) {
            return (
                <UserContext.Provider value={user}>
                    {props.children}
                </UserContext.Provider>
            );
        } else {
            return <Navigate to="/login" />;
        }
    }
}
export const AuthorizedUser: React.FC<{ children: (user: User) => React.ReactNode }> = ({ children }) => {
    const user = React.useContext(UserContext);
    console.log(user);
    return <>{children(user)}</>;
};
