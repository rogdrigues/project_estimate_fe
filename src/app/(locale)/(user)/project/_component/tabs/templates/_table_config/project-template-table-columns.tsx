import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import moment from 'moment';

export const columns: GridColDef[] = [
    {
        field: 'dateChanged',
        headerName: 'Date Changed',
        description: 'This column displays the date when changes were made.',
        width: 150,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params ? moment(params.value).format('YYYY-MM-DD') : 'N/A';
        }
    },
    {
        field: 'versionNumber',
        headerName: 'Version Number',
        description: 'This column displays the version number of the template.',
        width: 100,
        sortable: true,
        flex: 1,
    },
    {
        field: 'action',
        headerName: 'Action',
        description: 'This column displays the action taken on the template.',
        width: 150,
        sortable: true,
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            const action = params.value;
            let icon = null;
            let color = '';
            let label = '';

            switch (action) {
                case 'A':
                    icon = <CheckCircleIcon fontSize="small" style={{ marginRight: '4px', color: '#28a745' }} />;
                    color = '#28a745';
                    label = 'Added';
                    break;
                case 'M':
                    icon = <HourglassEmptyIcon fontSize="small" style={{ marginRight: '4px', color: '#ffc107' }} />;
                    color = '#ffc107';
                    label = 'Modified';
                    break;
                case 'D':
                    icon = <CancelIcon fontSize="small" style={{ marginRight: '4px', color: '#dc3545' }} />;
                    color = '#dc3545';
                    label = 'Deleted';
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
        },
    },
    {
        field: 'changes',
        headerName: 'Changes',
        description: 'This column displays the details of changes made to the template.',
        width: 300,
        sortable: false,
        flex: 2,
        valueGetter: (params: any) => {
            return params || 'N/A';
        }
    }
];