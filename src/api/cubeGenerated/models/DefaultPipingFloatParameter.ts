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
 * @interface DefaultPipingFloatParameter
 */
export interface DefaultPipingFloatParameter {
    /**
     * 
     * @type {string}
     * @memberof DefaultPipingFloatParameter
     */
    readonly url: string;
    /**
     * 
     * @type {number}
     * @memberof DefaultPipingFloatParameter
     */
    readonly id: number;
    /**
     * 
     * @type {number}
     * @memberof DefaultPipingFloatParameter
     */
    value?: number | null;
    /**
     * 
     * @type {Type249Enum}
     * @memberof DefaultPipingFloatParameter
     */
    readonly type: Type249Enum;
    /**
     * 
     * @type {number}
     * @memberof DefaultPipingFloatParameter
     */
    readonly pluginPipingId: number;
    /**
     * 
     * @type {string}
     * @memberof DefaultPipingFloatParameter
     */
    readonly pluginPipingTitle: string;
    /**
     * 
     * @type {number}
     * @memberof DefaultPipingFloatParameter
     */
    readonly previousPluginPipingId: number | null;
    /**
     * 
     * @type {string}
     * @memberof DefaultPipingFloatParameter
     */
    readonly paramName: string;
    /**
     * 
     * @type {number}
     * @memberof DefaultPipingFloatParameter
     */
    readonly paramId: number;
    /**
     * 
     * @type {string}
     * @memberof DefaultPipingFloatParameter
     */
    readonly pluginPiping: string;
    /**
     * 
     * @type {string}
     * @memberof DefaultPipingFloatParameter
     */
    readonly pluginName: string;
    /**
     * 
     * @type {string}
     * @memberof DefaultPipingFloatParameter
     */
    readonly pluginVersion: string;
    /**
     * 
     * @type {number}
     * @memberof DefaultPipingFloatParameter
     */
    readonly pluginId: number;
    /**
     * 
     * @type {string}
     * @memberof DefaultPipingFloatParameter
     */
    readonly pluginParam: string;
}



/**
 * Check if a given object implements the DefaultPipingFloatParameter interface.
 */
export function instanceOfDefaultPipingFloatParameter(value: object): value is DefaultPipingFloatParameter {
    if (!('url' in value) || value['url'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('pluginPipingId' in value) || value['pluginPipingId'] === undefined) return false;
    if (!('pluginPipingTitle' in value) || value['pluginPipingTitle'] === undefined) return false;
    if (!('previousPluginPipingId' in value) || value['previousPluginPipingId'] === undefined) return false;
    if (!('paramName' in value) || value['paramName'] === undefined) return false;
    if (!('paramId' in value) || value['paramId'] === undefined) return false;
    if (!('pluginPiping' in value) || value['pluginPiping'] === undefined) return false;
    if (!('pluginName' in value) || value['pluginName'] === undefined) return false;
    if (!('pluginVersion' in value) || value['pluginVersion'] === undefined) return false;
    if (!('pluginId' in value) || value['pluginId'] === undefined) return false;
    if (!('pluginParam' in value) || value['pluginParam'] === undefined) return false;
    return true;
}

export function DefaultPipingFloatParameterFromJSON(json: any): DefaultPipingFloatParameter {
    return DefaultPipingFloatParameterFromJSONTyped(json, false);
}

export function DefaultPipingFloatParameterFromJSONTyped(json: any, ignoreDiscriminator: boolean): DefaultPipingFloatParameter {
    if (json == null) {
        return json;
    }
    return {
        
        'url': json['url'],
        'id': json['id'],
        'value': json['value'] == null ? undefined : json['value'],
        'type': Type249EnumFromJSON(json['type']),
        'pluginPipingId': json['plugin_piping_id'],
        'pluginPipingTitle': json['plugin_piping_title'],
        'previousPluginPipingId': json['previous_plugin_piping_id'],
        'paramName': json['param_name'],
        'paramId': json['param_id'],
        'pluginPiping': json['plugin_piping'],
        'pluginName': json['plugin_name'],
        'pluginVersion': json['plugin_version'],
        'pluginId': json['plugin_id'],
        'pluginParam': json['plugin_param'],
    };
}

export function DefaultPipingFloatParameterToJSON(value?: Omit<DefaultPipingFloatParameter, 'url'|'id'|'type'|'plugin_piping_id'|'plugin_piping_title'|'previous_plugin_piping_id'|'param_name'|'param_id'|'plugin_piping'|'plugin_name'|'plugin_version'|'plugin_id'|'plugin_param'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'value': value['value'],
    };
}

