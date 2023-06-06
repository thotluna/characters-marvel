export interface IDataWrapper<T>  {
  code?: number
  status?: string
  copyright?: string
  attributionText?: string
  attributionHTML?: string
  etag?: string
  data?: IDataContainer<T>
}

export interface IDataContainer<T> {
  offset?: number
  limit?: number
  total?: number
  count?: number
  results?: T[]
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

export interface IComic {
  id:                 number
  digitalId?:          number
  title?:              string
  issueNumber?:        number
  variantDescription?: string
  description?:        string
  modified?:           string
  isbn?:               string
  upc?:                string
  diamondCode?:        string
  ean?:                string
  issn?:               string
  format?:             string
  pageCount?:          number
  textObjects?:        ITextObject[]
  resourceURI?:        string
  urls?:               URL[]
  series?:             ISeriesSummary
  variants?:           IComicSummary[]
  collections?:        IComicSummary[]
  collectedIssues?:    IComicSummary[]
  dates?:              IComicDate[]
  prices?:             IComicPrice[]
  thumbnail?:          IThumbnail
  images?:             IThumbnail[]
  creators?:           ICreatorList
  characters?:         ICharacterList
  stories?:            IStoryList
  events?:             IEventList
}

export interface ITextObject {
  type?:     string
  language?: string
  text?:     string
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

export interface IComicDate {
  type?: string
  date?: string
}

export interface IComicPrice {
  type?: string
  price?: number
 }

 export interface ICreatorList {
  available?:     number
  collectionURI?: string
  items:         ICreatorsSummary[]
  returned?:      number
}

export interface ICreatorsSummary {
  resourceURI?: string
  name?:        string
  role?:        string
}

export interface ICharacterList {
  available?:     number
  collectionURI?: string
  items?:         ICharacterSummary[]
  returned?:      number
}

export interface ICharacterList {
  resourceURI?: string
  name?: string
  role?: string
}

export interface IStoriesList {
  available?:     number
  collectionURI?: string
  items?:         IStoriesSummary[]
  returned?:      number
}

export interface IStoriesSummary {
  resourceURI?: string
  name?:        string
  type?:        string
}

export interface IEventList {
  available?:     number
  collectionURI?: string
  items?:         IEventSummary[]
  returned?:      number
}

export interface IEventSummary {
  resourceURI?: string
  name?:        string
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