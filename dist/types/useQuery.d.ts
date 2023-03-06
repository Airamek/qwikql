import { RequestDocument } from 'graphql-request';
interface QueryConfig {
    variables?: Record<string, any>;
}
export declare const useQuery: (query: RequestDocument) => {
    executeQuery$: import("@builder.io/qwik").QRL<(queryConfig?: Partial<QueryConfig>) => Promise<any>>;
};
export {};
