import { parse } from "tinyduration";
import { StacRenderObject } from "../types";

export function renderConfigToUrlParams(config: StacRenderObject): string {
  const { title, assets, ...params } = config;

  const queryObj: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(params)) {
    if (!value) continue;

    if (Array.isArray(value)) {
      queryObj[key] = value.join(',');
    } else {
      queryObj[key] = `${value}`;
    }
  }

  const searchParams = new URLSearchParams(queryObj);

  if (assets) {
    for (let i = 0, len = assets.length; i < len; i++) {
      searchParams.append('bands', assets[i]);
    }
  }

  return searchParams.toString();
}

export function durationToMs(duration: string): number {
  const { days, hours, minutes, seconds } = parse(duration);
  const interval = 
    (seconds || 0) * 1000 +
    (minutes || 0) * 60 * 1000 + 
    (hours || 0) * 60 * 60 * 1000 + 
    (days || 0) * 24 * 60 * 60 * 1000;
  return interval;
}
