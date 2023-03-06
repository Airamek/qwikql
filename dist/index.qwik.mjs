import { createContext, componentQrl, inlinedQrl, useStore, useContextProvider, useLexicalScope, Slot, useContext } from "@builder.io/qwik";
import { jsx } from "@builder.io/qwik/jsx-runtime";
import { request } from "graphql-request";
const QwikqlURLContext = createContext("qwikql.url");
const QwikqlRequestContextContext = createContext("qwikql.requestContext");
const QwikqlSetHeadersContext = createContext("qwikql.setHeaders");
const QwikQL = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  if (!props.url)
    throw new Error("url prop is missing in QwikQL");
  const context = useStore({
    headers: props.headers || {}
  });
  useContextProvider(QwikqlURLContext, {
    url: props.url
  });
  useContextProvider(QwikqlRequestContextContext, context);
  useContextProvider(QwikqlSetHeadersContext, /* @__PURE__ */ inlinedQrl((headers) => {
    const [context2] = useLexicalScope();
    context2.headers = headers;
  }, "QwikQL_component_useContextProvider_0aOXb0uJd2o", [
    context
  ]));
  return /* @__PURE__ */ jsx(Slot, {}, "kh_0");
}, "QwikQL_component_0KkHy03Ry0k"));
function toQwikqlError(error) {
  if (error instanceof Error) {
    let message = error.message;
    if (/\{\s*"message"/gi.test(message)) {
      const matches = message.match(/"message"[^"]*?"(.*?)"/);
      message = (matches == null ? void 0 : matches[1]) || message;
    }
    return {
      message
    };
  }
  if (typeof error === "string")
    return {
      message: error
    };
  return {
    message: "error"
  };
}
const useMutation = (mutation) => {
  const url = useContext(QwikqlURLContext).url;
  const requestContext = useContext(QwikqlRequestContextContext);
  const mutationAsString = mutation == null ? void 0 : mutation.toString();
  const result = useStore({
    data: void 0,
    loading: false,
    error: null
  });
  const mutate$ = /* @__PURE__ */ inlinedQrl(async (variables) => {
    const [mutationAsString2, requestContext2, result2, url2] = useLexicalScope();
    result2.loading = true;
    try {
      result2.data = await request({
        url: url2,
        document: mutationAsString2,
        variables,
        requestHeaders: requestContext2.headers
      });
    } catch (error) {
      result2.error = toQwikqlError(error);
    }
    result2.loading = false;
  }, "useMutation_mutate_j7qp444b3v8", [
    mutationAsString,
    requestContext,
    result,
    url
  ]);
  return {
    mutate$,
    result
  };
};
const useQuery = (query) => {
  const queryAsString = query.toString();
  const url = useContext(QwikqlURLContext).url;
  const requestContext = useContext(QwikqlRequestContextContext);
  const executeQuery$ = /* @__PURE__ */ inlinedQrl(async (queryConfig = {}) => {
    const [queryAsString2, requestContext2, url2] = useLexicalScope();
    try {
      return await request({
        url: url2,
        document: queryAsString2,
        variables: queryConfig.variables || void 0,
        requestHeaders: requestContext2.headers
      });
    } catch (error) {
      return Promise.reject(toQwikqlError(error));
    }
  }, "useQuery_executeQuery_1ad0AaNXfx8", [
    queryAsString,
    requestContext,
    url
  ]);
  return {
    executeQuery$
  };
};
const useHeaders = () => useContext(QwikqlSetHeadersContext);
export {
  QwikQL,
  useHeaders,
  useMutation,
  useQuery
};
