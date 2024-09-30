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
  PaginatedFeedList,
} from '../models/index';
import {
    PaginatedFeedListFromJSON,
    PaginatedFeedListToJSON,
} from '../models/index';

export interface SearchListRequest {
    filesFnameIcontains?: string;
    format?: SearchListFormatEnum;
    id?: number;
    limit?: number;
    maxCreationDate?: Date;
    maxId?: number;
    minCreationDate?: Date;
    minId?: number;
    name?: string;
    nameExact?: string;
    nameStartswith?: string;
    offset?: number;
}

/**
 * SearchApi - interface
 * 
 * @export
 * @interface SearchApiInterface
 */
export interface SearchApiInterface {
    /**
     * A view for the collection of feeds resulting from a query search.
     * @param {string} [filesFnameIcontains] 
     * @param {'collection+json' | 'json'} [format] 
     * @param {number} [id] 
     * @param {number} [limit] Number of results to return per page.
     * @param {Date} [maxCreationDate] 
     * @param {number} [maxId] 
     * @param {Date} [minCreationDate] 
     * @param {number} [minId] 
     * @param {string} [name] 
     * @param {string} [nameExact] 
     * @param {string} [nameStartswith] 
     * @param {number} [offset] The initial index from which to return the results.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SearchApiInterface
     */
    searchListRaw(requestParameters: SearchListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedFeedList>>;

    /**
     * A view for the collection of feeds resulting from a query search.
     */
    searchList(requestParameters: SearchListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedFeedList>;

}

/**
 * 
 */
export class SearchApi extends runtime.BaseAPI implements SearchApiInterface {

    /**
     * A view for the collection of feeds resulting from a query search.
     */
    async searchListRaw(requestParameters: SearchListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedFeedList>> {
        const queryParameters: any = {};

        if (requestParameters['filesFnameIcontains'] != null) {
            queryParameters['files_fname_icontains'] = requestParameters['filesFnameIcontains'];
        }

        if (requestParameters['format'] != null) {
            queryParameters['format'] = requestParameters['format'];
        }

        if (requestParameters['id'] != null) {
            queryParameters['id'] = requestParameters['id'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['maxCreationDate'] != null) {
            queryParameters['max_creation_date'] = (requestParameters['maxCreationDate'] as any).toISOString();
        }

        if (requestParameters['maxId'] != null) {
            queryParameters['max_id'] = requestParameters['maxId'];
        }

        if (requestParameters['minCreationDate'] != null) {
            queryParameters['min_creation_date'] = (requestParameters['minCreationDate'] as any).toISOString();
        }

        if (requestParameters['minId'] != null) {
            queryParameters['min_id'] = requestParameters['minId'];
        }

        if (requestParameters['name'] != null) {
            queryParameters['name'] = requestParameters['name'];
        }

        if (requestParameters['nameExact'] != null) {
            queryParameters['name_exact'] = requestParameters['nameExact'];
        }

        if (requestParameters['nameStartswith'] != null) {
            queryParameters['name_startswith'] = requestParameters['nameStartswith'];
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
            path: `/api/v1/search/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedFeedListFromJSON(jsonValue));
    }

    /**
     * A view for the collection of feeds resulting from a query search.
     */
    async searchList(requestParameters: SearchListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedFeedList> {
        const response = await this.searchListRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const SearchListFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type SearchListFormatEnum = typeof SearchListFormatEnum[keyof typeof SearchListFormatEnum];
