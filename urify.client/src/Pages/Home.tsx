import React from 'react';
import { AuthorizeView,  AuthorizedUser } from "../Components/AuthorizeView.tsx";
import Header from "../Components/Header.tsx";

function Home() {
    return (
        <AuthorizeView>
            <AuthorizedUser>
                {(user) => <Header userType={user.userType} status={user.status} />}
            </AuthorizedUser>
        </AuthorizeView>
    );
}

export default Home;
