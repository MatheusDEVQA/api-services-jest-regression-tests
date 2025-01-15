import request, { Response } from 'supertest';
import https from 'https';
import fs from 'fs';

const agent = new https.Agent({
    cert: fs.readFileSync(``),
    key: fs.readFileSync(`folder-raiz/${process.env.NODE_ENV}/certificate.pem`),
    passphrase: ''
})

enum HttpMethod{
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch'
}

const tokenCache: Map<string, { accessToken: string; expirationTime: Date }> = new Map();

async function getToken(clientId: string, scopes?: string, clientSecret?: string): Promise<string> {
    try {
      const path = clientSecret ? '/connect/token' : '/oauth2/token';
      const base_url = clientSecret ? process.env.CERBERUS_BASE_URL! : process.env.AUTH_BASE_URL!;
      const body = clientSecret
        ? {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
          }
        : {
            grant_type: 'client_credentials',
            client_id: clientId,
            scope: scopes,
          };
      const key = `${clientId}:${scopes}`;
      const cachedToken = tokenCache.get(key);
  
      if (cachedToken && cachedToken.expirationTime > new Date()) {
        return cachedToken.accessToken;
      }
  
      const response = await request(base_url)
        .post(path)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(body)
        .agent(agent);
  
      const accessToken = response.body.access_token;
      const expiresIn = response.body.expires_in || 0;
      const expirationTime = new Date(Date.now() + expiresIn * 1000);
  
      tokenCache.set(key, { accessToken, expirationTime });
      return accessToken;
    } catch (error) {
      console.error('Error getting OAuth2 token:', error);
      throw error;
    }
  }

  async function makeRequest(
    clientId: string,
    method: HttpMethod,
    endpoint: string,
    isCore: boolean,
    headers?: Record<string, string>,
    scopes?: string,
    clientSecret?: string,
    body?: JSON,
  ): Promise<Response> {
    const token = await getToken(clientId, scopes, clientSecret);
    const url = isCore ? process.env.CORE_BASE_URL! : process.env.GATEWAY_BASE_URL!;

    let req = request(url)[method](endpoint).agent(agent).set('Authorization', `Bearer ${token}`);

    if(headres) {
        req = req.set(headres);
    };
    if(body) {
        req = req.send(body);
    };

    return req;
};


async function get(
    clientId: string,
    scopes: string,
    endpoint: string,
    headers?: Record<string, string>,
    clientSecret?: string,
    isCore: boolean = false,
  ): Promise<Response> {
    return makeRequest(clientId, HttpMethod.GET, endpoint, isCore, headers, scopes, clientSecret);
  }

  async function post(
    clientId: string,
    scopes: string,
    endpoint: string,
    headers?: Record<string, string>,
    body?: JSON,
    clientSecret?: string,
    isCore: boolean = false,
  ): Promise<Response> {
    return makeRequest(clientId, HttpMethod.POST, endpoint, isCore, headers, scopes, clientSecret, body);
  }

async function put(endpoint:string, headers?: Record<string,string>, body?: JSON) {
    return makeRequest(HttpMethod.GET, endpoint, headers);
};

async function path(endpoint:string, headers?: Record<string,string>, body?: JSON) {
    return makeRequest(HttpMethod.GET, endpoint, headers);
};

export { get, post, put, path };