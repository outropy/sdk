import { type AxiosInstance } from "axios";
import { components } from "../outropy-env";

type UploadOptions = components['schemas']['Body_upload_data_api_data_upload_post'] & {
  mimeType: string,
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
  const { file, mimeType } = options;

  const headers = {
    'X-Outropy-Upload-Mime-Type': mimeType,
  };

  const { data } = await client.post<components['schemas']['DataResponse']>(
    '/data/upload',
    { file },
    { headers },
  );

  return data;
}
