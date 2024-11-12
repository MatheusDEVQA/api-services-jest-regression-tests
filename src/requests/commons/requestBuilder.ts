import request, { Reponse } from 'supertest';

enum HttpMethod{
    GET = 'get',
    POST = 'post'
}

async function makeRequest(method:HttpMethod, endpoint: string, headres?: Record<string, string>, body?:JSON) {
    
}