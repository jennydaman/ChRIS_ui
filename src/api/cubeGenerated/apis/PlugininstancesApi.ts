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
  PaginatedPluginInstanceList,
} from '../models/index';
import {
    PaginatedPluginInstanceListFromJSON,
    PaginatedPluginInstanceListToJSON,
} from '../models/index';

export interface PlugininstancesListRequest {
    id: number;
    format?: PlugininstancesListFormatEnum;
    limit?: number;
    offset?: number;
}

/**
 * PlugininstancesApi - interface
 * 
 * @export
 * @interface PlugininstancesApiInterface
 */
export interface PlugininstancesApiInterface {
    /**
     * A view for the collection of feed-specific plugin instances.
     * @param {number} id 
     * @param {'collection+json' | 'json'} [format] 
     * @param {number} [limit] Number of results to return per page.
     * @param {number} [offset] The initial index from which to return the results.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlugininstancesApiInterface
     */
    plugininstancesListRaw(requestParameters: PlugininstancesListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedPluginInstanceList>>;

    /**
     * A view for the collection of feed-specific plugin instances.
     */
    plugininstancesList(requestParameters: PlugininstancesListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedPluginInstanceList>;

}

/**
 * 
 */
export class PlugininstancesApi extends runtime.BaseAPI implements PlugininstancesApiInterface {

    /**
     * A view for the collection of feed-specific plugin instances.
     */
    async plugininstancesListRaw(requestParameters: PlugininstancesListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedPluginInstanceList>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling plugininstancesList().'
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
            path: `/api/v1/{id}/plugininstances/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedPluginInstanceListFromJSON(jsonValue));
    }

    /**
     * A view for the collection of feed-specific plugin instances.
     */
    async plugininstancesList(requestParameters: PlugininstancesListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedPluginInstanceList> {
        const response = await this.plugininstancesListRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const PlugininstancesListFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type PlugininstancesListFormatEnum = typeof PlugininstancesListFormatEnum[keyof typeof PlugininstancesListFormatEnum];
