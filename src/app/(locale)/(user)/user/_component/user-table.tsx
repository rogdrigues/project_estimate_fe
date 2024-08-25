'use client'
import { useEffect, useState, MouseEvent } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { UserMaster } from '@/types';
import IconButton from '@mui/material/IconButton';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { getAllUsers } from '@/services';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { columns } from '@/app/(locale)/(user)/user/_table-config/user-table-columns';
import UserMenu from '@/app/(locale)/(user)/user/_table-config/user-menu';

const rows: UserMaster[] = [
    {
        id: '1',
        displayName: 'user123',
        username: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        division: 'FSU1',
        department: 'D1',
        profile: {
            fullName: 'John DoeJab',
            dateOfBirth: new Date('1990-01-01'),
            gender: 'Male',
            phoneNumber: '123-456-7890',
            location: 'Hanoi, Vietnam',
            avatar: 'https://via.placeholder.com/150',
        },
        status: true,
        lastLogin: new Date('2021-12-31T23:59:59'),
    }
];

export default function UserTable() {
    const [users, setUsers] = useState<UserMaster[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>, params: GridRenderCellParams) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: UserMaster = await getAllUsers();
                console.log('data:', data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // const renderMenu = (
    //     <Menu
    //         anchorEl={anchorEl}
    //         anchorOrigin={{
    //             vertical: 'bottom',
    //             horizontal: 'left',
    //         }}
    //         transformOrigin={{
    //             vertical: 'top',
    //             horizontal: 'left',
    //         }}
    //         open={open}
    //         onClose={handleMenuClose}
    //         sx={{
    //             mt: '10px',
    //             '& .MuiPaper-root': {
    //                 minWidth: '150px',
    //             },
    //         }}
    //     >
    //         <MenuItem onClick={() => console.log('Edit clicked')}>
    //             <ListItemIcon>
    //                 <EditIcon fontSize="small" />
    //             </ListItemIcon>
    //             <ListItemText>Edit</ListItemText>
    //         </MenuItem>
    //         <MenuItem onClick={() => console.log('Delete clicked')}>
    //             <ListItemIcon>
    //                 <DeleteIcon fontSize="small" />
    //             </ListItemIcon>
    //             <ListItemText>Delete</ListItemText>
    //         </MenuItem>
    //     </Menu>
    // );

    // const columns: GridColDef[] = [
    //     { field: 'id', headerName: 'ID', width: 70 },
    //     { field: 'displayName', headerName: 'Account', width: 175 },
    //     {
    //         field: 'fullName',
    //         headerName: 'Full Name',
    //         description: 'This column displays the full name of the user.',
    //         sortable: false,
    //         width: 200,
    //         renderCell: (params: GridRenderCellParams) => {
    //             return params.row.profile?.fullName || 'N/A';
    //         }
    //     },
    //     { field: 'email', headerName: 'Email', width: 275 },
    //     { field: 'role', headerName: 'Role', width: 150 },
    //     { field: 'division', headerName: 'Division', width: 100 },
    //     { field: 'department', headerName: 'Department', width: 130 },
    //     {
    //         field: 'phoneNumber',
    //         headerName: 'Phone Number',
    //         description: 'This column displays the phone number of the user.',
    //         sortable: false,
    //         width: 200,
    //         renderCell: (params: GridRenderCellParams) => {
    //             return params.row.profile?.phoneNumber || 'N/A';
    //         }
    //     },
    //     {
    //         field: 'status',
    //         headerName: 'Status',
    //         width: 150,
    //         renderCell: (params: GridRenderCellParams) => (
    //             params.value ? (
    //                 <span style={{ color: '#6550cf', display: 'flex', alignItems: 'center' }}>
    //                     <CheckCircleOutlineIcon color="success" fontSize="small" style={{ marginRight: '4px', color: "#6550cf" }} />
    //                     Enabled
    //                 </span>
    //             ) : (
    //                 <span style={{ color: '#f90009', display: 'flex', alignItems: 'center' }}>
    //                     <BlockIcon color="error" fontSize="small" style={{ marginRight: '4px', color: '#f90009' }} />
    //                     Disabled
    //                 </span>
    //             )
    //         )
    //     },
    //     {
    //         field: 'actions',
    //         headerName: 'Actions',
    //         width: 100,
    //         renderCell: (params: GridRenderCellParams) => (
    //             <>
    //                 <IconButton aria-label="more" onClick={(event) => handleClick(event, params)}>
    //                     <MoreVertIcon />
    //                 </IconButton>
    //                 {renderMenu}
    //             </>
    //         ),
    //     },
    // ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns.map(col =>
                    col.field === 'actions'
                        ? {
                            ...col,
                            renderCell: (params: any) => (
                                <>
                                    <IconButton aria-label="more" onClick={(event) => handleClick(event, params)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <UserMenu
                                        anchorEl={anchorEl}
                                        isMenuOpen={open}
                                        handleMenuClose={handleMenuClose}
                                    />
                                </>
                            )
                        }
                        : col
                )}
                loading={loading}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                sx={{
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell:focus-within': {
                        outline: 'none',
                        border: 'none',
                    },
                }}
            />
        </div>
    );
}
