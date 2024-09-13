import { GridColDef } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import { GridRenderCellParams } from '@mui/x-data-grid';

//Category Table Columns
export const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        description: 'This column displays the ID of the category.',
        width: 70,
        flex: 1
    },
    {
        field: 'CategoryName',
        headerName: 'Name',
        description: 'This column displays the name of the category.',
        width: 125,
        flex: 2
    },
    {
        field: 'SubCategory',
        headerName: 'Sub category',
        description: 'This column displays the sub category of the category.',
        width: 175,
        flex: 2
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'This column displays the status of the category.',
        width: 150,
        sortable: true,
        flex: 1,
        renderCell: (params: GridRenderCellParams) => (
            !params?.row?.deleted ? (
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
