"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const qwik = require("@builder.io/qwik");
const jsxRuntime = require("@builder.io/qwik/jsx-runtime");
const graphqlRequest = require("graphql-request");
const QwikqlURLContext = qwik.createContext("qwikql.url");
const QwikqlRequestContextContext = qwik.createContext("qwikql.requestContext");
const QwikqlSetHeadersContext = qwik.createContext("qwikql.setHeaders");
const QwikQL = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  if (!props.url)
    throw new Error("url prop is missing in QwikQL");
  const context = qwik.useStore({
    headers: props.headers || {}
  });
  qwik.useContextProvider(QwikqlURLContext, {
    url: props.url
  });
  qwik.useContextProvider(QwikqlRequestContextContext, context);
  qwik.useContextProvider(QwikqlSetHeadersContext, /* @__PURE__ */ qwik.inlinedQrl((headers) => {
    const [context2] = qwik.useLexicalScope();
    context2.headers = headers;
  }, "QwikQL_component_useContextProvider_0aOXb0uJd2o", [
    context
  ]));
  return /* @__PURE__ */ jsxRuntime.jsx(qwik.Slot, {}, "kh_0");
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
  const url = qwik.useContext(QwikqlURLContext).url;
  const requestContext = qwik.useContext(QwikqlRequestContextContext);
  const mutationAsString = mutation == null ? void 0 : mutation.toString();
  const result = qwik.useStore({
    data: void 0,
    loading: false,
    error: null
  });
  const mutate$ = /* @__PURE__ */ qwik.inlinedQrl(async (variables) => {
    const [mutationAsString2, requestContext2, result2, url2] = qwik.useLexicalScope();
    result2.loading = true;
    try {
      result2.data = await graphqlRequest.request({
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
  const url = qwik.useContext(QwikqlURLContext).url;
  const requestContext = qwik.useContext(QwikqlRequestContextContext);
  const executeQuery$ = /* @__PURE__ */ qwik.inlinedQrl(async (queryConfig = {}) => {
    const [queryAsString2, requestContext2, url2] = qwik.useLexicalScope();
    try {
      return await graphqlRequest.request({
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
const useHeaders = () => qwik.useContext(QwikqlSetHeadersContext);
exports.QwikQL = QwikQL;
exports.useHeaders = useHeaders;
exports.useMutation = useMutation;
exports.useQuery = useQuery;
