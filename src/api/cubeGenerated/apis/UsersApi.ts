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
  PaginatedGroupList,
  PaginatedUserList,
  User,
  UserRequest,
} from '../models/index';
import {
    PaginatedGroupListFromJSON,
    PaginatedGroupListToJSON,
    PaginatedUserListFromJSON,
    PaginatedUserListToJSON,
    UserFromJSON,
    UserToJSON,
    UserRequestFromJSON,
    UserRequestToJSON,
} from '../models/index';

export interface UsersCreateRequest {
    userRequest: UserRequest;
    format?: UsersCreateFormatEnum;
}

export interface UsersGroupsListRequest {
    id: number;
    format?: UsersGroupsListFormatEnum;
    limit?: number;
    offset?: number;
}

export interface UsersListRequest {
    format?: UsersListFormatEnum;
    limit?: number;
    offset?: number;
}

export interface UsersRetrieveRequest {
    id: number;
    format?: UsersRetrieveFormatEnum;
}

export interface UsersUpdateRequest {
    id: number;
    userRequest: UserRequest;
    format?: UsersUpdateFormatEnum;
}

/**
 * UsersApi - interface
 * 
 * @export
 * @interface UsersApiInterface
 */
export interface UsersApiInterface {
    /**
     * 
     * @param {UserRequest} userRequest 
     * @param {'collection+json' | 'json'} [format] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    usersCreateRaw(requestParameters: UsersCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>>;

    /**
     */
    usersCreate(requestParameters: UsersCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User>;

    /**
     * A view for a user-specific collection of groups.
     * @param {number} id 
     * @param {'collection+json' | 'json'} [format] 
     * @param {number} [limit] Number of results to return per page.
     * @param {number} [offset] The initial index from which to return the results.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    usersGroupsListRaw(requestParameters: UsersGroupsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedGroupList>>;

    /**
     * A view for a user-specific collection of groups.
     */
    usersGroupsList(requestParameters: UsersGroupsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedGroupList>;

    /**
     * 
     * @param {'collection+json' | 'json'} [format] 
     * @param {number} [limit] Number of results to return per page.
     * @param {number} [offset] The initial index from which to return the results.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    usersListRaw(requestParameters: UsersListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedUserList>>;

    /**
     */
    usersList(requestParameters: UsersListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedUserList>;

    /**
     * 
     * @param {number} id 
     * @param {'collection+json' | 'json'} [format] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    usersRetrieveRaw(requestParameters: UsersRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>>;

    /**
     */
    usersRetrieve(requestParameters: UsersRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User>;

    /**
     * 
     * @param {number} id 
     * @param {UserRequest} userRequest 
     * @param {'collection+json' | 'json'} [format] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    usersUpdateRaw(requestParameters: UsersUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>>;

    /**
     */
    usersUpdate(requestParameters: UsersUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User>;

}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI implements UsersApiInterface {

    /**
     */
    async usersCreateRaw(requestParameters: UsersCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters['userRequest'] == null) {
            throw new runtime.RequiredError(
                'userRequest',
                'Required parameter "userRequest" was null or undefined when calling usersCreate().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['format'] != null) {
            queryParameters['format'] = requestParameters['format'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/vnd.collection+json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/api/v1/users/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserRequestToJSON(requestParameters['userRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     */
    async usersCreate(requestParameters: UsersCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.usersCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * A view for a user-specific collection of groups.
     */
    async usersGroupsListRaw(requestParameters: UsersGroupsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedGroupList>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling usersGroupsList().'
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
            path: `/api/v1/users/{id}/groups/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedGroupListFromJSON(jsonValue));
    }

    /**
     * A view for a user-specific collection of groups.
     */
    async usersGroupsList(requestParameters: UsersGroupsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedGroupList> {
        const response = await this.usersGroupsListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async usersListRaw(requestParameters: UsersListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedUserList>> {
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
            path: `/api/v1/users/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedUserListFromJSON(jsonValue));
    }

    /**
     */
    async usersList(requestParameters: UsersListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedUserList> {
        const response = await this.usersListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async usersRetrieveRaw(requestParameters: UsersRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling usersRetrieve().'
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
            path: `/api/v1/users/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     */
    async usersRetrieve(requestParameters: UsersRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.usersRetrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async usersUpdateRaw(requestParameters: UsersUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling usersUpdate().'
            );
        }

        if (requestParameters['userRequest'] == null) {
            throw new runtime.RequiredError(
                'userRequest',
                'Required parameter "userRequest" was null or undefined when calling usersUpdate().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['format'] != null) {
            queryParameters['format'] = requestParameters['format'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/vnd.collection+json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/api/v1/users/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UserRequestToJSON(requestParameters['userRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     */
    async usersUpdate(requestParameters: UsersUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.usersUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const UsersCreateFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type UsersCreateFormatEnum = typeof UsersCreateFormatEnum[keyof typeof UsersCreateFormatEnum];
/**
 * @export
 */
export const UsersGroupsListFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type UsersGroupsListFormatEnum = typeof UsersGroupsListFormatEnum[keyof typeof UsersGroupsListFormatEnum];
/**
 * @export
 */
export const UsersListFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type UsersListFormatEnum = typeof UsersListFormatEnum[keyof typeof UsersListFormatEnum];
/**
 * @export
 */
export const UsersRetrieveFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type UsersRetrieveFormatEnum = typeof UsersRetrieveFormatEnum[keyof typeof UsersRetrieveFormatEnum];
/**
 * @export
 */
export const UsersUpdateFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type UsersUpdateFormatEnum = typeof UsersUpdateFormatEnum[keyof typeof UsersUpdateFormatEnum];
