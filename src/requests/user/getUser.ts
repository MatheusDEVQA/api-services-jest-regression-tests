import { User } from '@jsonObject/userTest/userObject';
import { get } from '../commons/requestBuilder';

const CLIENT = process.env.CLIENT_ID;



interface UserResponse {
    statusCode: number;
    body: User;
}
async function getUser(id:string): Promise<UserResponse> {
    const headers = {
        'authorization': 'Bearer',
        '':''
    }
    const response = await get(`/api/users/${id}`)

    return {
        statusCode: response.status,
        body: response.body as User
    }
}

export { getUser }