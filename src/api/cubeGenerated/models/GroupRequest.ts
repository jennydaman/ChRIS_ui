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
 * @interface GroupRequest
 */
export interface GroupRequest {
    /**
     * 
     * @type {string}
     * @memberof GroupRequest
     */
    name: string;
}

/**
 * Check if a given object implements the GroupRequest interface.
 */
export function instanceOfGroupRequest(value: object): value is GroupRequest {
    if (!('name' in value) || value['name'] === undefined) return false;
    return true;
}

export function GroupRequestFromJSON(json: any): GroupRequest {
    return GroupRequestFromJSONTyped(json, false);
}

export function GroupRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): GroupRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
    };
}

export function GroupRequestToJSON(value?: GroupRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'name': value['name'],
    };
}

