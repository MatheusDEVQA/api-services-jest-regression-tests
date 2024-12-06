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

async function getToken(){

};

async function makeRequest(method:HttpMethod, endpoint: string, headres?: Record<string, string>, body?:JSON) : Promise<Response>{
    const token = await getToken();
    let req = request(process.env.BASE_URL!)[method](endpoint).agent(agent).set('Authorization', `Bearer ${token}`);
    if(headres) {
        req = req.set(headres);
    };
    if(body) {
        req = req.send(body);
    };

    return req;
};


async function get(endpoint:string, headers?: Record<string,string>, body?: JSON) {
    return makeRequest(HttpMethod.GET, endpoint, headers);
};

async function post(endpoint:string, headers?: Record<string,string>, body?: JSON) {
    return makeRequest(HttpMethod.GET, endpoint, headers);
};

async function put(endpoint:string, headers?: Record<string,string>, body?: JSON) {
    return makeRequest(HttpMethod.GET, endpoint, headers);
};

async function path(endpoint:string, headers?: Record<string,string>, body?: JSON) {
    return makeRequest(HttpMethod.GET, endpoint, headers);
};

export { get, post, put, path };