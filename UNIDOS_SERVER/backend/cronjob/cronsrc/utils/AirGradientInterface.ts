/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Place {
  /** The unique id of the place */
  id?: number;
  /** The name of the place */
  name?: string;
  /** The IANA timezone id of the place */
  timezoneId?: string;
  /** The ISO country code of the place */
  countryId?: string;
  /** Optional public contributor name */
  publicName?: string | null;
  /** Optional public URL associated with the place */
  publicUrl?: string | null;
}

export interface LedMode {
  mode?: "co2" | "pm" | "off" | "default";
}
export interface Measurement{
  /**
   * The raw PM 1 value in ug / m3, rounded to 1 fraction digit
   * @format float
   */
  "pm01"?: number;
  /**
   * The raw PM 2.5 value in ug / m3, rounded to 1 fraction digit
   * @format float
   */
  "pm02"?: number;
  /**
   * The raw PM 10 value in ug / m3, rounded to 1 fraction digit
   * @format float
   */
  "pm10"?: number;
  /**
   * The PM 1 value with correction algorithms applied in ug / m3, rounded to 1 fraction digit
   * @format float
   */
  "pm01_corrected"?: number;
  /**
   * The PM 2.5 value with correction algorithms applied in ug / m3, rounded to 1 fraction digit
   * @format float
   */
  "pm02_corrected"?: number;
  /**
   * The PM 10 value with correction algorithms applied in ug / m3, rounded to 1 fraction digit
   * @format float
   */
  "pm10_corrected"?: number;
  /** The number of particles with a diameter beyond 0.3 microns in 1 deciliter of air */
  "pm003Count"?: number;
  /**
   * The ambient temperature in celsius, rounded to 1 fraction digit
   * @format float
   */
  "atmp"?: number;
  /** The relative humidity in percent */
  "rhum"?: number;
  /** The CO2 value in ppm */
  "rco2"?: number;
  /**
   * The ambient temperature with correction algorithms applied in celsius, rounded to 1 fraction digit
   * @format float
   */
  "atmp_corrected"?: number;
  /** The relative humidity with correction algorithms applied in percent */
  "rhum_corrected"?: number;
  /** The CO2 value with correction algorithms applied in ppm */
  "rco2_corrected"?: number;
}
// so i can reference things i know are going to be numbers
export interface Measure extends Measurement{
  /** The unique id of the location, not present for averages */
  "locationId"?: number;
  /** The name of the location as on the AG dashboard, not present for averages */
  "locationName"?: string;
  /** The type of the location as on the AG dashboard, indoor or outdoor */
  "locationType"?: string;
  /** The serial number of the sensor currently linked to the location, not present for averages */
  "serialno"?: string;
  /** The model identifier of the sensor currently linked to the location such as I-9PSL, O-1PST, .. */
  "model"?: string;
  /**
   * The TVOC value in ppb, provided in case that the sensor delivers an absolute value, rounded to 1 fraction digit
   * @format float
   */
  "tvoc"?: number | null;
  /** The value of the TVOC index, sensor model dependent */
  "tvocIndex"?:  number | null;

  /** The value of the NOx index, sensor model dependent */
  "noxIndex"?: number;
  /**
   * The NO2 value in ppb for model O-M-1PPSTON-CE
   * @format float
   */
  "no2"?: number;
  /**
   * The O3 value in ppb for model O-M-1PPSTON-CE
   * @format float
   */
  "o3"?: number;
  /**
   * The O3 working electrode value in mV for model O-M-1PPSTON-CE
   * @format float
   */
  "o3WorkingElectrode"?: number;
  /**
   * The O3 auxiliary electrode value in mV for model O-M-1PPSTON-CE
   * @format float
   */
  "o3AuxiliaryElectrode"?: number;
  /**
   * The NO2 working electrode value in mV for model O-M-1PPSTON-CE
   * @format float
   */
  "no2WorkingElectrode"?: number;
  /**
   * The NO2 auxiliary electrode value in mV for model O-M-1PPSTON-CE
   * @format float
   */
  "no2AuxiliaryElectrode"?: number;
  /**
   * The analog front end temperature for model O-M-1PPSTON-CE
   * @format float
   */
  "afeTemp"?: number;
  /**
   * The battery voltage in volts, rounded to 2 fraction digits
   * @format float
   */
  "batteryVoltage"?: number| string;
  /**
   * The solar panel voltage in volts, rounded to 2 fraction digits
   * @format float
   */
  "panelVoltage"?: number | string;
  /** The wifi signal strength in dBm */
  "wifi"?: number;
  /** The number of data points, present only for aggregated data */
  "datapoints"?: number;
  /** Timestamp of the measures in ISO 8601 format with UTC offset, e.g. 2022-03-28T12:07:40Z */
  "timestamp"?: string;
  /** The firmware version running on the device, e.g. "9.2.6", not present for averages */
  "firmwareVersion"?: string | null;
  /**
   * The longitude of the location where the measurement was taken (if available)
   * @format float
   */
  "longitude"?: number;
  /**
   * The latitude of the location where the measurement was taken (if available)
   * @format float
   */
  "latitude"?: number; 
  /** Detected anomalies for this raw measure, if available */
  "anomalies"?: "condensation"[];
}

export type GoMeasure = Measure & {
  /**
   * Pressure in hPa if available (extended measure)
   * @format float
   */
  pres?: number;
  /**
   * Latitude from extended measures if available
   * @format float
   */
  lat?: number;
  /**
   * Longitude from extended measures if available
   * @format float
   */
  lng?: number;
  /**
   * Altitude in meters from extended measures if available
   * @format float
   */
  alt?: number;
  /**
   * Speed in m/s from extended measures if available
   * @format float
   */
  speed?: number;
  /**
   * HDOP (Horizontal Dilution of Precision) from extended measures if available
   * @format float
   */
  hdop?: number;
  /** Motion flag/value from extended measures if available */
  motion?: number;
};

export interface RouteMeasure {
  /** @format date-time */
  timestamp?: string;
  pres?: number;
  lat?: number;
  lng?: number;
  alt?: number;
  speed?: number;
  hdop?: number;
  motion?: number;
}

export type MergedMeasure = RouteMeasure & {
  pm01?: number;
  pm02?: number;
  pm10?: number;
  atmp?: number;
  rhum?: number;
  rco2?: number;
  tvoc_index?: number;
  nox_index?: number;
  note?: string;
};

export type Measures = Measure[];

export type GoMeasures = GoMeasure[];

export interface TriggeredAlarm {
  /** The unique id of the alarm */
  id?: number;
  /** The unique id of the location where the alarm was triggered. Set for alarms of type 'location' */
  locationId?: number;
  /** The type of the alarm, the possible values are 'location', 'locationGroup', 'allLocations', 'indoorLocations', 'outdoorLocations' */
  alarmType?: string;
  /** The name of the affected location if set */
  locationName?: string;
  /** Notes regarding the affected location if set */
  locationNotes?: string;
  /** The id of the related group for alarms of type 'locationGroup' */
  locationGroupId?: number;
  /** The name of the related group for alarms of type 'locationGroup' */
  locationGroupName?: string;
  /** The title of the alarm */
  title?: string;
  /** The description of the alarm */
  description?: string;
  /** The measure that triggered the alarm */
  measure?: string;
  /** True if the alarm is related to an indoor location */
  indoor?: boolean;
  /** The list of locations that triggered the alarm in case that the alarm is of a type that supports multiple locations, e.g.  'allLocations', 'indoorLocations', ... */
  locations?: TriggeredAlarmLocationState[];
}

export interface TriggeredAlarmLocationState {
  /** The unique id of the location */
  locationId?: number;
  /** The name of the location */
  locationName?: string;
  /** The state of the alarm */
  state?: "idle" | "armed" | "triggered";
  [key: string]: any;
}

export type TriggeredAlarms = TriggeredAlarm[];

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title AirGradient Sensor API
 * @version v1
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  public = {
    /**
     * No description
     *
     * @name Ping
     * @summary Pings the server
     * @request GET:/public/api/v1/ping
     * @secure
     */
    ping: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/public/api/v1/ping`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name GetCurrentMeasuresOfWorld
     * @summary Gets the current measures of all locations that are made public to the world
     * @request GET:/public/api/v1/world/locations/measures/current
     */
    getCurrentMeasuresOfWorld: (params: RequestParams = {}) =>
      this.request<Measures, void>({
        path: `/public/api/v1/world/locations/measures/current`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name GetCurrentMeasuresOfPublicLocation
     * @summary Gets the current measures of a certain location that is made public to the world
     * @request GET:/public/api/v1/world/locations/{locationId}/measures/current
     */
    getCurrentMeasuresOfPublicLocation: (
      locationId: number,
      params: RequestParams = {},
    ) =>
      this.request<Measure, void>({
        path: `/public/api/v1/world/locations/${locationId}/measures/current`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name GetCurrentMeasures
     * @summary Gets the current measures of a location
     * @request GET:/public/api/v1/locations/{locationId}/measures/current
     * @secure
     */
    getCurrentMeasures: (locationId: number, params: RequestParams = {}) =>
      this.request<GoMeasure, void>({
        path: `/public/api/v1/locations/${locationId}/measures/current`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name GetAllCurrentMeasures
     * @summary Gets all current measures of the place
     * @request GET:/public/api/v1/locations/measures/current
     * @secure
     */
    getAllCurrentMeasures: (params: RequestParams = {}) =>
      this.request<Measures, void>({
        path: `/public/api/v1/locations/measures/current`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name GetTriggeredAlarms
     * @summary Gets all currently triggered alarms of the place
     * @request GET:/public/api/v1/alarms/triggered
     * @secure
     */
    getTriggeredAlarms: (params: RequestParams = {}) =>
      this.request<TriggeredAlarms, void>({
        path: `/public/api/v1/alarms/triggered`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name GetRawMeasures
     * @summary Gets the 200 most recent raw measures of a location or from a certain date range. The records are ordered by date descending
     * @request GET:/public/api/v1/locations/{locationId}/measures/raw
     * @secure
     */
    getRawMeasures: (
      locationId: number,
      query?: {
        /** The date from which measures are requested in ISO 8601 format with UTC offset (basic format, e.g 20240328T120500Z) */
        from?: string;
        /** The date to which measures are requested in ISO 8601 format with UTC offset (basic format, e.g 20240328T230500Z). Must be after parameter from. The from .. to interval is limited to 2 days. */
        to?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GoMeasures, void>({
        path: `/public/api/v1/locations/${locationId}/measures/raw`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name GetPastMeasures
     * @summary Gets past measures of a location in 5 minute buckets or 60 minutes buckets (depending on what is available)
     * @request GET:/public/api/v1/locations/{locationId}/measures/past
     * @secure
     */
    getPastMeasures: (
      locationId: number,
      query: {
        /** The date from which measures are requested in ISO 8601 format with UTC offset (basic format, e.g 20220328T120500Z) */
        from: string;
        /** The date to which measures are requested in ISO 8601 format with UTC offset (basic format, e.g 20220328T230500Z). Must be after parameter from. The from .. to interval is limited to 10 days. */
        to: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Measures, void>({
        path: `/public/api/v1/locations/${locationId}/measures/past`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name GetMeasuresAverage
     * @summary Gets the average values across a set of locations in buckets
     * @request GET:/public/api/v1/locations/{locationIds}/measures/buckets/{bucketSize}
     * @secure
     */
    getMeasuresAverage: (
      locationIds: string,
      bucketSize: number,
      params: RequestParams = {},
    ) =>
      this.request<Measures, void>({
        path: `/public/api/v1/locations/${locationIds}/measures/buckets/${bucketSize}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Returns a merged history of extended and standard measures for the route identified by UUID, sorted by timestamp descending. The route must be shared.
     *
     * @name GetRouteMeasuresByUuid
     * @summary Gets merged measures history for a route by UUID
     * @request GET:/public/api/v1/routes/{uuid}/measures
     */
    getRouteMeasuresByUuid: (uuid: string, params: RequestParams = {}) =>
      this.request<MergedMeasure[], void>({
        path: `/public/api/v1/routes/${uuid}/measures`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Note that the sensor has to be in a 400ppm environment when calibration is performed.
     *
     * @name CalibrateCo2
     * @summary Triggers calibration of the co2 sensor
     * @request POST:/public/api/v1/locations/{locationId}/sensor/co2/calibration
     * @secure
     */
    calibrateCo2: (locationId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/public/api/v1/locations/${locationId}/sensor/co2/calibration`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Note that the sensor has to be in a 400ppm environment when calibration is performed.
     *
     * @name CalibrateCo2BasedOnSerial
     * @summary Triggers calibration of the co2 sensor
     * @request POST:/public/api/v1/sensors/{serialno}/co2/calibration
     * @secure
     */
    calibrateCo2BasedOnSerial: (serialno: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/public/api/v1/sensors/${serialno}/co2/calibration`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name GetLedMode
     * @summary Gets the led mode
     * @request GET:/public/api/v1/locations/{locationId}/sensor/config/leds/mode
     * @secure
     */
    getLedMode: (locationId: number, params: RequestParams = {}) =>
      this.request<LedMode, void>({
        path: `/public/api/v1/locations/${locationId}/sensor/config/leds/mode`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name UpdateLedMode
     * @summary Updates the led mode
     * @request PUT:/public/api/v1/locations/{locationId}/sensor/config/leds/mode
     * @secure
     */
    updateLedMode: (
      locationId: number,
      body: LedMode,
      params: RequestParams = {},
    ) =>
      this.request<LedMode, void>({
        path: `/public/api/v1/locations/${locationId}/sensor/config/leds/mode`,
        method: "PUT",
        body: body,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name GetLedModeBasedOnSerial
     * @summary Gets the led mode
     * @request GET:/public/api/v1/sensors/{serialno}/config/leds/mode
     * @secure
     */
    getLedModeBasedOnSerial: (serialno: string, params: RequestParams = {}) =>
      this.request<LedMode, void>({
        path: `/public/api/v1/sensors/${serialno}/config/leds/mode`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name UpdateLedModeBasedOnSerial
     * @summary Updates the led mode
     * @request PUT:/public/api/v1/sensors/{serialno}/config/leds/mode
     * @secure
     */
    updateLedModeBasedOnSerial: (
      serialno: string,
      body: LedMode,
      params: RequestParams = {},
    ) =>
      this.request<LedMode, void>({
        path: `/public/api/v1/sensors/${serialno}/config/leds/mode`,
        method: "PUT",
        body: body,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name GetPlace
     * @summary Returns information about the authenticated place
     * @request GET:/public/api/v1/place
     * @secure
     */
    getPlace: (params: RequestParams = {}) =>
      this.request<Place, void>({
        path: `/public/api/v1/place`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
