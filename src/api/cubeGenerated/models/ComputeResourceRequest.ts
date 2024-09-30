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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ComputeResourceRequest
 */
export interface ComputeResourceRequest {
    /**
     * 
     * @type {string}
     * @memberof ComputeResourceRequest
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof ComputeResourceRequest
     */
    computeUrl: string;
    /**
     * 
     * @type {string}
     * @memberof ComputeResourceRequest
     */
    computeAuthUrl?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ComputeResourceRequest
     */
    computeInnetwork?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ComputeResourceRequest
     */
    computeUser: string;
    /**
     * 
     * @type {string}
     * @memberof ComputeResourceRequest
     */
    computePassword: string;
    /**
     * 
     * @type {string}
     * @memberof ComputeResourceRequest
     */
    computeAuthToken?: string;
    /**
     * 
     * @type {string}
     * @memberof ComputeResourceRequest
     */
    description?: string;
    /**
     * 
     * @type {number}
     * @memberof ComputeResourceRequest
     */
    maxJobExecSeconds?: number;
}

/**
 * Check if a given object implements the ComputeResourceRequest interface.
 */
export function instanceOfComputeResourceRequest(value: object): value is ComputeResourceRequest {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('computeUrl' in value) || value['computeUrl'] === undefined) return false;
    if (!('computeUser' in value) || value['computeUser'] === undefined) return false;
    if (!('computePassword' in value) || value['computePassword'] === undefined) return false;
    return true;
}

export function ComputeResourceRequestFromJSON(json: any): ComputeResourceRequest {
    return ComputeResourceRequestFromJSONTyped(json, false);
}

export function ComputeResourceRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComputeResourceRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'computeUrl': json['compute_url'],
        'computeAuthUrl': json['compute_auth_url'] == null ? undefined : json['compute_auth_url'],
        'computeInnetwork': json['compute_innetwork'] == null ? undefined : json['compute_innetwork'],
        'computeUser': json['compute_user'],
        'computePassword': json['compute_password'],
        'computeAuthToken': json['compute_auth_token'] == null ? undefined : json['compute_auth_token'],
        'description': json['description'] == null ? undefined : json['description'],
        'maxJobExecSeconds': json['max_job_exec_seconds'] == null ? undefined : json['max_job_exec_seconds'],
    };
}

export function ComputeResourceRequestToJSON(value?: ComputeResourceRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'name': value['name'],
        'compute_url': value['computeUrl'],
        'compute_auth_url': value['computeAuthUrl'],
        'compute_innetwork': value['computeInnetwork'],
        'compute_user': value['computeUser'],
        'compute_password': value['computePassword'],
        'compute_auth_token': value['computeAuthToken'],
        'description': value['description'],
        'max_job_exec_seconds': value['maxJobExecSeconds'],
    };
}

