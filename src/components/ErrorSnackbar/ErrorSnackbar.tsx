import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../app/store';
import { setAppErrorAC } from '../../app/app-reducer';
import {AlertProps, Snackbar} from "@material-ui/core";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <div>
        ERROR!
    </div>


    //<MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export function ErrorSnackbar() {

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
    );
}
