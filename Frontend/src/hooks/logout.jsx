import React, { useState } from 'react'
import userAtom from '../Atom/userAtom.js';
import useShowToast from './showToast.jsx';

function uselogout() {
   const [user,setuser] = useState(userAtom);
   const showToast = useShowToast();
   const logout = async() => {
    try {
        const res = await fetch('/api/user/logout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
        if(!res.ok) {
            const errordata = await res.json();
            showToast("Error", errordata.err, "error");
            return;
        }
        const data = await res.json();
        console.log(data,"logout");
        localStorage.removeItem('user');
        setuser(null);
        window.location.reload();
    } catch (error) {
        console.log(error)
        showToast("Error", error, "error");
    }
   }
   return logout;

}

export default uselogout