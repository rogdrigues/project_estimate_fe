
import { IRequest, IRequestSchema } from '@/types/IRequest';
import { BaseResponse, BaseResponseSchema } from '@/types/BaseResponse';
import { getSession } from 'next-auth/react';
import queryString from 'query-string';

export const customFetch = async <T>(request: IRequest): Promise<BaseResponse> => {
    const parsedRequest = IRequestSchema.parse(request);

    let { url, method, body, headers, queryParams, useCredentials, nextOptions } = parsedRequest;
    try {

        const options: any = {
            method: method,
            headers: new Headers({ 'content-type': 'application/json', ...headers }),
            body: body ? JSON.stringify(body) : null,
            ...nextOptions,
        };

        if (useCredentials) {
            options.credentials = 'include';
        }

        if (queryParams) {
            url = `${url}?${queryString.stringify(queryParams)}`;
        }

        const response = await fetch(url, options);

        console.log(response);

        if (response.ok) {
            const data = await response.json() as T;
            const baseResponse = BaseResponseSchema.parse(data);
            return baseResponse;
        } else {
            const data = await response.json();

            return BaseResponseSchema.parse({
                EC: response.status,
                message: data?.message || 'Error',
                data: null,
                metadata: null,
            });
        }
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

