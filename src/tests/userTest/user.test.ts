import { getSingleUser } from './getUser';


jest.retryTimes(3, { logErrorsBeforeRetry: true})

describe('User tests', () => {
    it('Get single user', getSingleUser);
});
