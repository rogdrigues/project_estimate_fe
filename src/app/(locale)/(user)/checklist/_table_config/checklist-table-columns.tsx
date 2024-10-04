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
        field: 'category',
        headerName: 'Category',
        description: 'This column displays the category of the checklist.',
        flex: 1,
        minWidth: 150,
        valueGetter: (params: any) => {
            return params?.CategoryName || 'N/A';
        }
    },
    {
        field: 'name',
        headerName: 'Name',
        description: 'This column displays the name of the checklist.',
        flex: 1,
        minWidth: 150,
    },
    {
        field: 'subClass',
        headerName: 'SubClass',
        description: 'This column displays the sub class of the checklist.',
        flex: 1,
        minWidth: 150,
        valueGetter: (params: any) => {
            return params || 'N/A';
        }
    },
    {
        field: 'assessment',
        headerName: 'Assessment',
        description: 'This column displays the assessment of the checklist.',
        flex: 1,
        minWidth: 150,
        valueGetter: (params: any) => {
            return params || 'N/A';
        }
    },
    {
        field: 'priority',
        headerName: 'Priority',
        description: 'This column displays the priority of the checklist.',
        flex: 1,
        minWidth: 120,
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'This column displays the status of the checklist.',
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
        description: 'This column displays the actions that can be performed on the checklist.',
        width: 70,
        flex: 1,
    },
];
