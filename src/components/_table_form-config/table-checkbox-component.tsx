import { useState, useEffect } from 'react';
import { DataGrid, GridColumnVisibilityModel, GridRowSelectionModel } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';

interface IProps<T> {
    rows: T[];
    columns: any[];
    initialVisibility: GridColumnVisibilityModel;
    hiddenColumnsOnMobile: string[];
    onRowsSelected?: (selectedIds: string[]) => void;
    selectionRows: string[];
}

export default function TableComponentWithCheckbox<T>(props: IProps<T>) {
    const { rows, columns, initialVisibility, hiddenColumnsOnMobile, onRowsSelected, selectionRows } = props;
    const isMobile = useMediaQuery('(max-width:1300px)');
    const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>(initialVisibility);
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
    const [prevSelectionModel, setPrevSelectionModel] = useState<GridRowSelectionModel>([]);

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

    useEffect(() => {
        if (onRowsSelected && selectionModel !== prevSelectionModel) {
            onRowsSelected(selectionModel as string[]);
            setPrevSelectionModel(selectionModel);
        }
    }, [selectionModel]);

    useEffect(() => {
        if (selectionModel.length === 0 && selectionRows.length > 0) {
            setSelectionModel(selectionRows);
        }
    }, [selectionRows]);

    const rowWithIds = rows.length > 0
        ? rows.map((row, index) => ({
            ...row,
            id: index + 1,
        }))
        : [];


    return (
        <Box sx={{ flex: 1, position: 'relative' }}>
            <Box sx={{ inset: 0, position: 'absolute' }}>
                <DataGrid
                    autoHeight
                    rows={rowWithIds}
                    getRowId={(row: any) => row._id}
                    columns={columns.filter(col => col.field !== 'actions' && col.field !== 'status')}
                    checkboxSelection
                    disableRowSelectionOnClick
                    rowSelectionModel={selectionModel}
                    onRowSelectionModelChange={(newSelectionModel: GridRowSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
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
    );
}
