/* tslint:disable */
/* eslint-disable */
/**
 * pfdcm
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 3.1.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { SMDBFsCore } from './SMDBFsCore';
import {
    SMDBFsCoreFromJSON,
    SMDBFsCoreFromJSONTyped,
    SMDBFsCoreToJSON,
} from './SMDBFsCore';

/**
 * A full model that is returned from a call to the DB
 * @export
 * @interface SMDBFsReturnModel
 */
export interface SMDBFsReturnModel {
    /**
     * 
     * @type {boolean}
     * @memberof SMDBFsReturnModel
     */
    status?: boolean;
    /**
     * 
     * @type {string}
     * @memberof SMDBFsReturnModel
     */
    fsKeyName: string;
    /**
     * 
     * @type {SMDBFsCore}
     * @memberof SMDBFsReturnModel
     */
    fsInfo: SMDBFsCore;
}

/**
 * Check if a given object implements the SMDBFsReturnModel interface.
 */
export function instanceOfSMDBFsReturnModel(value: object): value is SMDBFsReturnModel {
    if (!('fsKeyName' in value) || value['fsKeyName'] === undefined) return false;
    if (!('fsInfo' in value) || value['fsInfo'] === undefined) return false;
    return true;
}

export function SMDBFsReturnModelFromJSON(json: any): SMDBFsReturnModel {
    return SMDBFsReturnModelFromJSONTyped(json, false);
}

export function SMDBFsReturnModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): SMDBFsReturnModel {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'fsKeyName': json['fsKeyName'],
        'fsInfo': SMDBFsCoreFromJSON(json['fsInfo']),
    };
}

export function SMDBFsReturnModelToJSON(value?: SMDBFsReturnModel | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'fsKeyName': value['fsKeyName'],
        'fsInfo': SMDBFsCoreToJSON(value['fsInfo']),
    };
}
