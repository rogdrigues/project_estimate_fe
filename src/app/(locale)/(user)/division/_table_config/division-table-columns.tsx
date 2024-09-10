import { GridColDef } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import { GridRenderCellParams } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        description: 'This column displays the ID of the division.',
        width: 70,
        flex: 1
    },
    {
        field: 'code',
        headerName: 'Code',
        description: 'This column displays the code of the division.',
        width: 175,
        flex: 2
    },
    {
        field: 'name',
        headerName: 'Name',
        description: 'This column displays the name of the division.',
        width: 175,
        flex: 2
    },
    {
        field: 'description',
        headerName: 'Description',
        description: 'This column displays the description of the division.',
        width: 275,
        sortable: true,
        flex: 2
    },
    {
        field: 'lead',
        headerName: 'Lead',
        description: 'This column displays the lead of the division.',
        width: 200,
        flex: 1,
        sortable: true,
        renderCell: (params: GridRenderCellParams) => {
            return params.row?.lead?.username || 'N/A';
        }
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'This column displays the status of the division.',
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
        width: 70,
        flex: 1,
    },
];
