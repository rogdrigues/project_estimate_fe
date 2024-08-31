'use client'
import { useState, MouseEvent, useEffect } from 'react';
import { DataGrid, GridColumnVisibilityModel } from '@mui/x-data-grid';
import { UserMaster } from '@/types';
import IconButton from '@mui/material/IconButton';
import { GridRenderCellParams } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { columns } from '@/app/(locale)/(user)/user/_table-config/user-table-columns';
import UserMenu from '@/app/(locale)/(user)/user/_table-config/user-menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';

interface IProps {
    users: UserMaster[];
    paginate: any;
}

export default function UserTable(props: IProps) {
    const { users: rows } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMobile = useMediaQuery('(max-width:1300px)');
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
        <Box sx={{ flex: 1, position: 'relative' }}>
            <Box sx={{ inset: 0, position: 'absolute' }}>
                <DataGrid
                    autoHeight
                    rows={rowsWithIds}
                    loading={rows.length === 0 ? true : false}
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
    );
}
