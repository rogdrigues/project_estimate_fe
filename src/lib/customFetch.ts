
import { IRequest, IRequestSchema } from '@/types/IRequest';
import { BaseResponse, BaseResponseSchema } from '@/types/BaseResponse';
import { getSession } from 'next-auth/react';
import queryString from 'query-string';

export const customFetch = async <T>(request: IRequest): Promise<BaseResponse> => {
    const parsedRequest = IRequestSchema.parse(request);

    const { url, method, body, headers, queryParams, useCredentials, nextOptions } = parsedRequest;
    try {
        const session = await getSession();
        const accessToken = session?.access_token;

        const queryStringified = queryParams ? `?${queryString.stringify(queryParams)}` : '';

        const response = await fetch(`${url}${queryStringified}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
            credentials: useCredentials ? 'include' : 'same-origin',
            cache: 'no-store',
            ...nextOptions,
        });

        let errorMessage = '';

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    errorMessage = 'Bad Request';
                    break;
                case 401:
                    errorMessage = 'Unauthorized';
                    break;
                case 403:
                    errorMessage = 'Forbidden';
                    break;
                case 404:
                    errorMessage = 'Not Found';
                    break;
                case 500:
                    errorMessage = 'Internal Server Error';
                    break;
                default:
                    errorMessage = 'An unknown error occurred';
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();

        const parsedData = BaseResponseSchema.parse(data);

        return parsedData;
    } catch (error: unknown) {
        const message = (error as Error).message || 'Can’t connect to the API';

        return {
            EC: 500,
            message,
            data: null,
            metadata: null,
        };
    }
};

