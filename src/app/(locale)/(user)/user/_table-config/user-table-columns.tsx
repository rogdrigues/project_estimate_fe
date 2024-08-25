import { GridColDef } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import { GridRenderCellParams } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'displayName', headerName: 'Account', width: 175 },
    {
        field: 'fullName',
        headerName: 'Full Name',
        description: 'This column displays the full name of the user.',
        sortable: false,
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return params.row.profile?.fullName || 'N/A';
        }
    },
    { field: 'email', headerName: 'Email', width: 275 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'division', headerName: 'Division', width: 100 },
    { field: 'department', headerName: 'Department', width: 130 },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        description: 'This column displays the phone number of the user.',
        sortable: false,
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return params.row.profile?.phoneNumber || 'N/A';
        }
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: (params: GridRenderCellParams) => (
            params.value ? (
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
        width: 100,
    },
];
