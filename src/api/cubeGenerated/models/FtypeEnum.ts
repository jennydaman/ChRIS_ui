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


/**
 * * `yaml` - YAML file
 * * `json` - JSON file
 * @export
 */
export const FtypeEnum = {
    Yaml: 'yaml',
    Json: 'json'
} as const;
export type FtypeEnum = typeof FtypeEnum[keyof typeof FtypeEnum];


export function instanceOfFtypeEnum(value: any): boolean {
    for (const key in FtypeEnum) {
        if (Object.prototype.hasOwnProperty.call(FtypeEnum, key)) {
            if (FtypeEnum[key as keyof typeof FtypeEnum] === value) {
                return true;
            }
        }
    }
    return false;
}

export function FtypeEnumFromJSON(json: any): FtypeEnum {
    return FtypeEnumFromJSONTyped(json, false);
}

export function FtypeEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): FtypeEnum {
    return json as FtypeEnum;
}

export function FtypeEnumToJSON(value?: FtypeEnum | null): any {
    return value as any;
}

