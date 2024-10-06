'use client';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { Department } from '@/types';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { deleteDepartment, restoreDepartment } from '@/services';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { forwardRef, ReactElement, Ref } from 'react';

interface IProps {
    open: boolean;
    onClose: () => void;
    Object: any;
    markWord: string;
    restoreFunction: (id: string) => Promise<any>;
    deleteFunction: (id: string) => Promise<any>;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ObjectFormDialog = (props: IProps) => {
    const { open, onClose, Object, markWord, restoreFunction, deleteFunction } = props;
    const { triggerToast } = useToast();
    const router = useRouter();
    const onConfirm = async () => {
        try {
            const response = Object?.deleted ? await restoreFunction(Object?._id) : await deleteFunction(Object?._id);

            if (response.EC === 0) {
                triggerToast(Object?.deleted ? `${markWord} restore successfully!` : `${markWord} deleted successfully!`, true)
                router.refresh();
                onClose();
            } else {
                triggerToast(`Error handle the ${markWord}`, false);
            }
        } catch (error: any) {
            triggerToast(`There was an error handle the ${markWord}`, false);
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
            <DialogTitle sx={{ fontWeight: "bold" }}>{Object?.deleted ? `Confirmed restore ${markWord}` : `Confirmed deleted ${markWord}`}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {Object?.deleted ? (
                        <>
                            This action will restore the {markWord} <strong>{Object?.name}</strong> to the {markWord} list. Do you want to proceed?
                        </>) : (
                        <>
                            This action will delete the {markWord} <strong>{Object?.name}</strong> from the {markWord} list. Do you want to proceed?
                        </>)}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="secondary" sx={{ marginRight: '8px' }}>
                    Cancel
                </Button>
                <Button disabled={Object?.status === 'Completed' ? true : false}
                    onClick={onConfirm} type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#7367F0' }}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ObjectFormDialog;
