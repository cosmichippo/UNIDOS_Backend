// todo: verify cutoffs for stuff based on official source

export interface Dict<T> {
    [key:string]:T;
}
export const THRESHOLDS: Dict<number> = {
"pm01":1,
"pm0":1,
"pm10":1,
"pm02": 1,
"pm01_corrected":1,
"pm02_corrected":1,
"pm10_corrected":1,
"pm003Count":100,
"atmp":45.5,
"rhum":18,
"rco2":422,
"atmp_corrected":45.5,
"rhum_corrected":18,
"rco2_corrected":422,    
}