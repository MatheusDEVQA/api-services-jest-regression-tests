import { get } from '../commons/requestBuilder'

const CLIENT = process.env.CLIENT_ID;

interface User {
    name: string
    age: number
    address: string
}
async function getUser(id:string): Promise<User> {
    const headers = {
        'authorization': 'Bearer',
        '':''
    }
    const response = await get()

    return {
        statusCode: response.status,
        body: response.body as string[]
    }
}

export { getUser }