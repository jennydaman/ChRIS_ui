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
 * @interface PipelineCustomJson
 */
export interface PipelineCustomJson {
    /**
     * 
     * @type {string}
     * @memberof PipelineCustomJson
     */
    readonly url: string;
    /**
     * 
     * @type {string}
     * @memberof PipelineCustomJson
     */
    name: string;
    /**
     * 
     * @type {boolean}
     * @memberof PipelineCustomJson
     */
    locked?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PipelineCustomJson
     */
    authors?: string;
    /**
     * 
     * @type {string}
     * @memberof PipelineCustomJson
     */
    category?: string;
    /**
     * 
     * @type {string}
     * @memberof PipelineCustomJson
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof PipelineCustomJson
     */
    readonly pluginTree: string;
}

/**
 * Check if a given object implements the PipelineCustomJson interface.
 */
export function instanceOfPipelineCustomJson(value: object): value is PipelineCustomJson {
    if (!('url' in value) || value['url'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('pluginTree' in value) || value['pluginTree'] === undefined) return false;
    return true;
}

export function PipelineCustomJsonFromJSON(json: any): PipelineCustomJson {
    return PipelineCustomJsonFromJSONTyped(json, false);
}

export function PipelineCustomJsonFromJSONTyped(json: any, ignoreDiscriminator: boolean): PipelineCustomJson {
    if (json == null) {
        return json;
    }
    return {
        
        'url': json['url'],
        'name': json['name'],
        'locked': json['locked'] == null ? undefined : json['locked'],
        'authors': json['authors'] == null ? undefined : json['authors'],
        'category': json['category'] == null ? undefined : json['category'],
        'description': json['description'] == null ? undefined : json['description'],
        'pluginTree': json['plugin_tree'],
    };
}

export function PipelineCustomJsonToJSON(value?: Omit<PipelineCustomJson, 'url'|'plugin_tree'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'name': value['name'],
        'locked': value['locked'],
        'authors': value['authors'],
        'category': value['category'],
        'description': value['description'],
    };
}

