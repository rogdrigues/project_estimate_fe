import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import moment from 'moment';

export const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        description: 'This column displays the ID of the Presale Plan.',
        width: 100,
        sortable: true,
    },
    {
        field: 'department',
        headerName: 'Company',
        description: 'This column displays the company of the Presale Plan.',
        width: 150,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params?.code || "N/A";
        }
    },
    {
        field: 'division',
        headerName: 'Section',
        description: 'This column displays the section of the Presale Plan.',
        width: 150,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params?.code || "N/A";
        }
    },
    {
        field: 'description',
        headerName: 'Description',
        description: 'This column displays the description of the Presale Plan.',
        width: 150,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params || "N/A";
        }
    },
    {
        field: 'createdBy',
        headerName: 'Created By',
        description: 'This column displays the creator of the Presale Plan.',
        width: 150,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return params?.username || "N/A";
        }
    },
    {
        field: 'name',
        headerName: 'Presale Plan Name',
        description: 'This column displays the name of the Presale Plan.',
        width: 150,
        sortable: true,
        flex: 1,
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'This column displays the approval status of the Presale Plan.',
        width: 150,
        sortable: true,
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            const status = params.value;
            let icon = null;
            let color = '';
            let label = '';

            switch (status) {
                case 'Pending':
                    icon = <HourglassEmptyIcon fontSize="small" style={{ marginRight: '4px', color: '#ffc107' }} />;
                    color = '#ffc107';
                    label = 'Pending';
                    break;
                case 'Approved':
                    icon = <CheckCircleIcon fontSize="small" style={{ marginRight: '4px', color: '#28a745' }} />;
                    color = '#28a745';
                    label = 'Approved';
                    break;
                case 'Rejected':
                    icon = <CancelIcon fontSize="small" style={{ marginRight: '4px', color: '#dc3545' }} />;
                    color = '#dc3545';
                    label = 'Rejected';
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
        field: 'pendingUntil',
        headerName: 'Pending Until',
        description: 'This column displays the pending deadline of the Presale Plan.',
        width: 150,
        sortable: true,
        flex: 1,
        valueGetter: (params: any) => {
            return moment(params).format('YYYY-MM-DD') || "N/A";
        }
    },
    {
        field: 'version',
        headerName: 'Version',
        description: 'This column displays the version of the Presale Plan.',
        width: 150,
        sortable: true,
        flex: 1,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        description: 'This column displays the actions that can be performed on the opportunity.',
        width: 70,
        flex: 1,
    },
];
