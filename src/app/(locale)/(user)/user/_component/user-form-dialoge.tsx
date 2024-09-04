'use client';
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { UserMaster } from '@/types';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { deleteUser, restoreUser } from '@/services';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';

interface IProps {
    open: boolean;
    onClose: () => void;
    user: UserMaster | null;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UserFormDialog = (props: IProps) => {
    const { open, onClose, user } = props;
    const { triggerToast } = useToast();
    const router = useRouter();
    const onConfirm = async () => {
        try {
            const response = user?.deleted ? await restoreUser(user?._id) : await deleteUser(user?._id);

            if (response.EC === 0) {
                triggerToast(user?.deleted ? "User restore successfully!" : "User deleted successfully!", true)
                router.refresh();
                onClose();
            } else {
                triggerToast('Error handle the user', false);
            }
        } catch (error: any) {
            console.log('Error handle the user', error.message);
            triggerToast('There was an error handle the user', false);
        }
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ fontWeight: "bold" }}>{user?.deleted ? "Confirmed restore user" : "Confirmed deleted user"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {user?.deleted ? (
                        <>
                            This action will restore the user <strong>{user?.displayName}</strong> to the user list. Do you want to proceed?
                        </>
                    ) : (
                        <>
                            This action will delete the user <strong>{user?.displayName}</strong> from the user list. Do you want to proceed?
                        </>
                    )}

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="secondary" sx={{ marginRight: '8px' }}>
                    Cancel
                </Button>
                <Button onClick={onConfirm} type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#7367F0' }}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserFormDialog;
