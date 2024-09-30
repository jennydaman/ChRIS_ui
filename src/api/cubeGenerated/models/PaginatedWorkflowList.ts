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
import type { Workflow } from './Workflow';
import {
    WorkflowFromJSON,
    WorkflowFromJSONTyped,
    WorkflowToJSON,
} from './Workflow';

/**
 * 
 * @export
 * @interface PaginatedWorkflowList
 */
export interface PaginatedWorkflowList {
    /**
     * 
     * @type {number}
     * @memberof PaginatedWorkflowList
     */
    count?: number;
    /**
     * 
     * @type {string}
     * @memberof PaginatedWorkflowList
     */
    next?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PaginatedWorkflowList
     */
    previous?: string | null;
    /**
     * 
     * @type {Array<Workflow>}
     * @memberof PaginatedWorkflowList
     */
    results?: Array<Workflow>;
}

/**
 * Check if a given object implements the PaginatedWorkflowList interface.
 */
export function instanceOfPaginatedWorkflowList(value: object): value is PaginatedWorkflowList {
    return true;
}

export function PaginatedWorkflowListFromJSON(json: any): PaginatedWorkflowList {
    return PaginatedWorkflowListFromJSONTyped(json, false);
}

export function PaginatedWorkflowListFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedWorkflowList {
    if (json == null) {
        return json;
    }
    return {
        
        'count': json['count'] == null ? undefined : json['count'],
        'next': json['next'] == null ? undefined : json['next'],
        'previous': json['previous'] == null ? undefined : json['previous'],
        'results': json['results'] == null ? undefined : ((json['results'] as Array<any>).map(WorkflowFromJSON)),
    };
}

export function PaginatedWorkflowListToJSON(value?: PaginatedWorkflowList | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'count': value['count'],
        'next': value['next'],
        'previous': value['previous'],
        'results': value['results'] == null ? undefined : ((value['results'] as Array<any>).map(WorkflowToJSON)),
    };
}

