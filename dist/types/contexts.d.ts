import { QRL } from '@builder.io/qwik';
export declare const QwikqlURLContext: import("@builder.io/qwik").ContextId<{
    url: string;
}>;
export declare const QwikqlRequestContextContext: import("@builder.io/qwik").ContextId<{
    headers: Record<string, string>;
}>;
export declare const QwikqlSetHeadersContext: import("@builder.io/qwik").ContextId<QRL<(headers: Record<string, string>) => void>>;
