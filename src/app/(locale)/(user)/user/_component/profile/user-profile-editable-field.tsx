import React from 'react';
import { Box, Typography, Avatar, IconButton, TextField, MenuItem, Select, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { flexBoxSpaceBetween, flexGap } from '@/styles';



interface EditableFieldProps {
    label: string;
    value: string;
    isEditing: boolean;
    onChange: (e: any) => void;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
    type?: string;
    isSelect?: boolean;
    selectOptions?: { value: string; label: string }[];
}

const EditableField = ({
    label,
    value,
    isEditing,
    onChange,
    onEdit,
    onSave,
    onCancel,
    type = 'text',
    isSelect = false,
    selectOptions = [],
}: EditableFieldProps) => {
    return (
        <Box sx={flexBoxSpaceBetween}>
            <Box sx={{ width: '80%' }}>
                <Typography variant="body2">{label}</Typography>
                {isEditing ? (
                    isSelect ? (
                        <FormControl fullWidth size="small" variant="standard">
                            <Select value={value} onChange={onChange}>
                                {selectOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : (
                        <TextField
                            type={type}
                            value={value}
                            onChange={onChange}
                            fullWidth
                            size="small"
                            variant="standard"
                        />
                    )
                ) : (
                    <Typography variant="body1">{value || `No ${label.toLowerCase()} provided`}</Typography>
                )}
            </Box>
            <Box sx={flexGap}>
                {isEditing ? (
                    <>
                        <IconButton onClick={onSave}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton onClick={onCancel}>
                            <CloseIcon />
                        </IconButton>
                    </>
                ) : (
                    <IconButton onClick={onEdit}>
                        <EditIcon />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};

export default EditableField;