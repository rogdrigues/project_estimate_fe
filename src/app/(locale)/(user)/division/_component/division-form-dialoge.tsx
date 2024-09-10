'use client';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { Division } from '@/types';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { deleteDivision, restoreDivision } from '@/services';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { forwardRef, ReactElement, Ref } from 'react';

interface IProps {
    open: boolean;
    onClose: () => void;
    division: Division | null;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DivisionFormDialog = (props: IProps) => {
    const { open, onClose, division } = props;
    const { triggerToast } = useToast();
    const router = useRouter();
    const onConfirm = async () => {
        try {
            const response = division?.deleted ? await restoreDivision(division?._id) : await deleteDivision(division?._id);

            if (response.EC === 0) {
                triggerToast(division?.deleted ? "Division restore successfully!" : "Division deleted successfully!", true)
                router.refresh();
                onClose();
            } else {
                triggerToast('Error handle the division', false);
            }
        } catch (error: any) {
            console.log('Error handle the division', error.message);
            triggerToast('There was an error handle the division', false);
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
            <DialogTitle sx={{ fontWeight: "bold" }}>{division?.deleted ? "Confirmed restore user" : "Confirmed deleted user"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {division?.deleted ? (
                        <>
                            This action will restore the division <strong>{division?.name}</strong> to the division list. Do you want to proceed?
                        </>) : (
                        <>
                            This action will delete the division <strong>{division?.name}</strong> from the division list. Do you want to proceed?
                        </>)}
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

export default DivisionFormDialog;
