import { userObject } from '@jsonObject/userTest/userObject';
import { get } from '@requests/commons/requestBuilder';

const CLIENT = process.env.CLIENT_ID;

interface UserResponse {
    statusCode: number;
    body: userObject;
}
async function getUser(id:string): Promise<UserResponse> {
    const headers = {
        'authorization': 'Bearer',
        '':''
    }
    const response = await get(`/api/users/${id}`)

    return {
        statusCode: response.status,
        body: response.body as userObject
    }
}

export { getUser }