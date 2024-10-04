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
        flex: 2,
        valueGetter: (params: any) => {
            //Also avoid some case when input just a space (need to strim it) or empty string
            return params || 'N/A';
        }
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
        description: 'This column displays the actions that can be performed on the category.',
        width: 70,
        flex: 1,
    },
];
