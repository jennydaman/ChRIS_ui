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
import type { PermissionEnum } from './PermissionEnum';
import {
    PermissionEnumFromJSON,
    PermissionEnumFromJSONTyped,
    PermissionEnumToJSON,
} from './PermissionEnum';

/**
 * 
 * @export
 * @interface FileBrowserLinkFileUserPermission
 */
export interface FileBrowserLinkFileUserPermission {
    /**
     * 
     * @type {string}
     * @memberof FileBrowserLinkFileUserPermission
     */
    readonly url: string;
    /**
     * 
     * @type {number}
     * @memberof FileBrowserLinkFileUserPermission
     */
    readonly id: number;
    /**
     * 
     * @type {PermissionEnum}
     * @memberof FileBrowserLinkFileUserPermission
     */
    permission?: PermissionEnum;
    /**
     * 
     * @type {number}
     * @memberof FileBrowserLinkFileUserPermission
     */
    readonly linkFileId: number;
    /**
     * 
     * @type {string}
     * @memberof FileBrowserLinkFileUserPermission
     */
    readonly linkFileFname: string;
    /**
     * 
     * @type {number}
     * @memberof FileBrowserLinkFileUserPermission
     */
    readonly userId: number;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     * @type {string}
     * @memberof FileBrowserLinkFileUserPermission
     */
    readonly userUsername: string;
    /**
     * 
     * @type {string}
     * @memberof FileBrowserLinkFileUserPermission
     */
    readonly linkFile: string;
    /**
     * 
     * @type {string}
     * @memberof FileBrowserLinkFileUserPermission
     */
    readonly user: string;
}



/**
 * Check if a given object implements the FileBrowserLinkFileUserPermission interface.
 */
export function instanceOfFileBrowserLinkFileUserPermission(value: object): value is FileBrowserLinkFileUserPermission {
    if (!('url' in value) || value['url'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('linkFileId' in value) || value['linkFileId'] === undefined) return false;
    if (!('linkFileFname' in value) || value['linkFileFname'] === undefined) return false;
    if (!('userId' in value) || value['userId'] === undefined) return false;
    if (!('userUsername' in value) || value['userUsername'] === undefined) return false;
    if (!('linkFile' in value) || value['linkFile'] === undefined) return false;
    if (!('user' in value) || value['user'] === undefined) return false;
    return true;
}

export function FileBrowserLinkFileUserPermissionFromJSON(json: any): FileBrowserLinkFileUserPermission {
    return FileBrowserLinkFileUserPermissionFromJSONTyped(json, false);
}

export function FileBrowserLinkFileUserPermissionFromJSONTyped(json: any, ignoreDiscriminator: boolean): FileBrowserLinkFileUserPermission {
    if (json == null) {
        return json;
    }
    return {
        
        'url': json['url'],
        'id': json['id'],
        'permission': json['permission'] == null ? undefined : PermissionEnumFromJSON(json['permission']),
        'linkFileId': json['link_file_id'],
        'linkFileFname': json['link_file_fname'],
        'userId': json['user_id'],
        'userUsername': json['user_username'],
        'linkFile': json['link_file'],
        'user': json['user'],
    };
}

export function FileBrowserLinkFileUserPermissionToJSON(value?: Omit<FileBrowserLinkFileUserPermission, 'url'|'id'|'link_file_id'|'link_file_fname'|'user_id'|'user_username'|'link_file'|'user'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'permission': PermissionEnumToJSON(value['permission']),
    };
}

