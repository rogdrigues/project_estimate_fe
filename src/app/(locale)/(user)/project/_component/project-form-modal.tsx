'use client';
import * as React from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, MenuItem, Divider, IconButton, Typography, Grid, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Category, Opportunity, Project, Template, UserMaster } from '@/types';
import { createProject, reuseProject, updateProject } from '@/services';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { BoxReused, checboxReUsed, flexEnd, flexSpaceBetween, mb16, mr8, styleFormUser } from '@/styles';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    project?: Project | null;
    categories: Category[];
    opportunities: Opportunity[];
    templates: Template[];
    reviewers: UserMaster[];
    onReusedProject?: boolean;
}

export const ProjectFormModal = (props: IProps) => {
    const router = useRouter();
    const { open, setOpen, project, categories, opportunities, templates, reviewers, onReusedProject = false } = props;
    const { triggerToast } = useToast();
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            name: '',
            description: '',
            category: '',
            opportunity: '',
            template: '',
            reviewer: '',
            reuseComponents: {
                resources: false,
                technologies: false,
                checklists: false,
                assumptions: false,
                productivity: false,
            },
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
            reuseComponents: onReusedProject ? data.reuseComponents : []
        };

        try {
            let response;

            if (onReusedProject) {
                response = await reuseProject(project?._id, formData);
            } else {
                response = project
                    ? await updateProject(project._id, formData)
                    : await createProject(formData);
            }
            if (response.EC === 0) {
                router.refresh();
                triggerToast(project ? onReusedProject ? 'Reused Project successfully' : 'Project updated successfully' : 'Project created successfully', true);
                setOpen(false);
                reset();
            } else {
                triggerToast(project ? onReusedProject ? `Error reused project: ${response.message}` : `Error updated project: ${response.message}` : `Error creating project: ${response.message}`, false);
            }
        } catch (error: any) {
            triggerToast(project ? onReusedProject ? `Error reused project: ${error.message}` : `Error updated project: ${error.message}` : `Error creating project: ${error.message}`, false);
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
                reuseComponents: {
                    resources: false,
                    technologies: false,
                    checklists: false,
                    assumptions: false,
                    productivity: false,
                },
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
                    <Box sx={flexSpaceBetween}>
                        <h2>{project ? (onReusedProject ? "Reused Project" : "Update Project") : "Create new Project"}</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={mb16} />
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
                                    helperText={error ? error.message : ''}
                                    sx={mb16}
                                    size="small"
                                    disabled={project?.status === 'Completed' ? true : false}
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
                                    sx={mb16}
                                    size="small"
                                    disabled={project?.status === 'Completed' ? true : false}
                                />
                            )}
                        />
                        <FormControl fullWidth required margin="normal" sx={mb16}>
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
                                        value={field?.value?._id || ""}
                                        disabled={project?.status === 'Completed' ? true : false}
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
                        <FormControl fullWidth required margin="normal" sx={mb16}>
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
                                        value={field?.value?._id || ""}
                                        disabled={project?.status === 'Completed' ? true : false}
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
                        <FormControl fullWidth required margin="normal" sx={mb16}>
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
                                        value={field?.value?._id || ""}
                                        disabled={project?.status === 'Completed' ? true : false}
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
                        <FormControl fullWidth required margin="normal" sx={mb16}>
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
                                        value={field?.value?._id || ""}
                                        disabled={project?.status === 'Completed' ? true : false}
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

                        {onReusedProject && (
                            <Box sx={BoxReused}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#4a4a4a' }}>
                                    Reuse Components
                                </Typography>
                                <Divider sx={mb16} />

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <FormControlLabel
                                            control={
                                                <Controller
                                                    name="reuseComponents.resources"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Checkbox
                                                            {...field}
                                                            checked={!!field.value}
                                                            onChange={(e) => field.onChange(e.target.checked)}
                                                        />
                                                    )}
                                                />
                                            }
                                            label="Resources"
                                            sx={checboxReUsed}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControlLabel
                                            control={
                                                <Controller
                                                    name="reuseComponents.technologies"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Checkbox
                                                            {...field}
                                                            checked={!!field.value}
                                                            onChange={(e) => field.onChange(e.target.checked)}
                                                        />
                                                    )}
                                                />
                                            }
                                            label="Technologies"
                                            sx={checboxReUsed}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControlLabel
                                            control={
                                                <Controller
                                                    name="reuseComponents.checklists"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Checkbox
                                                            {...field}
                                                            checked={!!field.value}
                                                            onChange={(e) => field.onChange(e.target.checked)}
                                                        />
                                                    )}
                                                />
                                            }
                                            label="Checklists"
                                            sx={checboxReUsed}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControlLabel
                                            control={
                                                <Controller
                                                    name="reuseComponents.assumptions"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Checkbox
                                                            {...field}
                                                            checked={!!field.value}
                                                            onChange={(e) => field.onChange(e.target.checked)}
                                                        />
                                                    )}
                                                />
                                            }
                                            label="Assumptions"
                                            sx={checboxReUsed}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControlLabel
                                            control={
                                                <Controller
                                                    name="reuseComponents.productivity"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Checkbox
                                                            {...field}
                                                            checked={!!field.value}
                                                            onChange={(e) => field.onChange(e.target.checked)}
                                                        />
                                                    )}
                                                />
                                            }
                                            label="Productivity"
                                            sx={checboxReUsed}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}


                        <Box sx={flexEnd}>
                            <Button onClick={handleClose} variant="outlined" color="secondary" sx={mr8}>
                                Cancel
                            </Button>
                            <Button disabled={project?.status === 'Completed' ? true : false}
                                type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#7367F0' }}>
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};
