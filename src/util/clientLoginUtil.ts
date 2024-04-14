export const SESSION_COOKIE = 'REDINVSESH';
export async function HandleLogin(username: string, password: string) {
    let loginResult = await useFetch('/api/auth/login', {
        method: 'post',
        body: {
            username: username,
            password: password
        }
    });

    if (loginResult.data.value) {
        if (loginResult.data.value.token) {
            var token = loginResult.data.value.token;

            const cookie = useCookie(SESSION_COOKIE);
            cookie.value = token;

            return { success: true, error: undefined };
        } else {
            return { success: false, error: loginResult.data.value.error };
        }
    } else {
        return { success: false, error: 'Failed to contact server.' };
    }
}

export async function HandleLogout() {
    await useFetch('api/auth/logout', {
        credentials: 'include'
    });

    const cookie = useCookie(SESSION_COOKIE);
    cookie.value = undefined;
}
