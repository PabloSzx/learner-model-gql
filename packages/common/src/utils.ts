export async function PromiseAllCallbacks<T1>(
  ...args: readonly [() => Promise<T1>]
): Promise<readonly [T1]>;
export async function PromiseAllCallbacks<T1, T2>(
  ...args: readonly [() => Promise<T1>, () => Promise<T2>]
): Promise<readonly [T1, T2]>;
export async function PromiseAllCallbacks<T1, T2, T3>(
  ...args: readonly [() => Promise<T1>, () => Promise<T2>, () => Promise<T3>]
): Promise<readonly [T1, T2, T3]>;
export async function PromiseAllCallbacks<T1, T2, T3, T4>(
  ...args: readonly [
    () => Promise<T1>,
    () => Promise<T2>,
    () => Promise<T3>,
    () => Promise<T4>
  ]
): Promise<readonly [T1, T2, T3, T4]>;
export async function PromiseAllCallbacks<T1, T2, T3, T4, T5>(
  ...args: readonly [
    () => Promise<T1>,
    () => Promise<T2>,
    () => Promise<T3>,
    () => Promise<T4>,
    () => Promise<T5>
  ]
): Promise<readonly [T1, T2, T3, T4, T5]>;
export async function PromiseAllCallbacks<T1, T2, T3, T4, T5, T6>(
  ...args: readonly [
    () => Promise<T1>,
    () => Promise<T2>,
    () => Promise<T3>,
    () => Promise<T4>,
    () => Promise<T5>,
    () => Promise<T6>
  ]
): Promise<readonly [T1, T2, T3, T4, T5, T6]>;
export async function PromiseAllCallbacks(
  ...args: Array<() => Promise<unknown>>
): Promise<readonly any[]> {
  return Promise.all(args.map((v) => v()));
}
