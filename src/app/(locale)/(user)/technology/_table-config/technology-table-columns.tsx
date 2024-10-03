import { GridColDef } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import { GridRenderCellParams } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        description: 'This column displays the ID of the technology.',
        width: 100,
        sortable: true,
    },
    {
        field: 'name',
        headerName: 'Name',
        description: 'This column displays the name of the technology.',
        width: 200,
        flex: 1,
        sortable: true,
    },
    {
        field: 'version',
        headerName: 'Version',
        description: 'This column displays the version of the technology.',
        width: 150,
        flex: 1,
        sortable: true,
    },
    {
        field: 'category',
        headerName: 'Category',
        description: 'This column displays the category of the technology (Frontend, Backend, etc.).',
        width: 200,
        flex: 1,
        sortable: true,
    },
    {
        field: 'standard',
        headerName: 'Standard',
        description: 'This column displays the standard of the technology.',
        width: 150,
        flex: 2,
        sortable: true,
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'This column displays the status of the technology (Enabled/Disabled).',
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
        description: 'This column displays the actions that can be performed on the technology.',
        width: 70,
        flex: 1,
    },
];
