'use client'
import { useState, MouseEvent, useEffect } from 'react';
import { DataGrid, GridColumnVisibilityModel } from '@mui/x-data-grid';
import { Division, UserMaster } from '@/types';
import IconButton from '@mui/material/IconButton';
import { GridRenderCellParams } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { columns } from '@/app/(locale)/(user)/division/_table_config/division-table-columns';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';
import { DivisionFormModal } from './division-form-modal';
import DivisionFormDialog from './division-form-dialoge';
import DivisionMenu from '../_table_config/division-menu';

interface IProps {
    divisions: Division[];
    users: UserMaster[];
}

export default function DivisionTable(props: IProps) {
    const { divisions: rows, users } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [dataView, setDataView] = useState<Division | null>(null);
    const isMobile = useMediaQuery('(max-width:1300px)');
    const [openDialog, setOpenDialog] = useState({
        openUpdate: false,
        openDialog: false,
    })
    const open = Boolean(anchorEl);

    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        name: true,
        description: true,
        division: true,
        lead: true,
        code: true,
        status: true,
        actions: true,
    });

    useEffect(() => {
        setColumnVisibilityModel((prevModel) => ({
            ...prevModel,
            description: !isMobile,
            status: !isMobile,
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
                                            <DivisionMenu
                                                anchorEl={anchorEl}
                                                isMenuOpen={open}
                                                handleMenuClose={handleMenuClose}
                                                SetOpenUpdateModal={() => setOpenDialog({ ...openDialog, openUpdate: true })}
                                                SetOpenDialog={() => setOpenDialog({ ...openDialog, openDialog: true })}
                                                divisionStatus={dataView?.deleted}
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
            <DivisionFormModal
                open={openDialog.openUpdate}
                setOpen={(isOpen) => setOpenDialog(prev => ({ ...prev, openUpdate: isOpen }))}
                users={users}
                division={dataView}
            />
            <DivisionFormDialog
                open={openDialog.openDialog}
                onClose={() => setOpenDialog(prev => ({ ...prev, openDialog: false }))}
                division={dataView}
            />
        </>
    );
}
