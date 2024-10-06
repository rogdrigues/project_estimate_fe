import { GridColDef } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import { GridRenderCellParams } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    {
        field: '_id',
        headerName: 'ID',
    },
    {
        field: 'id',
        headerName: 'ID',
        description: 'This column displays the ID of the resource.',
        width: 70,
        flex: 1
    },
    {
        field: 'name',
        headerName: 'Name',
        description: 'This column displays the name of the resource.',
        width: 175,
        flex: 2,
    },
    {
        field: 'unitPrice',
        headerName: 'Unit Price',
        description: 'This column displays the unit price of the resource.',
        width: 175,
        flex: 2,
    },
    {
        field: 'location',
        headerName: 'Location',
        description: 'This column displays the location of the resource.',
        width: 275,
        sortable: true,
        flex: 2
    },
    {
        field: 'level',
        headerName: 'Level',
        description: 'This column displays the level of the resource.',
        width: 200,
        flex: 1,
        sortable: true
    },
    {
        field: 'currency',
        headerName: 'Currency',
        description: 'This column displays the currency of the resource.',
        width: 150,
        flex: 1,
        sortable: true
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        description: 'This column displays the quantity of the resource.',
        width: 150,
        flex: 1,
        sortable: true
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
