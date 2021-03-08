import {useEffect, useState} from 'react';
import {Auth, Hub} from "aws-amplify";

export function useUser() {
    const [user, setUser] = useState();

    useEffect(() => {
        let updateUser = async authState => {
            try {
                const thisUser = await Auth.currentAuthenticatedUser();
                setUser(thisUser);
            } catch {
                setUser(undefined);
            }
        }
        Hub.listen('auth', updateUser); // listen for login/signup events
        updateUser(); // check manually the first time because we won't get a Hub event
        return () => Hub.remove('auth', updateUser); // cleanup
    }, []);

    return user;
}