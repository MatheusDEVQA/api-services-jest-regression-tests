import request, { Reponse } from 'supertest';
import https from 'https';

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
    let req = request(process.env.BASE_URL)[method](endpoint).agent(agent).set('Authorization', `Bearer ${token}`);
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
}