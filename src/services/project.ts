import { customFetch } from '@/lib';
import { Project, ProjectResource, ProjectChecklist, ProjectAssumption, ProjectTechnology, ProjectProductivity, UserMaster } from '@/types';
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

export const getAllProjects = async (accessToken: string | undefined, includeDeleted: boolean = false) => {
    try {
        const response = await customFetch<Project[]>({
            url: `${baseURL}/list-all-project?includeDeleted=${includeDeleted}`,
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