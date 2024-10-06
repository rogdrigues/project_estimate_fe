import { customFetch } from '@/lib';
import { Project, ProjectResource, ProjectChecklist, ProjectAssumption, ProjectTechnology, ProjectProductivity, UserMaster, ProjectComment, TemplateData } from '@/types';
import { getAccessToken } from '@/utils';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project`;

export const createProject = async (projectData: Partial<Project>) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<Project>({
            url: `${baseURL}/create-project`,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            body: projectData,
        });
        return response;
    } catch (error) {
        throw new Error('Error creating project');
    }
};

export const updateProject = async (projectId: string, projectData: Partial<Project>) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<Project>({
            url: `${baseURL}/update/${projectId}`,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            body: projectData,
        });
        return response;
    } catch (error) {
        throw new Error('Error updating project');
    }
};

export const getReviewers = async (accessToken: string | undefined) => {
    try {

        const response = await customFetch<UserMaster[]>(
            {
                url: `${baseURL}/list-reviewers`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET',
                nextOptions: {
                    cache: 'no-store'
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error fetching opportunity leads');
    }
};

export const deleteProject = async (projectId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch({
            url: `${baseURL}/delete/${projectId}`,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });
        return response;
    } catch (error) {
        throw new Error('Error deleting project');
    }
};

export const restoreProject = async (projectId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch({
            url: `${baseURL}/restore/${projectId}`,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });
        return response;
    } catch (error) {
        throw new Error('Error restoring project');
    }
};

export const getAllProjects = async (accessToken: string | undefined, includeDeleted: boolean = false, applyReviewer: boolean = false) => {
    try {
        const response = await customFetch<Project[]>({
            url: `${baseURL}/list-all-project?includeDeleted=${includeDeleted}&applyReviewer=${applyReviewer}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching projects');
    }
};


export const getProjectById = async (projectId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<Project>(
            {
                url: `${baseURL}/get-project/${projectId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET',
                nextOptions: {
                    cache: 'no-store',
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error fetching category');
    }
};

//update project components after being selected
export const updateProjectAssumption = async (projectAssumptionId: string, projectAssumptionData: ProjectAssumption) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<ProjectAssumption>(
            {
                url: `${baseURL}/update-assumption/${projectAssumptionId}`,
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: projectAssumptionData,
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error updating project assumption');
    }
};

export const updateProjectChecklist = async (projectChecklistId: string, projectChecklistData: ProjectChecklist) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<ProjectChecklist>(
            {
                url: `${baseURL}/update-checklist/${projectChecklistId}`,
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: projectChecklistData,
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error updating checklist');
    }
};

export const updateProjectProductivity = async (projectProductivityId: string, projectProductivityData: ProjectProductivity) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<ProjectProductivity>(
            {
                url: `${baseURL}/update-productivity/${projectProductivityId}`,
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: projectProductivityData,
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error updating productivity');
    }
};

export const updateProjectResource = async (projectResourceId: string, projectResourceData: ProjectResource) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<ProjectResource>({
            url: `${baseURL}/update-resource/${projectResourceId}`,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            body: projectResourceData,
        });
        return response;
    } catch (error) {
        throw new Error('Error updating resource');
    }
};

export const updateProjectTechnology = async (projectTechnologyId: string, projectTechnologyData: ProjectTechnology) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<ProjectTechnology>(
            {
                url: `${baseURL}/update-technology/${projectTechnologyId}`,
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: projectTechnologyData,
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error updating technology');
    }
};


// Update project components
export const updateProjectComponents = async (
    projectId: string,
    componentsData: {
        resources?: ProjectResource[];
        checklists?: ProjectChecklist[];
        technologies?: ProjectTechnology[];
        assumptions?: ProjectAssumption[];
        productivity?: ProjectProductivity[];
    }
) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch({
            url: `${baseURL}/update-components/${projectId}`,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            body: componentsData,
        });
        return response;
    } catch (error) {
        throw new Error('Error updating project components');
    }
};

export const getProjectComponents = async (projectId: string, componentType: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch({
            url: `${baseURL}/list-components/${projectId}?componentType=${componentType}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching ${componentType}`);
    }
};

// Project comment services
export const addProjectComment = async (projectId: string, commentData: Partial<ProjectComment>) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<ProjectComment>({
            url: `${baseURL}/comments/add/${projectId}`,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            body: commentData,
        });
        return response;
    } catch (error) {
        throw new Error('Error adding project comment');
    }
};

export const updateProjectComment = async (commentId: string, commentData: Partial<ProjectComment>) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<ProjectComment>({
            url: `${baseURL}/comments/update/${commentId}`,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            body: commentData,
        });
        return response;
    } catch (error) {
        throw new Error('Error updating project comment');
    }
};

export const deleteProjectComment = async (commentId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<ProjectComment>({
            url: `${baseURL}/comments/delete/${commentId}`,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });
        return response;
    } catch (error) {
        throw new Error('Error deleting project comment');
    }
};

export const getCommentsByProject = async (projectId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<ProjectComment[]>({
            url: `${baseURL}/comments/list/${projectId}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching project comments');
    }
};

export const startReviewProcess = async (projectId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch({
            url: `${baseURL}/comments/start-review/${projectId}`,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });
        return response;
    } catch (error) {
        throw new Error('Error starting review process');
    }
};

export const requestReview = async (projectId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch({
            url: `${baseURL}/comments/request-review/${projectId}`,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });
        return response;
    } catch (error) {
        throw new Error('Error requesting review');
    }
};

export const getTemplateData = async (projectId: string, templateId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<TemplateData>({
            url: `${baseURL}/template-data?projectId=${projectId}&templateId=${templateId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            method: 'GET',
            nextOptions: {
                cache: 'no-store',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching template data');
    }
};

//Excel handling

export const exportProjectTemplateData = async (projectId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(`${baseURL}/projects/${projectId}/generate-excel`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error exporting project template data');
        }

        const contentDisposition = response.headers.get('content-disposition');
        let fileName = 'exported_project_template.xlsx';

        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?(.+)"?/);
            if (match && match[1]) {
                fileName = match[1];
            }
        }

        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urlBlob;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return {
            EC: 0,
            message: 'Project template data exported successfully',
        };
    } catch (error) {
        return {
            EC: 1,
            message: 'Error exporting project template data',
            data: error,
        };
    }
};
