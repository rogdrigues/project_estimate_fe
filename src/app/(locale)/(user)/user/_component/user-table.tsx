'use client'
import { useState, MouseEvent, useEffect } from 'react';
import { DataGrid, GridColumnVisibilityModel } from '@mui/x-data-grid';
import { Department, Division, Role, UserMaster } from '@/types';
import IconButton from '@mui/material/IconButton';
import { GridRenderCellParams } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { columns } from '@/app/(locale)/(user)/user/_table-config/user-table-columns';
import UserMenu from '@/app/(locale)/(user)/user/_table-config/user-menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';
import { UserFormModal } from './user-form-modal';
import UserFormDialog from './user-form-dialoge';

interface IProps {
    users: UserMaster[];
    paginate: any;
    divisions: Division[];
    departments: Department[];
    roles: Role[];
}

export default function UserTable(props: IProps) {
    const { users: rows, divisions, departments, roles } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [dataView, setDataView] = useState<UserMaster | null>(null);
    const isMobile = useMediaQuery('(max-width:1300px)');
    const [openDialog, setOpenDialog] = useState({
        openUpdate: false,
        openDialog: false,
    })
    const open = Boolean(anchorEl);

    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        email: true,
        role: true,
        division: true,
        department: true,
        phoneNumber: true,
        status: true,
        actions: true,
    });

    useEffect(() => {
        setColumnVisibilityModel((prevModel) => ({
            ...prevModel,
            division: !isMobile,
            department: !isMobile,
            phoneNumber: !isMobile,
            status: !isMobile,
            role: !isMobile,
        }));
    }, [isMobile]);

    const handleClick = (event: MouseEvent<HTMLElement>, params: GridRenderCellParams) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const rowsWithIds = rows.map((row, index) => ({
        ...row,
        id: index + 1,
    }));


    return (
        <>
            <Box sx={{ flex: 1, position: 'relative' }}>
                <Box sx={{ inset: 0, position: 'absolute' }}>
                    <DataGrid
                        autoHeight
                        rows={rowsWithIds}
                        loading={rows.length === 0 ? true : false}
                        onRowClick={(params) => setDataView(params.row)}
                        columns={columns.map(col =>
                            col.field === 'actions'
                                ? {
                                    ...col,
                                    renderCell: (params: any) => (
                                        <>
                                            <IconButton aria-label="more" onClick={(event) => handleClick(event, params)}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            <UserMenu
                                                anchorEl={anchorEl}
                                                isMenuOpen={open}
                                                handleMenuClose={handleMenuClose}
                                                SetOpenUpdateModal={(isOpen) => setOpenDialog(prev => ({ ...prev, openUpdate: isOpen }))}
                                                SetOpenDialog={(isOpen) => setOpenDialog(prev => ({ ...prev, openDialog: isOpen }))}
                                                userStatus={dataView?.deleted}
                                            />
                                        </>
                                    )
                                }
                                : col
                        )}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        columnVisibilityModel={columnVisibilityModel}

                        onColumnVisibilityModelChange={(newModel: Partial<GridColumnVisibilityModel>) =>
                            setColumnVisibilityModel((prevModel) => ({ ...prevModel, ...newModel }))
                        }
                        sx={{
                            '& .MuiDataGrid-cell:focus': {
                                outline: 'none',
                                border: 'none',
                            },
                            '& .MuiDataGrid-cell:focus-within': {
                                outline: 'none',
                                border: 'none',
                            },
                        }}
                    />
                </Box>
            </Box>
            <UserFormModal
                divisions={divisions}
                departments={departments}
                roles={roles}
                open={openDialog.openUpdate}
                setOpen={(isOpen) => setOpenDialog(prev => ({ ...prev, openUpdate: isOpen }))}
                User={dataView}
            />
            <UserFormDialog
                open={openDialog.openDialog}
                onClose={() => setOpenDialog(prev => ({ ...prev, openDialog: false }))}
                user={dataView}
            />
        </>
    );
}
