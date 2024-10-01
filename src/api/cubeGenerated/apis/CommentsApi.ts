/* tslint:disable */
/* eslint-disable */
/**
 * ChRIS Research Integration System: Ultron BackEnd (CUBE) API
 * The ChRIS Ultron BackEnd (CUBE) is the core backend API of ChRIS. It manages ChRIS users, plugins, pipelines, and the provenance of data analyses as ChRIS feeds.
 *
 * The version of the OpenAPI document: 0.0.0+unknown
 * Contact: dev@babymri.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  Comment,
  CommentRequest,
  PaginatedCommentList,
} from '../models/index';
import {
    CommentFromJSON,
    CommentToJSON,
    CommentRequestFromJSON,
    CommentRequestToJSON,
    PaginatedCommentListFromJSON,
    PaginatedCommentListToJSON,
} from '../models/index';

export interface CommentsCreateRequest {
    id: number;
    format?: CommentsCreateFormatEnum;
    commentRequest?: CommentRequest;
}

export interface CommentsDestroyRequest {
    id: number;
    format?: CommentsDestroyFormatEnum;
}

export interface CommentsListRequest {
    id: number;
    format?: CommentsListFormatEnum;
    limit?: number;
    offset?: number;
}

export interface CommentsRetrieveRequest {
    id: number;
    format?: CommentsRetrieveFormatEnum;
}

export interface CommentsSearchListRequest {
    id: number;
    format?: CommentsSearchListFormatEnum;
    limit?: number;
    offset?: number;
}

export interface CommentsUpdateRequest {
    id: number;
    format?: CommentsUpdateFormatEnum;
    commentRequest?: CommentRequest;
}

/**
 * CommentsApi - interface
 * 
 * @export
 * @interface CommentsApiInterface
 */
export interface CommentsApiInterface {
    /**
     * A view for the collection of comments.
     * @param {number} id 
     * @param {'collection+json' | 'json'} [format] 
     * @param {CommentRequest} [commentRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CommentsApiInterface
     */
    commentsCreateRaw(requestParameters: CommentsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Comment>>;

    /**
     * A view for the collection of comments.
     */
    commentsCreate(requestParameters: CommentsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Comment>;

    /**
     * A comment view.
     * @param {number} id 
     * @param {'collection+json' | 'json'} [format] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CommentsApiInterface
     */
    commentsDestroyRaw(requestParameters: CommentsDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * A comment view.
     */
    commentsDestroy(requestParameters: CommentsDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * A view for the collection of comments.
     * @param {number} id 
     * @param {'collection+json' | 'json'} [format] 
     * @param {number} [limit] Number of results to return per page.
     * @param {number} [offset] The initial index from which to return the results.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CommentsApiInterface
     */
    commentsListRaw(requestParameters: CommentsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedCommentList>>;

    /**
     * A view for the collection of comments.
     */
    commentsList(requestParameters: CommentsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedCommentList>;

    /**
     * A comment view.
     * @param {number} id 
     * @param {'collection+json' | 'json'} [format] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CommentsApiInterface
     */
    commentsRetrieveRaw(requestParameters: CommentsRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Comment>>;

    /**
     * A comment view.
     */
    commentsRetrieve(requestParameters: CommentsRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Comment>;

    /**
     * A view for the collection of feed-specific comments resulting from a query search.
     * @param {number} id 
     * @param {'collection+json' | 'json'} [format] 
     * @param {number} [limit] Number of results to return per page.
     * @param {number} [offset] The initial index from which to return the results.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CommentsApiInterface
     */
    commentsSearchListRaw(requestParameters: CommentsSearchListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedCommentList>>;

    /**
     * A view for the collection of feed-specific comments resulting from a query search.
     */
    commentsSearchList(requestParameters: CommentsSearchListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedCommentList>;

    /**
     * A comment view.
     * @param {number} id 
     * @param {'collection+json' | 'json'} [format] 
     * @param {CommentRequest} [commentRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CommentsApiInterface
     */
    commentsUpdateRaw(requestParameters: CommentsUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Comment>>;

    /**
     * A comment view.
     */
    commentsUpdate(requestParameters: CommentsUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Comment>;

}

/**
 * 
 */
export class CommentsApi extends runtime.BaseAPI implements CommentsApiInterface {

    /**
     * A view for the collection of comments.
     */
    async commentsCreateRaw(requestParameters: CommentsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Comment>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling commentsCreate().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['format'] != null) {
            queryParameters['format'] = requestParameters['format'];
        }

        const headerParameters: runtime.HTTPHeaders = {Accept: 'application/json'};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/api/v1/{id}/comments/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CommentRequestToJSON(requestParameters['commentRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CommentFromJSON(jsonValue));
    }

    /**
     * A view for the collection of comments.
     */
    async commentsCreate(requestParameters: CommentsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Comment> {
        const response = await this.commentsCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * A comment view.
     */
    async commentsDestroyRaw(requestParameters: CommentsDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling commentsDestroy().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['format'] != null) {
            queryParameters['format'] = requestParameters['format'];
        }

        const headerParameters: runtime.HTTPHeaders = {Accept: 'application/json'};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/api/v1/comments/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * A comment view.
     */
    async commentsDestroy(requestParameters: CommentsDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.commentsDestroyRaw(requestParameters, initOverrides);
    }

    /**
     * A view for the collection of comments.
     */
    async commentsListRaw(requestParameters: CommentsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedCommentList>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling commentsList().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['format'] != null) {
            queryParameters['format'] = requestParameters['format'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        const headerParameters: runtime.HTTPHeaders = {Accept: 'application/json'};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/api/v1/{id}/comments/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedCommentListFromJSON(jsonValue));
    }

    /**
     * A view for the collection of comments.
     */
    async commentsList(requestParameters: CommentsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedCommentList> {
        const response = await this.commentsListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * A comment view.
     */
    async commentsRetrieveRaw(requestParameters: CommentsRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Comment>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling commentsRetrieve().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['format'] != null) {
            queryParameters['format'] = requestParameters['format'];
        }

        const headerParameters: runtime.HTTPHeaders = {Accept: 'application/json'};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/api/v1/comments/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CommentFromJSON(jsonValue));
    }

    /**
     * A comment view.
     */
    async commentsRetrieve(requestParameters: CommentsRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Comment> {
        const response = await this.commentsRetrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * A view for the collection of feed-specific comments resulting from a query search.
     */
    async commentsSearchListRaw(requestParameters: CommentsSearchListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedCommentList>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling commentsSearchList().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['format'] != null) {
            queryParameters['format'] = requestParameters['format'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        const headerParameters: runtime.HTTPHeaders = {Accept: 'application/json'};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/api/v1/{id}/comments/search/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedCommentListFromJSON(jsonValue));
    }

    /**
     * A view for the collection of feed-specific comments resulting from a query search.
     */
    async commentsSearchList(requestParameters: CommentsSearchListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedCommentList> {
        const response = await this.commentsSearchListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * A comment view.
     */
    async commentsUpdateRaw(requestParameters: CommentsUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Comment>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling commentsUpdate().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['format'] != null) {
            queryParameters['format'] = requestParameters['format'];
        }

        const headerParameters: runtime.HTTPHeaders = {Accept: 'application/json'};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/api/v1/comments/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CommentRequestToJSON(requestParameters['commentRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CommentFromJSON(jsonValue));
    }

    /**
     * A comment view.
     */
    async commentsUpdate(requestParameters: CommentsUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Comment> {
        const response = await this.commentsUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const CommentsCreateFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type CommentsCreateFormatEnum = typeof CommentsCreateFormatEnum[keyof typeof CommentsCreateFormatEnum];
/**
 * @export
 */
export const CommentsDestroyFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type CommentsDestroyFormatEnum = typeof CommentsDestroyFormatEnum[keyof typeof CommentsDestroyFormatEnum];
/**
 * @export
 */
export const CommentsListFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type CommentsListFormatEnum = typeof CommentsListFormatEnum[keyof typeof CommentsListFormatEnum];
/**
 * @export
 */
export const CommentsRetrieveFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type CommentsRetrieveFormatEnum = typeof CommentsRetrieveFormatEnum[keyof typeof CommentsRetrieveFormatEnum];
/**
 * @export
 */
export const CommentsSearchListFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type CommentsSearchListFormatEnum = typeof CommentsSearchListFormatEnum[keyof typeof CommentsSearchListFormatEnum];
/**
 * @export
 */
export const CommentsUpdateFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type CommentsUpdateFormatEnum = typeof CommentsUpdateFormatEnum[keyof typeof CommentsUpdateFormatEnum];
