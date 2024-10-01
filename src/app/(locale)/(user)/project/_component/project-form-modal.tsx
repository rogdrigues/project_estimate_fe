'use client';
import * as React from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, MenuItem, Divider, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Category, Opportunity, Project, Template, UserMaster } from '@/types';
import { createProject, updateProject } from '@/services';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styleFormUser } from '@/styles';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    project?: Project | null;
    categories: Category[];
    opportunities: Opportunity[];
    templates: Template[];
    reviewers: UserMaster[];
}

export const ProjectFormModal = (props: IProps) => {
    const router = useRouter();
    const { open, setOpen, project, categories, opportunities, templates, reviewers } = props;
    const { triggerToast } = useToast();
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            name: '',
            description: '',
            category: '',
            opportunity: '',
            template: '',
            reviewer: '',
        },
    });

    const onSubmit = async (data: Project) => {
        const formData = {
            name: data.name,
            description: data.description,
            category: data.category,
            opportunity: data.opportunity,
            template: data.template,
            reviewer: data.reviewer,
        };

        try {
            const response = project
                ? await updateProject(project._id, formData)
                : await createProject(formData);

            if (response.EC === 0) {
                router.refresh();
                triggerToast(project ? "Project updated successfully" : "Project created successfully", true);
                setOpen(false);
                reset();
            } else {
                triggerToast(project ? `Error updated project: ${response.message}` : `Error creating project: ${response.message}`, false);
            }
        } catch (error: any) {
            triggerToast(project ? `Error updated project: ${error.message}` : `Error creating project: ${error.message}`, false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    React.useEffect(() => {
        if (project) {
            reset(project);
        } else {
            reset({
                name: '',
                description: '',
                category: '',
                opportunity: '',
                template: '',
                reviewer: '',
            });
        }
    }, [project, reset]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={styleFormUser}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>{project ? "Update Project" : "Create new Project"}</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ marginBottom: '16px' }} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={project?.name || ""}
                            rules={{ required: 'Name is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    error={!!error}
                                    inputProps={{ fontSize: '14px' }}
                                    InputLabelProps={{ style: { fontSize: '14px' } }}
                                    helperText={error ? error.message : ''}
                                    sx={{ marginBottom: '16px' }}
                                    size="small"
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            defaultValue={project?.description || ""}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    margin="normal"
                                    variant="outlined"
                                    inputProps={{ fontSize: '14px' }}
                                    InputLabelProps={{ style: { fontSize: '14px' } }}
                                    sx={{ marginBottom: '16px' }}
                                    size="small"
                                />
                            )}
                        />
                        <FormControl fullWidth required margin="normal" sx={{ marginBottom: '16px' }}>
                            <InputLabel id="category-select-label" style={{ fontSize: '14px', top: "-5px" }}>Category</InputLabel>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="category-select-label"
                                        label="Category"
                                        size='small'
                                        inputProps={{ fontSize: '14px' }}
                                        InputLabelProps={{ style: { fontSize: '14px' } }}
                                        value={field?.value?._id || ""}
                                        onChange={(e: SelectChangeEvent) => {
                                            const selectedCategory = categories.find(category => category._id === e.target.value);
                                            field.onChange(selectedCategory);
                                        }}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.CategoryName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                        <FormControl fullWidth required margin="normal" sx={{ marginBottom: '16px' }}>
                            <InputLabel id="opportunity-select-label" style={{ fontSize: '14px', top: "-5px" }}>Opportunity</InputLabel>
                            <Controller
                                name="opportunity"
                                control={control}
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="opportunity-select-label"
                                        label="Opportunity"
                                        size='small'
                                        inputProps={{ fontSize: '14px' }}
                                        InputLabelProps={{ style: { fontSize: '14px' } }}
                                        value={field?.value?._id || ""}
                                        onChange={(e: SelectChangeEvent) => {
                                            const selectedOpp = opportunities.find(opp => opp._id === e.target.value);
                                            field.onChange(selectedOpp);
                                        }}
                                    >
                                        {opportunities.length === 0 ? (
                                            <MenuItem value="" disabled>
                                                No Opportunities available. Create one first.
                                            </MenuItem>
                                        ) : (
                                            opportunities.map((opportunity) => (
                                                <MenuItem key={opportunity._id} value={opportunity._id}>
                                                    {opportunity.name}
                                                </MenuItem>
                                            ))
                                        )}
                                    </Select>
                                )}
                            />
                        </FormControl>
                        <FormControl fullWidth required margin="normal" sx={{ marginBottom: '16px' }}>
                            <InputLabel id="template-select-label" style={{ fontSize: '14px', top: "-5px" }}>Template</InputLabel>
                            <Controller
                                name="template"
                                control={control}
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="template-select-label"
                                        label="Template"
                                        size='small'
                                        inputProps={{ fontSize: '14px' }}
                                        InputLabelProps={{ style: { fontSize: '14px' } }}
                                        value={field?.value?._id || ""}
                                        onChange={(e: SelectChangeEvent) => {
                                            const selectedTemplate = templates.find(template => template._id === e.target.value);
                                            field.onChange(selectedTemplate);
                                        }}
                                    >
                                        {templates.length === 0 ?
                                            (<MenuItem value="" disabled>
                                                No template available
                                            </MenuItem>
                                            ) : (
                                                templates.map((template) => (
                                                    <MenuItem key={template._id} value={template._id}>
                                                        {template.name}
                                                    </MenuItem>
                                                ))
                                            )
                                        }
                                    </Select>
                                )}
                            />
                        </FormControl>
                        <FormControl fullWidth required margin="normal" sx={{ marginBottom: '16px' }}>
                            <InputLabel id="reviewer-select-label" style={{ fontSize: '14px', top: "-5px" }}>Reviewer</InputLabel>
                            <Controller
                                name="reviewer"
                                control={control}
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="reviewer-select-label"
                                        label="Reviewer"
                                        size='small'
                                        inputProps={{ fontSize: '14px' }}
                                        InputLabelProps={{ style: { fontSize: '14px' } }}
                                        value={field?.value?._id || ""}
                                        onChange={(e: SelectChangeEvent) => {
                                            const selectedUser = reviewers.find(user => user._id === e.target.value);
                                            field.onChange(selectedUser);
                                        }}
                                    >
                                        {reviewers.length === 0 ?
                                            (<MenuItem value="" disabled>
                                                No reviewer available
                                            </MenuItem>
                                            ) : (
                                                reviewers.map((reviewer) => (
                                                    <MenuItem key={reviewer._id} value={reviewer._id}>
                                                        {reviewer.username}
                                                    </MenuItem>
                                                ))
                                            )
                                        }
                                    </Select>
                                )}
                            />
                        </FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ marginRight: '8px' }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#7367F0' }}>
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};
