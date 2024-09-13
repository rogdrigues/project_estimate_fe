'use client'
import { useState, MouseEvent, useEffect } from 'react';
import { DataGrid, GridColumnVisibilityModel } from '@mui/x-data-grid';
import { Category } from '@/types';
import IconButton from '@mui/material/IconButton';
import { GridRenderCellParams } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { columns } from '@/app/(locale)/(user)/category/_table_config/category-table-columns';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';
import ObjectRowMenu from '@/components/_table_form-config/object-row-menu';
import ObjectFormDialog from '@/components/_table_form-config/object-form-dialoge';
import { deleteCategory, restoreCategory } from '@/services';
import { CategoryFormModal } from './category-form-modal';

interface IProps {
    categories: Category[];
}

export default function CategoryTable(props: IProps) {
    const { categories: rows } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [dataView, setDataView] = useState<Category | null>(null);
    const isMobile = useMediaQuery('(max-width:1300px)');
    const [openDialog, setOpenDialog] = useState({
        openUpdate: false,
        openDialog: false,
    })
    const open = Boolean(anchorEl);

    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        title: true,
        content: true,
        category: true,
        subCategory: true,
        status: true,
    });

    useEffect(() => {
        setColumnVisibilityModel((prevModel) => ({
            ...prevModel,
            subCategory: !isMobile,
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
                                            <ObjectRowMenu
                                                anchorEl={anchorEl}
                                                isMenuOpen={open}
                                                handleMenuClose={handleMenuClose}
                                                SetOpenUpdateModal={() => setOpenDialog({ ...openDialog, openUpdate: true })}
                                                SetOpenDialog={() => setOpenDialog({ ...openDialog, openDialog: true })}
                                                objectStatus={dataView?.deleted}
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
            <ObjectFormDialog
                open={openDialog.openDialog}
                onClose={() => setOpenDialog(prev => ({ ...prev, openDialog: false }))}
                Object={dataView}
                markWord='category'
                restoreFunction={restoreCategory}
                deleteFunction={deleteCategory}
            />
            <CategoryFormModal
                open={openDialog.openUpdate}
                setOpen={(isOpen) => setOpenDialog(prev => ({ ...prev, openUpdate: isOpen }))}
                category={dataView}
            />
        </>
    );
}
