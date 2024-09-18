import { GridColDef } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import { GridRenderCellParams } from '@mui/x-data-grid';

//productivity Table Columns
export const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        description: 'This column displays the ID of the productivity.',
        width: 100,
        sortable: true,
    },
    {
        field: 'productivity',
        headerName: 'Productivity',
        description: 'This column displays the productivity of the productivity.',
        width: 150,
        sortable: true,
    },
    {
        field: 'technology',
        headerName: 'Technology',
        description: 'This column displays the technology of the productivity.',
        width: 200,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params?.name || "N/A";
        }
    },
    {
        field: 'norm',
        headerName: 'Norm',
        description: 'This column displays the norm of the productivity.',
        width: 150,
        sortable: true,
    },
    {
        field: 'unit',
        headerName: 'Unit',
        description: 'This column displays the unit of the productivity.',
        width: 150,
        sortable: true,
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'This column displays the status of the productivity.',
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
        description: 'This column displays the actions that can be performed on the productivity.',
        width: 70,
        flex: 1,
    },
];
