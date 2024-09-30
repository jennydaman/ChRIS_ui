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
  Note,
  NoteRequest,
} from '../models/index';
import {
    NoteFromJSON,
    NoteToJSON,
    NoteRequestFromJSON,
    NoteRequestToJSON,
} from '../models/index';

export interface NoteRetrieveRequest {
    id: number;
    format?: NoteRetrieveFormatEnum;
}

export interface NoteUpdateRequest {
    id: number;
    format?: NoteUpdateFormatEnum;
    noteRequest?: NoteRequest;
}

/**
 * NoteApi - interface
 * 
 * @export
 * @interface NoteApiInterface
 */
export interface NoteApiInterface {
    /**
     * A note view.
     * @param {number} id 
     * @param {'collection+json' | 'json'} [format] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NoteApiInterface
     */
    noteRetrieveRaw(requestParameters: NoteRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Note>>;

    /**
     * A note view.
     */
    noteRetrieve(requestParameters: NoteRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Note>;

    /**
     * A note view.
     * @param {number} id 
     * @param {'collection+json' | 'json'} [format] 
     * @param {NoteRequest} [noteRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NoteApiInterface
     */
    noteUpdateRaw(requestParameters: NoteUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Note>>;

    /**
     * A note view.
     */
    noteUpdate(requestParameters: NoteUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Note>;

}

/**
 * 
 */
export class NoteApi extends runtime.BaseAPI implements NoteApiInterface {

    /**
     * A note view.
     */
    async noteRetrieveRaw(requestParameters: NoteRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Note>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling noteRetrieve().'
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
            path: `/api/v1/note{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => NoteFromJSON(jsonValue));
    }

    /**
     * A note view.
     */
    async noteRetrieve(requestParameters: NoteRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Note> {
        const response = await this.noteRetrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * A note view.
     */
    async noteUpdateRaw(requestParameters: NoteUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Note>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling noteUpdate().'
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
            path: `/api/v1/note{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: NoteRequestToJSON(requestParameters['noteRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => NoteFromJSON(jsonValue));
    }

    /**
     * A note view.
     */
    async noteUpdate(requestParameters: NoteUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Note> {
        const response = await this.noteUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const NoteRetrieveFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type NoteRetrieveFormatEnum = typeof NoteRetrieveFormatEnum[keyof typeof NoteRetrieveFormatEnum];
/**
 * @export
 */
export const NoteUpdateFormatEnum = {
    Collectionjson: 'collection+json',
    Json: 'json'
} as const;
export type NoteUpdateFormatEnum = typeof NoteUpdateFormatEnum[keyof typeof NoteUpdateFormatEnum];
