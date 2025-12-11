import {useGetProfileQuery} from "../../auth/quieries/useGetProfileQuery.ts";
import FullscreenLoader from "../../../shared/ui/fullscreen-loader.tsx";
import {ListGroup} from "react-bootstrap";

function ProfilePage() {
    const { data, isLoading } = useGetProfileQuery()

    if (isLoading) {
        return <FullscreenLoader isLoading={isLoading} />
    }

    function formatDate(stringDate: string | undefined) {
        if (!stringDate) {
            return null;
        }

        const date = new Date(stringDate);

        return date.toLocaleDateString()
    }

    return (
        <ListGroup>
            <ListGroup.Item>Name: {data?.name}</ListGroup.Item>
            <ListGroup.Item>Email: {data?.email}</ListGroup.Item>
            <ListGroup.Item>Created at: {formatDate(data?.createdAt)}</ListGroup.Item>
        </ListGroup>
    );
}

export default ProfilePage;