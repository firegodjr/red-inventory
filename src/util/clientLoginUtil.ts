import { useFetch } from '@vueuse/core';

export const SESSION_COOKIE = 'REDINVSESH';
export async function HandleLogin(username: string, password: string) {
    return fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then((result) => {
            console.log('There should be a cookie now :)');
            return result;
        })
        .catch((err) => console.log('Error when logging in:', err));

    // if (loginResult.data.value) {
    //     if (loginResult.data.value.token) {
    //         var token = loginResult.data.value.token;

    //         const cookie = useCookie(SESSION_COOKIE);
    //         cookie.value = token;

    //         return { success: true, error: undefined };
    //     } else {
    //         return { success: false, error: loginResult.data.value.error };
    //     }
    // } else {
    //     return { success: false, error: 'Failed to contact server.' };
    // }
}

export async function HandleLogout() {
    await useFetch('api/auth/logout', {
        method: 'post',
        credentials: 'include'
    });
}
