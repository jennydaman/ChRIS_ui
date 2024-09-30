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
 * @interface PluginPiping
 */
export interface PluginPiping {
    /**
     * 
     * @type {string}
     * @memberof PluginPiping
     */
    readonly url: string;
    /**
     * 
     * @type {number}
     * @memberof PluginPiping
     */
    readonly id: number;
    /**
     * 
     * @type {number}
     * @memberof PluginPiping
     */
    readonly previousId: number;
    /**
     * 
     * @type {string}
     * @memberof PluginPiping
     */
    title: string;
    /**
     * 
     * @type {number}
     * @memberof PluginPiping
     */
    readonly pluginId: number;
    /**
     * 
     * @type {string}
     * @memberof PluginPiping
     */
    readonly pluginName: string;
    /**
     * 
     * @type {string}
     * @memberof PluginPiping
     */
    readonly pluginVersion: string;
    /**
     * 
     * @type {number}
     * @memberof PluginPiping
     */
    readonly pipelineId: number;
    /**
     * 
     * @type {string}
     * @memberof PluginPiping
     */
    readonly previous: string;
    /**
     * 
     * @type {string}
     * @memberof PluginPiping
     */
    readonly plugin: string;
    /**
     * 
     * @type {string}
     * @memberof PluginPiping
     */
    readonly pipeline: string;
}

/**
 * Check if a given object implements the PluginPiping interface.
 */
export function instanceOfPluginPiping(value: object): value is PluginPiping {
    if (!('url' in value) || value['url'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('previousId' in value) || value['previousId'] === undefined) return false;
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('pluginId' in value) || value['pluginId'] === undefined) return false;
    if (!('pluginName' in value) || value['pluginName'] === undefined) return false;
    if (!('pluginVersion' in value) || value['pluginVersion'] === undefined) return false;
    if (!('pipelineId' in value) || value['pipelineId'] === undefined) return false;
    if (!('previous' in value) || value['previous'] === undefined) return false;
    if (!('plugin' in value) || value['plugin'] === undefined) return false;
    if (!('pipeline' in value) || value['pipeline'] === undefined) return false;
    return true;
}

export function PluginPipingFromJSON(json: any): PluginPiping {
    return PluginPipingFromJSONTyped(json, false);
}

export function PluginPipingFromJSONTyped(json: any, ignoreDiscriminator: boolean): PluginPiping {
    if (json == null) {
        return json;
    }
    return {
        
        'url': json['url'],
        'id': json['id'],
        'previousId': json['previous_id'],
        'title': json['title'],
        'pluginId': json['plugin_id'],
        'pluginName': json['plugin_name'],
        'pluginVersion': json['plugin_version'],
        'pipelineId': json['pipeline_id'],
        'previous': json['previous'],
        'plugin': json['plugin'],
        'pipeline': json['pipeline'],
    };
}

export function PluginPipingToJSON(value?: Omit<PluginPiping, 'url'|'id'|'previous_id'|'plugin_id'|'plugin_name'|'plugin_version'|'pipeline_id'|'previous'|'plugin'|'pipeline'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'title': value['title'],
    };
}

