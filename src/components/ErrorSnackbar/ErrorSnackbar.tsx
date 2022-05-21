import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../app/store';
import { setAppErrorAC } from '../../app/app-reducer';
import {Snackbar, AlertProps} from "@material-ui/core";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <div>Error</div>

});

export const ErrorSnackbar: React.FC<> = () => {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const dispatch = useDispatch();
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}
