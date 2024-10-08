import * as React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import { useSession } from 'next-auth/react';
import RateReviewIcon from '@mui/icons-material/RateReview';
import WarningModal from '@/components/_table_form-config/modal-warning-table-component';
import moment from 'moment';
import DownloadIcon from '@mui/icons-material/Download';
import { downloadTemplate } from '@/services';
import PageviewIcon from '@mui/icons-material/Pageview';
import SwipeVerticalIcon from '@mui/icons-material/SwipeVertical';
import BlockIcon from '@mui/icons-material/Block';

interface IProps {
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    handleMenuClose: () => void;
    openUpdateModal?: boolean;
    SetOpenUpdateModal: (value: boolean) => void;
    SetOpenDialog: (value: boolean) => void;
    entity: string;
    SetOpenReview?: (value: boolean) => void;
    openReviewModal?: boolean;
    dataView?: any;
    openReusedModal?: boolean;
    setOpenReusedModal?: (value: boolean) => void;
}

const ObjectRowMenu = (props: IProps) => {
    const {
        anchorEl, isMenuOpen, handleMenuClose,
        SetOpenUpdateModal, SetOpenDialog, openUpdateModal,
        entity, SetOpenReview, openReviewModal,
        dataView, openReusedModal, setOpenReusedModal
    } = props;

    const opportunityStatus = dataView?.approvalStatus;
    const objectStatus = dataView?.deleted;
    const timeLeftForOpportunity = dataView?.createdAt;

    const { data: session } = useSession();
    const [showWarning, setShowWarning] = React.useState(false);
    const [action, setAction] = React.useState<'edit' | 'delete' | 'restore' | null>(null);

    const userPermissions = session?.user?.role?.permissions || [];
    const hasPermission = (permissionTag: string) => userPermissions.includes(permissionTag);

    const isOpportunityLead = entity === 'opportunity' && session?.user?.role?.roleName === 'Opportunity';
    const isPresaleRoleOpportunity = entity === 'opportunity' && session?.user?.role?.roleName.startsWith('Presale');
    const isPresaleRole = entity === 'presale_plan' && session?.user?.role?.roleName.startsWith('Presale');
    const isCreatorOfPresale = entity === 'presale_plan' && session?.user?.id === dataView?.createdBy?._id;
    const isWorkingTemplate = entity === 'template' && session?.user?.role?.roleName === 'Opportunity';
    const isAccessProjectDetail = entity === 'projects' && session?.user?.role?.roleName === 'Opportunity';
    const isAccessProjectReview = entity === 'review';
    const isProjectDetail = entity === 'project_detail' && session?.user?.role?.roleName === 'Opportunity';

    const timeLeft = moment().diff(moment(timeLeftForOpportunity), 'minutes');
    const isTimeExceeded = timeLeft > 60;

    const handleActionWithWarning = (selectedAction: 'edit' | 'delete' | 'restore') => {
        if (isPresaleRole || isPresaleRoleOpportunity) {
            setShowWarning(true);
            setAction(selectedAction);
        } else {
            executeAction(selectedAction);
        }
    };

    const executeAction = (selectedAction: 'edit' | 'delete' | 'restore') => {
        if (selectedAction === 'edit') SetOpenUpdateModal(!openUpdateModal);
        if (selectedAction === 'delete') SetOpenDialog(true);
        if (selectedAction === 'restore') SetOpenDialog(true);
        setShowWarning(false);
    };

    const isDisabledForPresale = opportunityStatus === 'Approved' && isPresaleRoleOpportunity;
    const isRejectedOpportunity = opportunityStatus === 'Rejected';

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
                sx={{
                    mt: '10px',
                    '& .MuiPaper-root': {
                        minWidth: '150px',
                    },
                }}
            >
                {/* Logic Opportunity Lead */}
                {isOpportunityLead && (
                    <MenuItem
                        onClick={() => {
                            SetOpenReview && SetOpenReview(!openReviewModal);
                            handleMenuClose();
                        }}
                    >
                        <ListItemIcon>
                            <RateReviewIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Review</ListItemText>
                    </MenuItem>
                )}

                {/* Presale Opportunity Rejected Logic */}
                {isPresaleRoleOpportunity && isRejectedOpportunity ? (
                    <MenuItem
                        onClick={() => {
                            SetOpenReview && SetOpenReview(!openReviewModal);
                            handleMenuClose();
                        }}
                    >
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit to Submit</ListItemText>
                    </MenuItem>
                ) : isPresaleRoleOpportunity && (
                    <div>
                        {isDisabledForPresale ? (
                            <MenuItem
                                onClick={() => {
                                    handleActionWithWarning('edit');
                                    handleMenuClose();
                                }}
                                disabled={isDisabledForPresale}
                            >
                                <ListItemIcon>
                                    <EditIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>This opportunity had been granted</ListItemText>
                            </MenuItem>
                        ) : (
                            <div>
                                <MenuItem
                                    onClick={() => {
                                        handleActionWithWarning('edit');
                                        handleMenuClose();
                                    }}
                                    disabled={isTimeExceeded || isDisabledForPresale}
                                >
                                    <ListItemIcon>
                                        <EditIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Edit</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleActionWithWarning('delete');
                                        handleMenuClose();
                                    }}
                                    disabled={isTimeExceeded || isDisabledForPresale}
                                >
                                    <ListItemIcon>
                                        <DeleteIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                </MenuItem>
                            </div>
                        )}
                    </div>
                )}

                {/* Presale Role Logic */}
                {isPresaleRole && isCreatorOfPresale && !isTimeExceeded && (
                    <div>
                        {!objectStatus && hasPermission(`manage_${entity}`) && (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        handleActionWithWarning('edit');
                                        handleMenuClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <EditIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Edit</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleActionWithWarning('delete');
                                        handleMenuClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <DeleteIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                </MenuItem>
                            </>
                        )}
                        <MenuItem
                            onClick={() => {
                                handleActionWithWarning('restore');
                                handleMenuClose();
                            }}
                        >
                            {objectStatus && hasPermission(`manage_${entity}`) && (
                                <MenuItem
                                    onClick={() => {
                                        SetOpenDialog(true);
                                        handleMenuClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <RestoreIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Restore</ListItemText>
                                </MenuItem>
                            )}
                        </MenuItem>
                    </div>
                )}

                {isPresaleRole && !isCreatorOfPresale && (
                    <MenuItem
                        onClick={() => {
                            SetOpenReview && SetOpenReview(!openReviewModal);
                            handleMenuClose();
                        }}
                    >
                        <ListItemIcon>
                            <RateReviewIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Review</ListItemText>
                    </MenuItem>
                )}

                {isProjectDetail && (
                    <MenuItem
                        onClick={() => {
                            SetOpenUpdateModal(!openUpdateModal);
                            handleMenuClose();
                        }}
                    >
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                )}

                {!isPresaleRoleOpportunity && !isOpportunityLead && !isPresaleRole && !isProjectDetail && (
                    <Box>
                        {!objectStatus && hasPermission(`manage_${entity}`) && (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        SetOpenUpdateModal(!openUpdateModal);
                                        handleMenuClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <EditIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Edit</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        SetOpenDialog(true);
                                        handleMenuClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <DeleteIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                </MenuItem>
                            </>
                        )}
                        {!objectStatus && hasPermission(`manage_${entity}`) && isWorkingTemplate && (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        downloadTemplate(dataView._id);
                                    }}
                                >
                                    <ListItemIcon>
                                        <DownloadIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Download template file</ListItemText>
                                </MenuItem>
                            </>
                        )}
                        {!objectStatus && hasPermission(`manage_${entity}`) && isAccessProjectDetail && (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        SetOpenReview && SetOpenReview(!openReviewModal);
                                        handleMenuClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <PageviewIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>View</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setOpenReusedModal && setOpenReusedModal(!openReusedModal);
                                        console.log('openReusedModal', openReusedModal);
                                        handleMenuClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <SwipeVerticalIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Reused Project</ListItemText>
                                </MenuItem>
                            </>
                        )}
                        {!objectStatus && hasPermission(`project_${entity}`) && isAccessProjectReview && (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        SetOpenReview && SetOpenReview(!openReviewModal);
                                        handleMenuClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <PageviewIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Review</ListItemText>
                                </MenuItem>
                            </>
                        )}
                        {objectStatus && hasPermission(`manage_${entity}`) && (
                            <MenuItem
                                onClick={() => {
                                    SetOpenDialog(true);
                                    handleMenuClose();
                                }}
                            >
                                <ListItemIcon>
                                    <RestoreIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Restore</ListItemText>
                            </MenuItem>
                        )}
                        {!objectStatus && !hasPermission(`manage_${entity}`) && (
                            <>
                                <MenuItem
                                    disabled
                                >
                                    <ListItemIcon>
                                        <BlockIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>You don`t have permission to manage</ListItemText>
                                </MenuItem>
                            </>
                        )}
                    </Box>
                )}
            </Menu>

            {/* Warning Modal */}
            {(isPresaleRoleOpportunity || isPresaleRole) && (
                <WarningModal
                    open={showWarning}
                    handleClose={() => setShowWarning(false)}
                    message="You only have 1 hour to edit, delete, or restore this opportunity!"
                    handleConfirm={() => executeAction(action!)}
                />
            )}
        </>
    );
};

export default ObjectRowMenu;
