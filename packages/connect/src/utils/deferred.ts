import { CommonTypes, Device } from '../types';

// export type AsyncDeferred<T> = {
//     promise: Promise<T>,
//     resolve: (t: T) => void,
//     reject: (e: Error) => void,
//     run: Function,
// };

type DfdArg = (() => Promise<void>) | string | undefined | null;
export const createDeferred = <T>(arg?: DfdArg, device?: Device.TrezorDevice): CommonTypes.Deferred<T> => {
    let localResolve: (value?: T | PromiseLike<T>) => void = () => {};
    let localReject: (reason?: any) => void = () => {};
    let id: string | undefined;

    const promise: Promise<T> = new Promise(async (resolve, reject) => {
        localResolve = resolve;
        localReject = reject;
        if (typeof arg === 'function') {
            try {
                await arg();
            } catch (error) {
                reject(error);
            }
        }
        if (typeof arg === 'string') id = arg;
    });

    return {
        id,
        device,
        resolve: localResolve,
        reject: localReject,
        promise,
    };
}

// export function createAsync<T>(innerFn: Function): AsyncDeferred<T> {
//     let localResolve: (t: T) => void = (t: T) => {};
//     let localReject: (e?: ?Error) => void = (e) => {};

//     const promise: Promise<T> = new Promise((resolve, reject) => {
//         localResolve = resolve;
//         localReject = reject;
//     });

//     const inner = async (): Promise<void> => {
//         await innerFn();
//     };

//     return {
//         resolve: localResolve,
//         reject: localReject,
//         promise,
//         run: () => {
//             inner();
//             return promise;
//         },
//     };
// }

// export function resolveTimeoutPromise<T>(delay: number, result: T): Promise<T> {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(result);
//         }, delay);
//     });
// }

// export function rejectTimeoutPromise(delay: number, error: Error): Promise<any> {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject(error);
//         }, delay);
//     });
// }