import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        description: 'This column displays the ID of the Template.',
        width: 100,
        sortable: true,
    },
    {
        field: 'name',
        headerName: 'Name',
        description: 'This column displays the name of the Template.',
        width: 200,
        sortable: true,
        flex: 1,
    },
    {
        field: 'category',
        headerName: 'Category',
        description: 'This column displays the category of the Template.',
        width: 150,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params?.CategoryName || 'N/A';
        }
    },
    {
        field: 'filePath',
        headerName: 'File Name',
        description: 'This column displays the file name of the Template.',
        width: 200,
        sortable: true,
        flex: 3,
        valueGetter: (params: any) => {
            return params.split('\\').pop() || 'N/A';
        }
    },
    {
        field: 'description',
        headerName: 'Description',
        description: 'This column displays the description of the Template.',
        width: 200,
        sortable: true,
        flex: 2,
        valueGetter: (params: any) => {
            return params || 'N/A';
        }
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'This column displays the status of the Template.',
        width: 150,
        sortable: true,
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            const status = params.value;
            let icon = null;
            let color = '';
            let label = '';

            switch (status) {
                case 'Draft':
                    icon = <HourglassEmptyIcon fontSize="small" style={{ marginRight: '4px', color: '#ffc107' }} />;
                    color = '#ffc107';
                    label = 'Draft';
                    break;
                case 'Published':
                    icon = <CheckCircleIcon fontSize="small" style={{ marginRight: '4px', color: '#28a745' }} />;
                    color = '#28a745';
                    label = 'Published';
                    break;
                case 'Archived':
                    icon = <CancelIcon fontSize="small" style={{ marginRight: '4px', color: '#dc3545' }} />;
                    color = '#dc3545';
                    label = 'Archived';
                    break;
                default:
                    icon = <BlockIcon fontSize="small" style={{ marginRight: '4px', color: '#6c757d' }} />;
                    color = '#6c757d';
                    label = 'Unknown';
                    break;
            }

            return (
                <span style={{ color, display: 'flex', alignItems: 'center' }}>
                    {icon}
                    {label}
                </span>
            );
        }
    },
    {
        field: 'version',
        headerName: 'Version',
        description: 'This column displays the version of the Template.',
        width: 100,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params || 'N/A';
        }
    },
    {
        field: 'actions',
        headerName: 'Actions',
        description: 'This column displays the actions that can be performed on the template.',
        width: 100,
        sortable: false,
        flex: 1,
    },
];
