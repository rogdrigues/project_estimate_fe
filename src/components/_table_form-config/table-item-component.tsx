import { useState, MouseEvent, useEffect, ReactNode } from 'react';
import { DataGrid, GridColumnVisibilityModel, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import { GridRenderCellParams } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useMediaQuery from '@mui/material/useMediaQuery';
import ObjectRowMenu from '@/components/_table_form-config/object-row-menu';
import ObjectFormDialog from '@/components/_table_form-config/object-form-dialoge';

interface IProps<T> {
    rows: T[];
    columns: any[];
    onRestore: (id: string) => Promise<any>;
    onDelete: (id: string) => Promise<any>;
    markWord: string;
    initialVisibility: GridColumnVisibilityModel;
    openUpdate: boolean;
    setOpenUpdate: (isOpen: boolean) => void;
    hiddenColumnsOnMobile: string[];
    currentPage: string;
    optionReview?: ReactNode;
    children: ReactNode;
    dataView: T | null;
    setDataView: (data: T) => void;
    openReview?: boolean;
    setOpenReview?: (isOpen: boolean) => void;
}

export default function TableComponent<T>(props: IProps<T>) {
    const { rows, columns, onRestore, onDelete, markWord, initialVisibility, children, openUpdate, setOpenUpdate, dataView, setDataView, hiddenColumnsOnMobile, openReview, setOpenReview, optionReview, currentPage } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMobile = useMediaQuery('(max-width:1300px)');
    const [openDialog, setOpenDialog] = useState(false);

    const open = Boolean(anchorEl);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>(initialVisibility);

    useEffect(() => {
        setColumnVisibilityModel((prevModel) => {
            const newModel = { ...prevModel };
            hiddenColumnsOnMobile.forEach((col) => {
                if (col === '_id') {
                    newModel[col] = false;
                }
                newModel[col] = !isMobile;
            });
            return newModel;
        });
    }, [isMobile, hiddenColumnsOnMobile]);

    const handleClick = (event: MouseEvent<HTMLElement>, params: GridRenderCellParams) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const rowsWithIds = rows.length > 0
        ? rows.map((row, index) => ({
            ...row,
            id: index + 1,
        }))
        : [];

    return (
        <>
            <Box sx={{ flex: 1, position: 'relative' }}>
                <Box sx={{ inset: 0, position: 'absolute' }}>
                    <DataGrid
                        slots={(currentPage !== 'opportunity' && currentPage !== 'presale_plan' && currentPage !== "review") ? { toolbar: GridToolbar } : {}}
                        autoHeight
                        rows={rowsWithIds}
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
                                                openUpdateModal={openUpdate}
                                                SetOpenUpdateModal={() => setOpenUpdate(!openUpdate)}
                                                SetOpenDialog={() => setOpenDialog(true)}
                                                dataView={dataView}
                                                entity={currentPage}
                                                SetOpenReview={setOpenReview}
                                                openReviewModal={openReview}
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
                            //@ts-ignore
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
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                Object={dataView}
                markWord={markWord}
                restoreFunction={() => onRestore((dataView as any)?._id)}
                deleteFunction={() => onDelete((dataView as any)?._id)}
            />

            {openReview && optionReview}

            {children}
        </>
    );
}
