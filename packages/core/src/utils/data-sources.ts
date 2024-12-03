import { type AxiosInstance } from "axios";
import { components } from "../outropy-env";


type CreateDataSourceOptions = components['schemas']['CreateDataSourceRequest']
type CreateIndexOptions = components['schemas']['CreateIndexRequest']


type GetDataSourceByNameOptions = {
  name: string;
}

type GetIndexByNameOptions = {
  name: string;
}

type GetDataSourceByUrnOptions = {
  urn: string;
}

/**
 * Create a data source in Outropy.
 *
 * @see {@link https://docs.outropy.ai/api-reference/endpoint/create-data-source}
 */
export async function createDataSource(
  client: AxiosInstance,
  options: CreateDataSourceOptions,
) {
  const { data } = await client.post<components['schemas']['DataSourceResponse']>(
    '/data-sources/create',
    options,
  );

  return data;
}

/**
 * Get a data source by name.
 *
 * @see {@link https://docs.outropy.ai/api-reference/endpoint/get-data-source-by-name}
 */
export async function getDataSourceByName(
  client: AxiosInstance,
  options: GetDataSourceByNameOptions,
) {
  const result = await client.get<components['schemas']['DataSourceResponse'] | null>(
    `/data-sources/by-name/${options.name}`,
  );

  if (result.status === 200) {
    return result.data;
  }

  return null;
}

/**
 * Create an index for a data source.
 *
 * @see {@link https://docs.outropy.ai/api-reference/endpoint/create-index}
 */
export async function createIndex(
  client: AxiosInstance,
  options: CreateIndexOptions,
) {
  const { data } = await client.post<components['schemas']['IndexResponse']>(
    '/data-sources/create-index',
    options,
  );

  return data;
}

/** 
 * Get an index by name.
 *
 * @see {@link https://docs.outropy.ai/api-reference/endpoint/get-index-by-name}
 */
export async function getIndexByName(
  client: AxiosInstance,
  options: GetIndexByNameOptions,
) {
  const result = await client.get<components['schemas']['IndexResponse'] | null>(
    `/data-sources/index-by-name/${options.name}`,
  );

  if (result.status === 200) {
    return result.data;
  }

  return null;
}


/**
 * Get a data source by URN.
 *
 * @see {@link https://docs.outropy.ai/api-reference/endpoint/get-data-source-by-urn}
 */
export async function getDataSourceByUrn(
  client: AxiosInstance,
  options: GetDataSourceByUrnOptions,
) {
  const { data } = await client.get<components['schemas']['DataSourceResponse']>(
    `/data-sources/${options.urn}`,
  );

  return data;
}
