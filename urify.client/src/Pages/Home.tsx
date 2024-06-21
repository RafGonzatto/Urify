import Page from "../Components/Page.tsx";
import AuthorizeView from "../Components/AuthorizeView.tsx";

function Home() {
    return (
        <AuthorizeView>
            <Page/>
        </AuthorizeView>
    );
}

export default Home;