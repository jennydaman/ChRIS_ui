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
import type { GenericDefaultPipingParameter } from './GenericDefaultPipingParameter';
import {
    GenericDefaultPipingParameterFromJSON,
    GenericDefaultPipingParameterFromJSONTyped,
    GenericDefaultPipingParameterToJSON,
} from './GenericDefaultPipingParameter';

/**
 * 
 * @export
 * @interface PaginatedGenericDefaultPipingParameterList
 */
export interface PaginatedGenericDefaultPipingParameterList {
    /**
     * 
     * @type {number}
     * @memberof PaginatedGenericDefaultPipingParameterList
     */
    count?: number;
    /**
     * 
     * @type {string}
     * @memberof PaginatedGenericDefaultPipingParameterList
     */
    next?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PaginatedGenericDefaultPipingParameterList
     */
    previous?: string | null;
    /**
     * 
     * @type {Array<GenericDefaultPipingParameter>}
     * @memberof PaginatedGenericDefaultPipingParameterList
     */
    results?: Array<GenericDefaultPipingParameter>;
}

/**
 * Check if a given object implements the PaginatedGenericDefaultPipingParameterList interface.
 */
export function instanceOfPaginatedGenericDefaultPipingParameterList(value: object): value is PaginatedGenericDefaultPipingParameterList {
    return true;
}

export function PaginatedGenericDefaultPipingParameterListFromJSON(json: any): PaginatedGenericDefaultPipingParameterList {
    return PaginatedGenericDefaultPipingParameterListFromJSONTyped(json, false);
}

export function PaginatedGenericDefaultPipingParameterListFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedGenericDefaultPipingParameterList {
    if (json == null) {
        return json;
    }
    return {
        
        'count': json['count'] == null ? undefined : json['count'],
        'next': json['next'] == null ? undefined : json['next'],
        'previous': json['previous'] == null ? undefined : json['previous'],
        'results': json['results'] == null ? undefined : ((json['results'] as Array<any>).map(GenericDefaultPipingParameterFromJSON)),
    };
}

export function PaginatedGenericDefaultPipingParameterListToJSON(value?: PaginatedGenericDefaultPipingParameterList | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'count': value['count'],
        'next': value['next'],
        'previous': value['previous'],
        'results': value['results'] == null ? undefined : ((value['results'] as Array<any>).map(GenericDefaultPipingParameterToJSON)),
    };
}

