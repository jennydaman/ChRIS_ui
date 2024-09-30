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
import type { Type249Enum } from './Type249Enum';
import {
    Type249EnumFromJSON,
    Type249EnumFromJSONTyped,
    Type249EnumToJSON,
} from './Type249Enum';

/**
 * 
 * @export
 * @interface GenericParameter
 */
export interface GenericParameter {
    /**
     * 
     * @type {string}
     * @memberof GenericParameter
     */
    readonly url: string;
    /**
     * 
     * @type {number}
     * @memberof GenericParameter
     */
    readonly id: number;
    /**
     * 
     * @type {string}
     * @memberof GenericParameter
     */
    readonly paramName: string;
    /**
     * 
     * @type {string}
     * @memberof GenericParameter
     */
    readonly value: string;
    /**
     * 
     * @type {Type249Enum}
     * @memberof GenericParameter
     */
    readonly type: Type249Enum;
    /**
     * 
     * @type {string}
     * @memberof GenericParameter
     */
    readonly pluginInst: string;
    /**
     * 
     * @type {string}
     * @memberof GenericParameter
     */
    readonly pluginParam: string;
}



/**
 * Check if a given object implements the GenericParameter interface.
 */
export function instanceOfGenericParameter(value: object): value is GenericParameter {
    if (!('url' in value) || value['url'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('paramName' in value) || value['paramName'] === undefined) return false;
    if (!('value' in value) || value['value'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('pluginInst' in value) || value['pluginInst'] === undefined) return false;
    if (!('pluginParam' in value) || value['pluginParam'] === undefined) return false;
    return true;
}

export function GenericParameterFromJSON(json: any): GenericParameter {
    return GenericParameterFromJSONTyped(json, false);
}

export function GenericParameterFromJSONTyped(json: any, ignoreDiscriminator: boolean): GenericParameter {
    if (json == null) {
        return json;
    }
    return {
        
        'url': json['url'],
        'id': json['id'],
        'paramName': json['param_name'],
        'value': json['value'],
        'type': Type249EnumFromJSON(json['type']),
        'pluginInst': json['plugin_inst'],
        'pluginParam': json['plugin_param'],
    };
}

export function GenericParameterToJSON(value?: Omit<GenericParameter, 'url'|'id'|'param_name'|'value'|'type'|'plugin_inst'|'plugin_param'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
    };
}

