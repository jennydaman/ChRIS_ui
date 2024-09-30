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
 * @interface Comment
 */
export interface Comment {
    /**
     * 
     * @type {string}
     * @memberof Comment
     */
    readonly url: string;
    /**
     * 
     * @type {number}
     * @memberof Comment
     */
    readonly id: number;
    /**
     * 
     * @type {string}
     * @memberof Comment
     */
    title?: string;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     * @type {string}
     * @memberof Comment
     */
    readonly ownerUsername: string;
    /**
     * 
     * @type {string}
     * @memberof Comment
     */
    content?: string;
    /**
     * 
     * @type {string}
     * @memberof Comment
     */
    readonly feed: string;
}

/**
 * Check if a given object implements the Comment interface.
 */
export function instanceOfComment(value: object): value is Comment {
    if (!('url' in value) || value['url'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('ownerUsername' in value) || value['ownerUsername'] === undefined) return false;
    if (!('feed' in value) || value['feed'] === undefined) return false;
    return true;
}

export function CommentFromJSON(json: any): Comment {
    return CommentFromJSONTyped(json, false);
}

export function CommentFromJSONTyped(json: any, ignoreDiscriminator: boolean): Comment {
    if (json == null) {
        return json;
    }
    return {
        
        'url': json['url'],
        'id': json['id'],
        'title': json['title'] == null ? undefined : json['title'],
        'ownerUsername': json['owner_username'],
        'content': json['content'] == null ? undefined : json['content'],
        'feed': json['feed'],
    };
}

export function CommentToJSON(value?: Omit<Comment, 'url'|'id'|'owner_username'|'feed'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'title': value['title'],
        'content': value['content'],
    };
}

