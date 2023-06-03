export interface ICharacterDataWrapper  {
  code?: number
  status?: string
  copyright?: string
  attributionText?: string
  attributionHTML?: string
  etag?: string
  data?: ICharacterDataContainer
}

export interface ICharacterDataContainer {
  offset?: number
  limit?: number
  total?: number
  count?: number
  results?: ICharacter[]
}

export interface ICharacter  {
  id?: number
  name?: string
  description?: string
  modified?: string
  thumbnail?: IThumbnail
  resourceURI?: string
  comics?: IComicsList
  series?: ISeriesList
  stories?: IStoryList
  events?: IEventList
  urls?: Url[]
}

export interface IThumbnail {
  path?: string
  extension?: string
}

export interface IComicsList {
  available?: number
  collectionURI?: string
  items?: IComicSummary[]
  returned?: number
}

export interface IComicSummary {
  resourceURI?: string
  name?: string
}

export interface ISeriesList {
  available?: number
  collectionURI?: string
  items?: ISeriesSummary[]
  returned?: number
}

export interface ISeriesSummary {
  resourceURI?: string
  name?: string
}

export interface IStoryList {
  available?: number
  collectionURI?: string
  items?: IStorySummary[]
  returned?: number
}

export interface IStorySummary {
  resourceURI?: string
  name?: string
  type?: string
}

export interface IEventList {
  available?: number
  collectionURI?: string
  items?: IEventSummary[]
  returned?: number
}

export interface IEventSummary {
  resourceURI?: string
  name?: string
}

export interface Url {
  type?: string
  url?: string
}