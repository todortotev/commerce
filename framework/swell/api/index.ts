import type { RequestInit } from '@vercel/fetch'
import type { CommerceAPIConfig } from '@commerce/api'
// import fetchStoreApi from './utils/fetch-store-api'

export interface SwellConfig extends CommerceAPIConfig {
  storeApiUrl: string
  storeApiClientId: string
  storeApiClientKey: string

  storeApiFetch<T>(endpoint: string, options?: RequestInit): Promise<T>
}

const API_URL = process.env.SWELL_API_URL
const API_CLIENT_ID = process.env.SWELL_API_CLIENT_ID
const API_CLIENT_KEY = process.env.SWELL_API_CLIENT_KEY

if (!API_URL) {
  throw new Error(
    `The environment variable SWELL_API_URL is missing and it's required to access your store`
  )
}

if (!API_CLIENT_ID) {
  throw new Error(
    `The environment variable SWELL_API_CLIENT_ID is missing and it's required to access your store`
  )
}

if (!API_CLIENT_KEY) {
  throw new Error(
    `The environment variable SWELL_API_CLIENT_KEY is missing and it's required to access your store`
  )
}

if (!(API_URL && API_CLIENT_ID && API_CLIENT_KEY)) {
  throw new Error(
    `The environment variables SWELL_API_URL, SWELL_API_CLIENT_ID, SWELL_API_CLIENT_KEY have to be set in order to access the REST API of your store`
  )
}

export class Config {
  private config: SwellConfig

  constructor(config: SwellConfig) {
    this.config = {
      ...config,
    }
  }

  getConfig(userConfig: Partial<SwellConfig> = {}) {
    return Object.entries(userConfig).reduce<SwellConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<SwellConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const ONE_DAY = 60 * 60 * 24
const config = new Config({
  storeApiUrl: API_URL,
  storeApiClientId: API_CLIENT_ID,
  storeApiClientKey: API_CLIENT_KEY,
  cartCookie: 'swell_cartId'
  cartCookieMaxAge: ONE_DAY * 30,

})

export function getConfig(userConfig?: Partial<SwellConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<SwellConfig>) {
  return config.setConfig(newConfig)
}
