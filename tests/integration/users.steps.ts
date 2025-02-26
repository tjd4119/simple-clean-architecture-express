import { defineFeature, loadFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../../src/app';
import path from 'path';
import {cleanUpDatabase, closeDatabase} from "./utils/db";
import {insertUser, insertUsers} from "./utils/seed";
const feature = loadFeature(path.join(__dirname, './features/users.feature'));

defineFeature(feature, test => {
  let response: request.Response;
  let payload: { name: string; email?: string };

  beforeAll(() => {
    // wait a second for the database connection
    return new Promise((resolve) => setTimeout(resolve, 1000));
  });

  afterEach(async () => {
    await cleanUpDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });
  test('Create a new user', ({ given, when, then }) => {
    given('I have a valid user payload', () => {
      payload = {
        name: 'John Doe',
        email: 'john.doe@example.com'
      };
    });

    when('I send a POST request to "/users"', async () => {
      response = await request(app)
        .post('/users')
        .send(payload);
    });

    then('the response status should be 201', () => {
      expect(response.status).toEqual(201);
    });

    then('the response should contain the created user', () => {
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toEqual(payload.name);
      expect(response.body.email).toEqual(payload.email);
    });
  });

  test('Get all users', ({ given, when, then }) => {
    const numUsers = 3;
    given('users exist', async () => {
      // Assuming you have a way to seed your database with users
      await insertUsers(numUsers);
    });

    when('I send a GET request to "/users"', async () => {
      response = await request(app).get('/users');
    });

    then('the response status should be 200', () => {
      expect(response.status).toEqual(200);
    });

    then('the response should contain a list of users', () => {
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toEqual(numUsers);
    });
  });

  test('Get a user by ID', ({ given, when, then }) => {
    given('a user with ID "7f3deb50-3bd8-4d26-94b1-59fd0eedabba" exists', async () => {
      await insertUser('7f3deb50-3bd8-4d26-94b1-59fd0eedabba', 'testname', 'testemail@test.com');
    });

    when('I send a GET request to "/users/7f3deb50-3bd8-4d26-94b1-59fd0eedabba"', async () => {
      response = await request(app).get('/users/7f3deb50-3bd8-4d26-94b1-59fd0eedabba');
    });

    then('the response status should be 200', () => {
      expect(response.status).toEqual(200);
    });

    then('the response should contain the user with ID "7f3deb50-3bd8-4d26-94b1-59fd0eedabba"', () => {
      expect(response.body).toHaveProperty('id', '7f3deb50-3bd8-4d26-94b1-59fd0eedabba');
    });
  });

  test('Delete a user', ({ given, when, then }) => {
    given('a user with ID "7f3deb50-3bd8-4d26-94b1-59fd0eedabba" exists', async () => {
      await insertUser('7f3deb50-3bd8-4d26-94b1-59fd0eedabba', 'testname', 'testemail@test.com');
    });

    when('I send a DELETE request to "/users/7f3deb50-3bd8-4d26-94b1-59fd0eedabba"', async () => {
      response = await request(app).delete('/users/7f3deb50-3bd8-4d26-94b1-59fd0eedabba');
    });

    then('the response status should be 204', () => {
      expect(response.status).toEqual(204);
    });

    then('NotFoundError should be returned when I send a GET request to "/users/7f3deb50-3bd8-4d26-94b1-59fd0eedabba"', async () => {
      const newResponse = await request(app).get('/users/7f3deb50-3bd8-4d26-94b1-59fd0eedabba');
      expect(newResponse.status).toEqual(404);
    });
  });

  test('Update a user', ({ given, when, then }) => {
    given('a user with ID "7f3deb50-3bd8-4d26-94b1-59fd0eedabba" exists', async () => {
      await insertUser('7f3deb50-3bd8-4d26-94b1-59fd0eedabba', 'testname', 'testemail@test.com');
    });

    given('I have a valid update payload', () => {
      payload = {
        name: 'New Name',
      };
    });

    when('I send a PUT request to "/users/7f3deb50-3bd8-4d26-94b1-59fd0eedabba"', async () => {
      response = await request(app)
        .put('/users/7f3deb50-3bd8-4d26-94b1-59fd0eedabba')
        .send(payload);
    });

    then('the response status should be 200', () => {
      expect(response.status).toEqual(200);
    });

    then('the response should contain the updated user', () => {
      expect(response.body).toHaveProperty('id', '7f3deb50-3bd8-4d26-94b1-59fd0eedabba');
      expect(response.body.name).toEqual(payload.name);
    });
  });
});
