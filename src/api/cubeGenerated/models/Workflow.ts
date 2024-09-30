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
 * @interface Workflow
 */
export interface Workflow {
    /**
     * 
     * @type {string}
     * @memberof Workflow
     */
    readonly url: string;
    /**
     * 
     * @type {number}
     * @memberof Workflow
     */
    readonly id: number;
    /**
     * 
     * @type {Date}
     * @memberof Workflow
     */
    readonly creationDate: Date;
    /**
     * 
     * @type {string}
     * @memberof Workflow
     */
    title?: string;
    /**
     * 
     * @type {number}
     * @memberof Workflow
     */
    readonly pipelineId: number;
    /**
     * 
     * @type {string}
     * @memberof Workflow
     */
    readonly pipelineName: string;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     * @type {string}
     * @memberof Workflow
     */
    readonly ownerUsername: string;
    /**
     * 
     * @type {string}
     * @memberof Workflow
     */
    readonly createdJobs: string;
    /**
     * 
     * @type {string}
     * @memberof Workflow
     */
    readonly waitingJobs: string;
    /**
     * 
     * @type {string}
     * @memberof Workflow
     */
    readonly scheduledJobs: string;
    /**
     * 
     * @type {string}
     * @memberof Workflow
     */
    readonly startedJobs: string;
    /**
     * 
     * @type {string}
     * @memberof Workflow
     */
    readonly registeringJobs: string;
    /**
     * 
     * @type {string}
     * @memberof Workflow
     */
    readonly finishedJobs: string;
    /**
     * 
     * @type {string}
     * @memberof Workflow
     */
    readonly erroredJobs: string;
    /**
     * 
     * @type {string}
     * @memberof Workflow
     */
    readonly cancelledJobs: string;
    /**
     * 
     * @type {string}
     * @memberof Workflow
     */
    readonly pipeline: string;
    /**
     * 
     * @type {string}
     * @memberof Workflow
     */
    readonly pluginInstances: string;
}

/**
 * Check if a given object implements the Workflow interface.
 */
export function instanceOfWorkflow(value: object): value is Workflow {
    if (!('url' in value) || value['url'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('creationDate' in value) || value['creationDate'] === undefined) return false;
    if (!('pipelineId' in value) || value['pipelineId'] === undefined) return false;
    if (!('pipelineName' in value) || value['pipelineName'] === undefined) return false;
    if (!('ownerUsername' in value) || value['ownerUsername'] === undefined) return false;
    if (!('createdJobs' in value) || value['createdJobs'] === undefined) return false;
    if (!('waitingJobs' in value) || value['waitingJobs'] === undefined) return false;
    if (!('scheduledJobs' in value) || value['scheduledJobs'] === undefined) return false;
    if (!('startedJobs' in value) || value['startedJobs'] === undefined) return false;
    if (!('registeringJobs' in value) || value['registeringJobs'] === undefined) return false;
    if (!('finishedJobs' in value) || value['finishedJobs'] === undefined) return false;
    if (!('erroredJobs' in value) || value['erroredJobs'] === undefined) return false;
    if (!('cancelledJobs' in value) || value['cancelledJobs'] === undefined) return false;
    if (!('pipeline' in value) || value['pipeline'] === undefined) return false;
    if (!('pluginInstances' in value) || value['pluginInstances'] === undefined) return false;
    return true;
}

export function WorkflowFromJSON(json: any): Workflow {
    return WorkflowFromJSONTyped(json, false);
}

export function WorkflowFromJSONTyped(json: any, ignoreDiscriminator: boolean): Workflow {
    if (json == null) {
        return json;
    }
    return {
        
        'url': json['url'],
        'id': json['id'],
        'creationDate': (new Date(json['creation_date'])),
        'title': json['title'] == null ? undefined : json['title'],
        'pipelineId': json['pipeline_id'],
        'pipelineName': json['pipeline_name'],
        'ownerUsername': json['owner_username'],
        'createdJobs': json['created_jobs'],
        'waitingJobs': json['waiting_jobs'],
        'scheduledJobs': json['scheduled_jobs'],
        'startedJobs': json['started_jobs'],
        'registeringJobs': json['registering_jobs'],
        'finishedJobs': json['finished_jobs'],
        'erroredJobs': json['errored_jobs'],
        'cancelledJobs': json['cancelled_jobs'],
        'pipeline': json['pipeline'],
        'pluginInstances': json['plugin_instances'],
    };
}

export function WorkflowToJSON(value?: Omit<Workflow, 'url'|'id'|'creation_date'|'pipeline_id'|'pipeline_name'|'owner_username'|'created_jobs'|'waiting_jobs'|'scheduled_jobs'|'started_jobs'|'registering_jobs'|'finished_jobs'|'errored_jobs'|'cancelled_jobs'|'pipeline'|'plugin_instances'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'title': value['title'],
    };
}

