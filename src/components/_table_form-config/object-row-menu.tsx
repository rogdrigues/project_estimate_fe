import * as React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import { useSession } from 'next-auth/react';
import RateReviewIcon from '@mui/icons-material/RateReview';
import WarningModal from '@/components/_table_form-config/modal-warning-table-component';
import moment from 'moment';

interface IProps {
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    handleMenuClose: () => void;
    openUpdateModal?: boolean;
    SetOpenUpdateModal: (value: boolean) => void;
    SetOpenDialog: (value: boolean) => void;
    entity: string;
    SetOpenReview?: (value: boolean) => void;
    openReviewModal?: boolean;
    dataView?: any;
}

const ObjectRowMenu = (props: IProps) => {
    const {
        anchorEl, isMenuOpen, handleMenuClose, SetOpenUpdateModal, SetOpenDialog, openUpdateModal,
        entity, SetOpenReview, openReviewModal, dataView } = props;

    //Oppurtunity status
    const opportunityStatus = dataView?.approvalStatus;
    const objectStatus = dataView?.deleted;
    const timeLeftForOpportunity = dataView?.createdAt;

    const { data: session } = useSession();
    const [showWarning, setShowWarning] = React.useState(false);
    const [action, setAction] = React.useState<'edit' | 'delete' | 'restore' | null>(null);

    const userPermissions = session?.user?.role?.permissions || [];
    const hasPermission = (permissionTag: string) => userPermissions.includes(permissionTag);

    const isOpportunityLead = entity === 'opportunity' && session?.user?.role?.roleName === 'Opportunity';
    const isPresaleRole = entity === 'opportunity' && session?.user?.role?.roleName.startsWith('Presale');

    const timeLeft = moment().diff(moment(timeLeftForOpportunity), 'minutes');
    const isTimeExceeded = timeLeft > 60;

    const handleActionWithWarning = (selectedAction: 'edit' | 'delete' | 'restore') => {
        if (isPresaleRole) {
            setShowWarning(true);
            setAction(selectedAction);
        } else {
            executeAction(selectedAction);
        }
    };

    const executeAction = (selectedAction: 'edit' | 'delete' | 'restore') => {
        if (selectedAction === 'edit') SetOpenUpdateModal(!openUpdateModal);
        if (selectedAction === 'delete') SetOpenDialog(true);
        if (selectedAction === 'restore') SetOpenDialog(true);
        setShowWarning(false);
    };

    const isDisabledForPresale = opportunityStatus === 'Approved' && isPresaleRole;
    const isRejectedOpportunity = opportunityStatus === 'Rejected';

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
                sx={{
                    mt: '10px',
                    '& .MuiPaper-root': {
                        minWidth: '150px',
                    },
                }}
            >
                {isOpportunityLead && (
                    <MenuItem
                        onClick={() => {
                            SetOpenReview && SetOpenReview(!openReviewModal);
                            handleMenuClose();
                        }}
                    >
                        <ListItemIcon>
                            <RateReviewIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Review</ListItemText>
                    </MenuItem>
                )}

                {isPresaleRole && isRejectedOpportunity ? (
                    <MenuItem
                        onClick={() => {
                            SetOpenUpdateModal(!openUpdateModal);
                            handleMenuClose();
                        }}
                    >
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit to Submit</ListItemText>
                    </MenuItem>
                ) : isPresaleRole && (
                    <>
                        {isDisabledForPresale ? (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        handleActionWithWarning('edit');
                                        handleMenuClose();
                                    }}
                                    disabled={isDisabledForPresale}
                                >
                                    <ListItemIcon>
                                        <EditIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>This opportunity had been granted</ListItemText>
                                </MenuItem>
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        handleActionWithWarning('edit');
                                        handleMenuClose();
                                    }}
                                    disabled={isTimeExceeded || isDisabledForPresale}
                                >
                                    <ListItemIcon>
                                        <EditIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Edit</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleActionWithWarning('delete');
                                        handleMenuClose();
                                    }}
                                    disabled={isTimeExceeded || isDisabledForPresale}
                                >
                                    <ListItemIcon>
                                        <DeleteIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                </MenuItem>
                            </>
                        )}
                    </>
                )}

                {!isPresaleRole && !isOpportunityLead && (
                    <Box>
                        {!objectStatus && hasPermission(`manage_${entity}`) && (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        SetOpenUpdateModal(!openUpdateModal);
                                        handleMenuClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <EditIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Edit</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        SetOpenDialog(true);
                                        handleMenuClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <DeleteIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                </MenuItem>
                            </>
                        )}
                        {objectStatus && hasPermission(`manage_${entity}`) && (
                            <MenuItem
                                onClick={() => {
                                    SetOpenDialog(true);
                                    handleMenuClose();
                                }}
                            >
                                <ListItemIcon>
                                    <RestoreIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Restore</ListItemText>
                            </MenuItem>
                        )}
                    </Box>
                )}
            </Menu>

            {isPresaleRole && (
                <WarningModal
                    open={showWarning}
                    handleClose={() => setShowWarning(false)}
                    message="You only have 1 hour to edit, delete, or restore this opportunity!"
                    handleConfirm={() => executeAction(action!)}
                />
            )}
        </>
    );
};

export default ObjectRowMenu;
