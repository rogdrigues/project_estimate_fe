import * as React from 'react';
import { Menu, MenuItem, MenuList, Paper, Divider, ListItemIcon, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


interface IProps {
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    handleMenuClose: () => void;
}

const UserMenu = (props: IProps) => {
    const { anchorEl, isMenuOpen, handleMenuClose } = props;
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
            <MenuItem onClick={() => console.log('Edit clicked')}>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => console.log('Delete clicked')}>
                <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
            </MenuItem>
        </Menu>
    );
};

export default UserMenu;
