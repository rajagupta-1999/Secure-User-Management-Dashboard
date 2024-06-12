import { login, register } from './authService';

describe('Authentication Service', () => {
  test('login should return a token when successful', async () => {
    const response = await login({ email: 'eve.holt@reqres.in', password: 'cityslicka' });
    expect(response.token).toBeDefined();
  });

  test('login should throw an error when credentials are incorrect', async () => {
    await expect(login({ email: 'test@gmail.com', password: 'invalid' })).rejects.toThrowError();
  });

  test('register should return a token when successful', async () => {
    const response = await register({ email: 'eve.holt@reqres.in', password: 'pistol' });
    expect(response.token).toBeDefined();
  });

  test('register should throw an error when email is already in use', async () => {
    await expect(register({ email: 'abc@gmail.com', password: 'password' })).rejects.toThrowError();
  });
});
