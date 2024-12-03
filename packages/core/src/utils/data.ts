import { type AxiosInstance } from "axios";
import { components } from "../outropy-env";
import FormData from "form-data";

type UploadOptions = {
  fileName: string;
  fileContents: string;
  mimeType: string;
}

type DownloadDataOptions = {
  urn: string;
}

type GetMetadataOptions = {
  urn: string;
}

type SetMetadataOptions = {
  urn: string;
  metadata: {
    [key: string]: string;
  };
}

/**
 * Upload a text-based file to Outropy.
 *
 * @see {@link https://docs.outropy.ai/api-reference/endpoint/upload-data}
 */
export async function uploadData(
  client: AxiosInstance,
  options: UploadOptions,
) {
  const { fileName, fileContents, mimeType } = options;

  const formData = new FormData();
  formData.append('file', fileContents, fileName);

  const headers = {
    'X-Outropy-Upload-Mime-Type': mimeType,
  };
  const { data } = await client.postForm<components['schemas']['DataResponse']>(
    '/data/upload',
    formData,
      { headers },
  );

  return data;
}

/**
 * Download a data file from Outropy.
 *
 * @see {@link https://docs.outropy.ai/api-reference/endpoint/download-data}
 */
export async function downloadData(
  client: AxiosInstance,
  options: DownloadDataOptions,
) {
  const { data } = await client.get<string>(
    `/data/${options.urn}`,
  );

  return data;
}

/**
 * Get metadata for a data file from Outropy.
 *
 * @see {@link https://docs.outropy.ai/api-reference/endpoint/get-metadata}
 */ 
export async function getMetadata(
  client: AxiosInstance,
  options: GetMetadataOptions,
) {
  const { data } = await client.get<components['schemas']['DataSourceMetadata']>(
    `/data/${options.urn}/metadata`,
  );

  return data;
}

/**
 * Set metadata for a data file in Outropy.
 *
 * @see {@link https://docs.outropy.ai/api-reference/endpoint/set-metadata}
 */
export async function setMetadata(
  client: AxiosInstance,
  options: SetMetadataOptions,
) {
  const { urn, metadata } = options;

  const { data } = await client.post<string>(
    `/data/${urn}/metadata`,
    metadata,
  );

  return data;
}