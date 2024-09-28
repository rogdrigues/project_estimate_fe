import { customFetch } from '@/lib';
import { Template, CreateTemplate, UpdateTemplate } from '@/types';
import { getAccessToken } from '@/utils';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/template`;

export const getAllTemplates = async (accessToken: string | undefined, includeDeleted: boolean = false) => {
    try {
        const response = await customFetch<Template[]>({
            url: `${baseURL}/get-all-templates?includeDeleted=${includeDeleted}`,
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
        throw new Error('Error fetching templates');
    }
};

export const getTemplateById = async (templateId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<Template>({
            url: `${baseURL}/get-template/${templateId}`,
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
        throw new Error('Error fetching template');
    }
};

export const createTemplate = async (formData: FormData) => {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(`${baseURL}/create-template`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: formData,
        });

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error creating template');
    }
};

export const updateTemplate = async (templateId: string, formData: FormData) => {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(`${baseURL}/update-template/${templateId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: formData,
        });

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error updating template');
    }
};

export const deleteTemplate = async (templateId: string) => {
    try {
        const accessToken = await getAccessToken();
        await customFetch({
            url: `${baseURL}/delete-template/${templateId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            method: 'DELETE',
        });
    } catch (error) {
        throw new Error('Error deleting template');
    }
};

export const restoreTemplate = async (templateId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<Template>({
            url: `${baseURL}/restore-template/${templateId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            method: 'PATCH',
        });
        return response.data;
    } catch (error) {
        throw new Error('Error restoring template');
    }
};

export const getPublishedTemplatesForProject = async () => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<Template[]>({
            url: `${baseURL}/get-published-templates-for-project`,
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
        throw new Error('Error fetching published templates for project');
    }
};

export const downloadTemplateSample = async () => {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(`${baseURL}/download-template-sample`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            throw new Error('Error downloading template sample');
        }

        const blob = await response.blob();

        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', 'template_file.xlsx');
        document.body.appendChild(link);

        link.click();

        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        return {
            EC: 0,
            message: 'File downloaded successfully',
        };
    } catch (error) {
        return {
            EC: 1,
            message: 'Error downloading template sample',
            data: error,
        };
    }
};

export const downloadTemplate = async (templateId: string) => {
    const accessToken = await getAccessToken();

    const response = await fetch(`${baseURL}/download-template/${templateId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const contentDisposition = response.headers.get('content-disposition');
        let fileName = 'template.xlsx';

        if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
            if (fileNameMatch && fileNameMatch.length > 1) {
                fileName = fileNameMatch[1];
            }
        }

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    } else {
        console.error("Error downloading the template");
    }
};

