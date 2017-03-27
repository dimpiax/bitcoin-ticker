/* @flow */

export default class Utils {
    static delay(timeInterval: number): Promise<void> {
        return new Promise((resolve: any) => { setTimeout(resolve, timeInterval) })
    }

    static isExistProperty(value: any, prop: string): boolean {
        return Object.prototype.hasOwnProperty.call(value, prop)
    }
}
