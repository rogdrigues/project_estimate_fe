import { GridColDef } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import { GridRenderCellParams } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        description: 'This column displays the ID of the assumption.',
        width: 70,
        flex: 1
    },
    {
        field: 'title',
        headerName: 'Title',
        description: 'This column displays the title of the assumption.',
        width: 125,
        flex: 1
    },
    {
        field: 'content',
        headerName: 'Content',
        description: 'This column displays the content of the assumption.',
        width: 175,
        flex: 2
    },
    {
        field: 'category',
        headerName: 'Category',
        description: 'This column displays the category of the assumption.',
        width: 100,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params?.CategoryName || 'N/A';
        }
    },
    {
        field: 'subCategory',
        headerName: 'Sub Category',
        description: 'This column displays the sub category of the assumption.',
        width: 200,
        flex: 2,
        sortable: true,
        renderCell: (params: GridRenderCellParams) => {
            return params?.row?.category?.SubCategory || 'N/A';
        }
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'This column displays the status of the department.',
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
        description: 'This column displays the actions that can be performed on the assumption.',
        width: 70,
        flex: 1,
    },
];
