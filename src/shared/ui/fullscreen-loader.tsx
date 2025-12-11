import classes from './shared-ui.module.css';
import {Spinner} from "react-bootstrap";

interface Props {
    isLoading: boolean
}

function FullscreenLoader({ isLoading = false }: Props) {
    if (!isLoading) {
        return null
    }

    return (
        <div className={classes.fullscreenBackdrop}>
            <Spinner variant="light" animation="border" />
        </div>
    );
}

export default FullscreenLoader;