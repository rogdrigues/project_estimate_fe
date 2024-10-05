import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import moment from 'moment';

export const columns: GridColDef[] = [
    {
        field: '_id',
        headerName: 'ID',
    },
    {
        field: 'id',
        headerName: 'ID',
        description: 'This column displays the ID of the Project.',
        width: 100,
        sortable: true,
    },
    {
        field: 'name',
        headerName: 'Project Name',
        description: 'This column displays the name of the Project.',
        width: 150,
        sortable: true,
        flex: 1,
    },
    {
        field: 'category',
        headerName: 'Category',
        description: 'This column displays the category of the Project.',
        width: 150,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params?.CategoryName || "N/A";
        },
    },
    {
        field: 'opportunity',
        headerName: 'Opportunity',
        description: 'This column displays the opportunity of the Project.',
        width: 150,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params?.name || "N/A";
        },
    },
    {
        field: 'lead',
        headerName: 'Lead',
        description: 'This column displays the lead of the Project.',
        width: 150,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params?.username || "N/A";
        },
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        description: 'This column displays the date and time the Project was created.',
        width: 150,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params ? moment(params).format('YYYY-MM-DD') : 'N/A';
        },
    },
    {
        field: 'reviewer',
        headerName: 'Reviewer',
        description: 'This column displays the reviewer of the Project.',
        width: 150,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params?.username || "N/A";
        },
    },
    {
        field: 'deadline',
        headerName: 'Deadline',
        description: 'This column displays the deadline of the Project.',
        width: 150,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params ? moment(params).format('YYYY-MM-DD') : 'N/A';
        },
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'This column displays the status of the Project.',
        width: 150,
        sortable: true,
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            const status = params.value;
            let icon = null;
            let color = '';
            let label = '';

            switch (status) {
                case 'Completed':
                    icon = <CheckCircleIcon fontSize="small" style={{ marginRight: '4px', color: '#28a745' }} />;
                    color = '#28a745';
                    label = 'Completed';
                    break;
                case 'Archive':
                    icon = <BlockIcon fontSize="small" style={{ marginRight: '4px', color: '#6c757d' }} />;
                    color = '#6c757d';
                    label = 'Archived';
                    break;
                case 'Rejected':
                    icon = <BlockIcon fontSize="small" style={{ marginRight: '4px', color: '#dc3545' }} />;
                    color = '#dc3545';
                    label = 'Rejected';
                    break;
                case 'In Review':
                    icon = <HourglassEmptyIcon fontSize="small" style={{ marginRight: '4px', color: '#17a2b8' }} />;
                    color = '#17a2b8';
                    label = 'In Review';
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
        field: 'actions',
        headerName: 'Actions',
        description: 'This column displays the actions that can be performed on the Project.',
        width: 70,
        flex: 1,
    },
];
