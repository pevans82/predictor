import {useEffect, useState} from 'react';
import {useUser} from "./useUser";

export function useAdminUser() {
    const user = useUser();

    const [isAdminUser, setIsAdminUser] = useState(false);

    useEffect(() => {
        if (user) {
            const groups = user.signInUserSession.idToken.payload["cognito:groups"];
            if (groups) {
                setIsAdminUser(groups.indexOf("admin") > -1);
            } else {
                setIsAdminUser(false);
            }
        }
    }, [user]);

    return isAdminUser;
}