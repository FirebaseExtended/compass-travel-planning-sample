import { ConnectorConfig, DataConnect, getDataConnect, QueryRef, MutationRef, QueryPromise, MutationPromise } from 'firebase/data-connect';
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;


export interface Activity_Key {
  ref: string;
  destinationRef: string;
  __typename?: 'Activity_Key';
}

export interface CreateActivityResponse {
  activity_insert: Activity_Key;
}

export interface CreateActivityVariables {
  ref: string;
  destinationRef: string;
  name: string;
  description: string;
  locationName: string;
  timeOfDay: string;
  price: number;
  familyFriendly: boolean;
  duration: number;
  imageUrl: string;
  embedding:  {
    
  };
  
  place: Place_Key;
}

export interface CreatePlaceResponse {
  place_insert: Place_Key;
}

export interface CreatePlaceVariables {
  ref: string;
  name: string;
  country: string;
  continent: string;
  knownFor: string;
  tags?: (string | null)[];
  imageUrl: string;
  embedding:  {
    
  };
  
}

export interface GetActivitiesForPlaceResponse {
  activities:  ({
    
  ref: string;
  destinationRef: string;
  name: string;
  description: string;
  locationName: string;
  timeOfDay: string;
  price: number;
  familyFriendly: boolean;
  duration: number;
  imageUrl: string;
  } & Activity_Key)[];
  
}

export interface GetActivitiesForPlaceVariables {
  placeId: string;
}

export interface GetNearestPlaceResponse {
  places_embedding_similarity:  ({
    
  ref: string;
  name: string;
  country: string;
  continent: string;
  knownFor: string;
  tags: string[];
  imageUrl: string;
  } & Place_Key)[];
  
}

export interface GetNearestPlaceVariables {
  placeDescription: string;
}

export interface ListActivitiesResponse {
  activities:  ({
    
  ref: string;
  destinationRef: string;
  name: string;
  description: string;
  locationName: string;
  timeOfDay: string;
  price: number;
  familyFriendly: boolean;
  duration: number;
  imageUrl: string;
  } & Activity_Key)[];
  
}

export interface ListPlacesResponse {
  places:  ({
    
  ref: string;
  name: string;
  country: string;
  continent: string;
  knownFor: string;
  tags: string[];
  imageUrl: string;
  } & Place_Key)[];
  
}

export interface Place_Key {
  ref: string;
  __typename?: 'Place_Key';
}



/* Allow users to create refs without passing in DataConnect */
export function createActivityRef(vars: CreateActivityVariables): MutationRef<CreateActivityResponse, CreateActivityVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createActivityRef(dc: DataConnect, vars: CreateActivityVariables): MutationRef<CreateActivityResponse,CreateActivityVariables>;

export function createActivity(vars: CreateActivityVariables): MutationPromise<CreateActivityResponse, CreateActivityVariables>;
export function createActivity(dc: DataConnect, vars: CreateActivityVariables): MutationPromise<CreateActivityResponse,CreateActivityVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createPlaceRef(vars: CreatePlaceVariables): MutationRef<CreatePlaceResponse, CreatePlaceVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createPlaceRef(dc: DataConnect, vars: CreatePlaceVariables): MutationRef<CreatePlaceResponse,CreatePlaceVariables>;

export function createPlace(vars: CreatePlaceVariables): MutationPromise<CreatePlaceResponse, CreatePlaceVariables>;
export function createPlace(dc: DataConnect, vars: CreatePlaceVariables): MutationPromise<CreatePlaceResponse,CreatePlaceVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getNearestPlaceRef(vars: GetNearestPlaceVariables): QueryRef<GetNearestPlaceResponse, GetNearestPlaceVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getNearestPlaceRef(dc: DataConnect, vars: GetNearestPlaceVariables): QueryRef<GetNearestPlaceResponse,GetNearestPlaceVariables>;

export function getNearestPlace(vars: GetNearestPlaceVariables): QueryPromise<GetNearestPlaceResponse, GetNearestPlaceVariables>;
export function getNearestPlace(dc: DataConnect, vars: GetNearestPlaceVariables): QueryPromise<GetNearestPlaceResponse,GetNearestPlaceVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getActivitiesForPlaceRef(vars: GetActivitiesForPlaceVariables): QueryRef<GetActivitiesForPlaceResponse, GetActivitiesForPlaceVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getActivitiesForPlaceRef(dc: DataConnect, vars: GetActivitiesForPlaceVariables): QueryRef<GetActivitiesForPlaceResponse,GetActivitiesForPlaceVariables>;

export function getActivitiesForPlace(vars: GetActivitiesForPlaceVariables): QueryPromise<GetActivitiesForPlaceResponse, GetActivitiesForPlaceVariables>;
export function getActivitiesForPlace(dc: DataConnect, vars: GetActivitiesForPlaceVariables): QueryPromise<GetActivitiesForPlaceResponse,GetActivitiesForPlaceVariables>;


/* Allow users to create refs without passing in DataConnect */
export function listActivitiesRef(): QueryRef<ListActivitiesResponse, undefined>;/* Allow users to pass in custom DataConnect instances */
export function listActivitiesRef(dc: DataConnect): QueryRef<ListActivitiesResponse,undefined>;

export function listActivities(): QueryPromise<ListActivitiesResponse, undefined>;
export function listActivities(dc: DataConnect): QueryPromise<ListActivitiesResponse,undefined>;


/* Allow users to create refs without passing in DataConnect */
export function listPlacesRef(): QueryRef<ListPlacesResponse, undefined>;/* Allow users to pass in custom DataConnect instances */
export function listPlacesRef(dc: DataConnect): QueryRef<ListPlacesResponse,undefined>;

export function listPlaces(): QueryPromise<ListPlacesResponse, undefined>;
export function listPlaces(dc: DataConnect): QueryPromise<ListPlacesResponse,undefined>;


