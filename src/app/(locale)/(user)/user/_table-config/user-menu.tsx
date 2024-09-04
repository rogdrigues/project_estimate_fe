import * as React from 'react';
import { Menu, MenuItem, MenuList, Paper, Divider, ListItemIcon, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';

interface IProps {
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    handleMenuClose: () => void;
    SetOpenUpdateModal: (value: boolean) => void;
    SetOpenDialog: (value: boolean) => void;
    userStatus: boolean;
}

const UserMenu = (props: IProps) => {
    const { anchorEl, isMenuOpen, handleMenuClose, SetOpenUpdateModal, SetOpenDialog, userStatus } = props;
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
            {!userStatus ? (
                <>
                    <MenuItem onClick={() => {
                        SetOpenUpdateModal(true)
                        handleMenuClose();
                    }}>
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => {
                        SetOpenDialog(true);
                        handleMenuClose();
                    }}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </>
            ) : (
                <MenuItem onClick={() => {
                    SetOpenDialog(true);
                    handleMenuClose();
                }}>
                    <ListItemIcon>
                        <RestoreIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Restore</ListItemText>
                </MenuItem>
            )}
        </Menu>
    );
};

export default UserMenu;
