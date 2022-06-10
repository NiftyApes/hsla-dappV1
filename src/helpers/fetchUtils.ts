type FetchParams = {
  url: string;
  options?: FetchOptions;
  data?: Record<string, string>;
  withResponseHeaders?: boolean;
};

// These get passed to fetch()
type FetchOptions = {
  headers?: Record<string, string>;
  body?: string;
  method?: string;
};

export enum RequestErrorType {
  TIMEOUT = 'Timeout',
  httpNonOk = 'HttpNonOk',
}

export class RequestError extends Error {
  private _type: RequestErrorType;
  private _httpErrorCode?: number;
  private _response?: Response;

  constructor(type: RequestErrorType, httpErrorCode?: number, response?: Response) {
    super();
    this._type = type;
    this._httpErrorCode = httpErrorCode;
    this._response = response;
  }

  get type() {
    return this._type;
  }

  get httpErrorCode() {
    return this._httpErrorCode;
  }

  get response() {
    return this._response;
  }
}

function baseFetch({ url, options }: FetchParams) {
  if (!url) {
    return Promise.reject(new Error('Fetching invalid URL'));
  }

  return fetch(url, options);
}

export function get({ url, data, options }: FetchParams) {
  return baseFetch({
    url: appendParamsToQueryString(url, paramify(data)),
    options: { headers: options?.headers },
  });
}

export async function getJson(params: FetchParams): Promise<JSON> {
  const { withResponseHeaders } = params;

  const response = await get(params);
  if (!response.ok) {
    throw new RequestError(RequestErrorType.httpNonOk, response.status, response);
  }
  const json = response.status === 204 ? {} : await response.json();
  return await (withResponseHeaders
    ? {
        response: json,
        fetchResponse: response,
        headers: response.headers,
      }
    : json);
}

export type DynamoDbResponse<T> = {
  Count: number;
  Items: Array<T>;
  ScannedCount: number;
};

export async function getData<T>(
  params: FetchParams,
  instantiator?: (json: any) => T,
): Promise<DynamoDbResponse<T>> {
  const json = (await getJson(params)) as unknown;
  const response = json as DynamoDbResponse<T>;

  if (instantiator && response?.Items) {
    return {
      ...response,
      Items: response.Items.map(instantiator),
    };
  }

  return response;
}

export function post({ url, data, options }: FetchParams) {
  const headers = options?.headers ?? {};
  return baseFetch({
    url,
    options: {
      body: paramify(data),
      method: 'post',
      headers: {
        ...headers,
        'Content-Type': headers['Content-Type'] || 'application/x-www-form-urlencoded',
      },
    },
  });
}

export async function postJson(options: FetchParams) {
  const { withResponseHeaders } = options;

  const response = await post(options);
  if (!response.ok) {
    throw new RequestError(RequestErrorType.httpNonOk, response.status, response);
  }
  const json = response.status === 204 ? {} : await response.json();
  return await (withResponseHeaders
    ? {
        response: json,
        fetchResponse: response,
        headers: response.headers,
      }
    : json);
}

export const isClient = typeof document !== 'undefined';

export function paramify(
  data: Record<string, string> | string | undefined,
  excludeUndefined = false,
) {
  if (!data) {
    return '';
  }
  if (typeof data !== 'object') {
    return data;
  }
  const form: Array<string> = [];
  Object.keys(data || {}).forEach((key) => {
    if (excludeUndefined && data[key] === undefined) {
      return;
    }
    form.push(`${key}=${data[key]}`);
  });

  return form.join('&');
}

export function appendParamsToQueryString(url: string, paramsString: string) {
  if (paramsString) {
    const mark = url.match(/\?/) ? '&' : '?';
    return `${url}${mark}${paramsString}`;
  }
  return url;
}
