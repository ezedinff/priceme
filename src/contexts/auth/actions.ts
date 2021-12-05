export async function loginUser(dispatch: any, loginPayload: any) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload),
    };

    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        let response = await fetch(`api/auth/login`, requestOptions);
        let data = await response.json();
        console.log(data);
        if (data.success) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: data.data });
            localStorage.setItem('currentUser', JSON.stringify(data.data));
            return data.data;
        }

        dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
        console.log(data.errors[0]);
        return;
    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error });
        console.log(error);
    }
}

export async function logout(dispatch: any) {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
}
