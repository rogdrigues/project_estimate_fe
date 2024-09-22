import * as React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import { useSession } from 'next-auth/react';
import RateReviewIcon from '@mui/icons-material/RateReview';
interface IProps {
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    handleMenuClose: () => void;
    openUpdateModal?: boolean;
    SetOpenUpdateModal: (value: boolean) => void;
    SetOpenDialog: (value: boolean) => void;
    objectStatus: boolean;
    entity: string;
    SetOpenReview?: (value: boolean) => void;
    openReviewModal?: boolean;
}

const ObjectRowMenu = (props: IProps) => {
    const { anchorEl, isMenuOpen, handleMenuClose, SetOpenUpdateModal, SetOpenDialog, objectStatus, openUpdateModal, entity, SetOpenReview, openReviewModal } = props;
    const { data: session } = useSession();

    const userPermissions = session?.user?.role?.permissions || [];
    const hasPermission = (permissionTag: string) => userPermissions.includes(permissionTag);

    const isOpportunityPage = entity === 'opportunity' && session?.user?.role?.roleName === 'Opportunity';

    return (
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
            {isOpportunityPage ? (
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
            ) : (
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
    );
};

export default ObjectRowMenu;
