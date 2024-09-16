import { GridColDef } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import { GridRenderCellParams } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, flex: 1 },
    { field: 'displayName', headerName: 'Account', width: 175, flex: 2 },
    {
        field: 'profile',
        headerName: 'Full Name',
        description: 'This column displays the full name of the user.',
        flex: 3,
        sortable: true,
        width: 200,
        valueGetter: (params: any) => {
            return params?.fullName;
        },
    },
    {
        field: 'email', headerName: 'Email', width: 275, sortable: true, flex: 2
    },
    {
        field: 'role',
        headerName: 'Role',
        description: 'This column displays the role of the user.',
        width: 150,
        flex: 2,
        sortable: true,
        valueGetter: (params: any) => {
            return params?.roleName;
        }
    },
    {
        field: 'division',
        headerName: 'Division',
        description: 'This column displays the division of the user.',
        width: 100,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params?.code || 'N/A';
        }
    },
    {
        field: 'department',
        headerName: 'Department',
        description: 'This column displays the department of the user.',
        width: 130,
        flex: 1,
        sortable: true,
        valueGetter: (params: any) => {
            return params?.code || 'N/A';
        }
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        description: 'This column displays the phone number of the user.',
        width: 200,
        flex: 1,
        sortable: true,
        renderCell: (params: GridRenderCellParams) => {
            return params.row?.profile?.phoneNumber || 'N/A';
        }
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'This column displays the status of the user (Enabled/Disabled).',
        width: 150,
        sortable: true,
        flex: 1,
        renderCell: (params: GridRenderCellParams) => (
            !params.row.deleted ? (
                <span style={{ color: '#6550cf', display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlineIcon color="success" fontSize="small" style={{ marginRight: '4px', color: "#6550cf" }} />
                    Enabled
                </span>
            ) : (
                <span style={{ color: '#f90009', display: 'flex', alignItems: 'center' }}>
                    <BlockIcon color="error" fontSize="small" style={{ marginRight: '4px', color: '#f90009' }} />
                    Disabled
                </span>
            )
        )
    },
    {
        field: 'actions',
        headerName: 'Actions',
        description: 'This column displays the actions that can be performed on the user.',
        width: 70,
        flex: 1,
    },
];
