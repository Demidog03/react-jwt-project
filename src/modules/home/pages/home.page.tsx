import {useGetProfileQuery} from "../../auth/quieries/useGetProfileQuery.ts";
import {Link} from "react-router";

function HomePage() {
    const { data } = useGetProfileQuery()

    return (
        <div>
            Home page
            <p>{data?.name}</p>
            <Link to="/test">Go to Test page</Link>
        </div>
    );
}

export default HomePage;