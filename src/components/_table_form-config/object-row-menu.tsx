import * as React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';

interface IProps {
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    handleMenuClose: () => void;
    openUpdateModal?: boolean;
    SetOpenUpdateModal: (value: boolean) => void;
    SetOpenDialog: (value: boolean) => void;
    objectStatus: boolean;
}

const ObjectRowMenu = (props: IProps) => {
    const { anchorEl, isMenuOpen, handleMenuClose, SetOpenUpdateModal, SetOpenDialog, objectStatus, openUpdateModal } = props;
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
            {!objectStatus ?
                <Box>

                    <MenuItem onClick={() => {
                        SetOpenUpdateModal(!openUpdateModal);
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
                </Box>
                :
                <Box>
                    <MenuItem onClick={() => {
                        SetOpenDialog(true);
                        handleMenuClose();
                    }}>
                        <ListItemIcon>
                            <RestoreIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Restore</ListItemText>
                    </MenuItem>
                </Box>
            }
        </Menu>
    );
};

export default ObjectRowMenu;
