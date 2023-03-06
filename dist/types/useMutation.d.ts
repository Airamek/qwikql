import { RequestDocument } from 'graphql-request';
interface MutationStore {
    data: any;
    loading: boolean;
    error: {
        message: string;
    } | null;
}
export declare const useMutation: (mutation: RequestDocument) => {
    mutate$: import("@builder.io/qwik").QRL<(variables: Record<string, any>) => Promise<void>>;
    result: MutationStore;
};
export {};
