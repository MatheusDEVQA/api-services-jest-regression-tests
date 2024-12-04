import { getUser } from '../../requests/user/getUser'

export function getSingleUser() {
    test('should get single user with successfully', async () => {
        const expectedResponse = [];

        const response = await getUser('2');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    })
}