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
  PaginatedTaggingList,
  Tagging,
} from '../models/index';
import {
    PaginatedTaggingListFromJSON,
    PaginatedTaggingListToJSON,
    TaggingFromJSON,
    TaggingToJSON,
} from '../models/index';

export interface TaggingsCreateRequest {
    id: number;
    format?: TaggingsCreateFormatEnum;
}

export interface TaggingsDestroyRequest {
    id: number;
    format?: TaggingsDestroyFormatEnum;
}

export interface TaggingsListRequest {
    id: number;
    format?: TaggingsListFormatEnum;
    limit?: number;
    offset?: number;
}

export interface TaggingsRetrieveRequest {
    id: number;
    format?: TaggingsRetrieveFormatEnum;
}

/**
 * TaggingsApi - interface
 * 
 * @export
 * @interface TaggingsApiInterface
 */
export interface TaggingsApiInterface {
    /**
     * A view for the feed-specific collection of taggings.
     * @param {number} id 
     * @param {'collection+json' | 'json'} [format] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TaggingsApiInterface
     */
    taggingsCreateRaw(requestParameters: TaggingsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Tagging>>;

    /**
     * A view for the feed-specific collection of taggings.
     */
    taggingsCreate(requestParameters: TaggingsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Tagging>;

    /**
     * A tagging view.
     * @param {number} id 
     * @param {'collection+json' | 'json'} [format] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TaggingsApiInterface
     */
    taggingsDestroyRaw(requestParameters: TaggingsDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * A tagging view.
     */
    taggingsDestroy(requestParameters: TaggingsDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * A view for the feed-specific collection of taggings.
     * @param {number} id 
     * @param {'collection+json' | 'json'} [format] 
     * @param {number} [limit] Number of results to return per page.
     * @param {number} [offset] The initial index from which to return the results.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TaggingsApiInterface
     */
    taggingsListRaw(requestParameters: TaggingsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedTaggingList>>;

    /**
     * A view for the feed-specific collection of taggings.
     */
    taggingsList(requestParameters: TaggingsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedTaggingList>;

    /**
     * A tagging view.
     * @param {number} id 
     * @param {'collection+json' | 'json'} [format] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TaggingsApiInterface
     */
    taggingsRetrieveRaw(requestParameters: TaggingsRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Tagging>>;

    /**
     * A tagging view.
     */
    taggingsRetrieve(requestParameters: TaggingsRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Tagging>;

}

/**
 * 
 */
export class TaggingsApi extends runtime.BaseAPI implements TaggingsApiInterface {

    /**
     * A view for the feed-specific collection of taggings.
     */
    async taggingsCreateRaw(requestParameters: TaggingsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Tagging>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling taggingsCreate().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['format'] != null) {
            queryParameters['format'] = requestParameters['format'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/api/v1/{id}/taggings/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TaggingFromJSON(jsonValue));
    }

    /**
     * A view for the feed-specific collection of taggings.
     */
    async taggingsCreate(requestParameters: TaggingsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Tagging> {
        const response = await this.taggingsCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * A tagging view.
     */
    async taggingsDestroyRaw(requestParameters: TaggingsDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling taggingsDestroy().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['format'] != null) {
            queryParameters['format'] = requestParameters['format'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/api/v1/taggings/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * A tagging view.
     */
    async taggingsDestroy(requestParameters: TaggingsDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.taggingsDestroyRaw(requestParameters, initOverrides);
    }

    /**
     * A view for the feed-specific collection of taggings.
     */
    async taggingsListRaw(requestParameters: TaggingsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedTaggingList>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling taggingsList().'
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

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/api/v1/{id}/taggings/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedTaggingListFromJSON(jsonValue));
    }

    /**
     * A view for the feed-specific collection of taggings.
     */
    async taggingsList(requestParameters: TaggingsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedTaggingList> {
        const response = await this.taggingsListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * A tagging view.
     */
    async taggingsRetrieveRaw(requestParameters: TaggingsRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Tagging>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling taggingsRetrieve().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['format'] != null) {
            queryParameters['format'] = requestParameters['format'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/api/v1/taggings/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TaggingFromJSON(jsonValue));
    }

    /**
     * A tagging view.
     */
    async taggingsRetrieve(requestParameters: TaggingsRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Tagging> {
        const response = await this.taggingsRetrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const TaggingsCreateFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type TaggingsCreateFormatEnum = typeof TaggingsCreateFormatEnum[keyof typeof TaggingsCreateFormatEnum];
/**
 * @export
 */
export const TaggingsDestroyFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type TaggingsDestroyFormatEnum = typeof TaggingsDestroyFormatEnum[keyof typeof TaggingsDestroyFormatEnum];
/**
 * @export
 */
export const TaggingsListFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type TaggingsListFormatEnum = typeof TaggingsListFormatEnum[keyof typeof TaggingsListFormatEnum];
/**
 * @export
 */
export const TaggingsRetrieveFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type TaggingsRetrieveFormatEnum = typeof TaggingsRetrieveFormatEnum[keyof typeof TaggingsRetrieveFormatEnum];
