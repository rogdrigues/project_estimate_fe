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
    department: Department | null;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DepartmentFormDialog = (props: IProps) => {
    const { open, onClose, department } = props;
    const { triggerToast } = useToast();
    const router = useRouter();
    const onConfirm = async () => {
        try {
            const response = department?.deleted ? await restoreDepartment(department?._id) : await deleteDepartment(department?._id);

            if (response.EC === 0) {
                triggerToast(department?.deleted ? "Department restore successfully!" : "Department deleted successfully!", true)
                router.refresh();
                onClose();
            } else {
                triggerToast('Error handle the department', false);
            }
        } catch (error: any) {
            console.log('Error handle the department', error.message);
            triggerToast('There was an error handle the department', false);
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
            <DialogTitle sx={{ fontWeight: "bold" }}>{department?.deleted ? "Confirmed restore user" : "Confirmed deleted user"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {department?.deleted ? (
                        <>
                            This action will restore the department <strong>{department?.name}</strong> to the department list. Do you want to proceed?
                        </>) : (
                        <>
                            This action will delete the department <strong>{department?.name}</strong> from the department list. Do you want to proceed?
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

export default DepartmentFormDialog;
