const fetchOptions: any = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
}

const UserProvider = {
    isAuthenticated: false,
    signin(username: string, password: string, callback: (err: string | null, data: any) => void) {
        fetchOptions['body'] = JSON.stringify({username, password})
        fetch('/api/auth/login', fetchOptions)
            .then(async (res) => {
                const response = await res.json();
                if (response.success) {
                    UserProvider.isAuthenticated = true;
                    localStorage.setItem("user", JSON.stringify(response.data));
                    callback(null, response.data);
                } else {
                    UserProvider.isAuthenticated = false
                }
            })
            .catch((err) => console.log(err));
    },
    signout(callback: VoidFunction) {
        UserProvider.isAuthenticated = false;
        localStorage.removeItem("user");
    }
};

export { UserProvider };
