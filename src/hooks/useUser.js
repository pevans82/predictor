import {useEffect, useState} from 'react';
import {Auth} from "@aws-amplify/auth/lib";
import {Hub} from "@aws-amplify/core/lib";

export function useUser() {
    const [user, setUser] = useState()

    useEffect(() => {
        let updateUser = async authState => {
            try {
                let user = await Auth.currentAuthenticatedUser()
                console.log(user)
                setUser(user)
            } catch {
                console.log("no user")
                setUser(null)
            }
        }
        Hub.listen('auth', updateUser) // listen for login/signup events
        updateUser() // check manually the first time because we won't get a Hub event
        return () => Hub.remove('auth', updateUser) // cleanup
    }, []);

    return user;
}