import {useGetProfileQuery} from "../../auth/quieries/useGetProfileQuery.ts";

function TestPage() {
    const { data } = useGetProfileQuery()

    return (
        <div>
            Test page
            <p>{data?.name}</p>
        </div>
    );
}

export default TestPage;