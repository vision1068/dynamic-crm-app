import 'dotenv/config';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { NtlmClient, NtlmCredentials } from 'axios-ntlm';
import https from 'https';

const CRM_URL = process.env.CRM_URL || '';
const API_BASE = `${CRM_URL}/api/data/v8.0`;

const credentials: NtlmCredentials = {
  username: process.env.CRM_USERNAME || '',
  password: process.env.CRM_PASSWORD || '',
  domain: process.env.CRM_DOMAIN || '',
};

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

let _client: AxiosInstance | null = null;

export function getCrmClient(): AxiosInstance {
  if (!_client) {
    _client = NtlmClient(credentials, {
      baseURL: API_BASE,
      httpsAgent,
      headers: {
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Prefer': 'odata.include-annotations="*"',
      },
    } as AxiosRequestConfig);
  }
  return _client;
}

export async function crmGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const client = getCrmClient();
  const res = await client.get<{ value: T }>(path, { params });
  return res.data.value ?? (res.data as unknown as T);
}

export async function crmPost<T>(path: string, body: unknown): Promise<T> {
  const client = getCrmClient();
  const res = await client.post<T>(path, body);
  return res.data;
}

export async function crmPatch(path: string, body: unknown): Promise<void> {
  const client = getCrmClient();
  await client.patch(path, body);
}

export async function crmDelete(path: string): Promise<void> {
  const client = getCrmClient();
  await client.delete(path);
}
