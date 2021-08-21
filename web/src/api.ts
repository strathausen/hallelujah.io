import { ApiInterface as Api } from '../../server/src/types'

// type ExtractParam<K extends keyof Api> = Api[K] extends undefined ? null : InstanceType<Parameters<Api[K]>[0]>ReturnType
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type NonNullable<T> = T extends null | undefined ? never : T;


type ApiInterface = <K extends keyof Api>(path: K, arg: Expand<Parameters<Api[K]>[0]>) => ReturnType<Api[K]>;

type MakeUndefinedOptional<F extends ApiInterface> = Parameters<F>[1] extends undefined ? (path: Parameters<F>[0]) => ReturnType<F> : F


const callServer = (method: string, params: any) => { }


const fn: ApiInterface = callServer as any


const foo = await fn('listEditions')

fn('query', {q:'2', edition: 'foobar'})
