import { defineFeature, loadFeature } from 'jest-cucumber';
import { InvitationStatus } from '../../src/domain/entities/Invitation';
import {insertGroup, insertUser, insertInvitation} from "./utils/seed";
import path from "path";
import app from '../../src/app';
import request from "supertest";
import {cleanUpDatabase, closeDatabase} from "./utils/db";
import {getGroupMembers, getInvitation, getUserInvitations} from "./utils/helper";

const feature = loadFeature(path.join(__dirname, './features/invitations.feature'));

defineFeature(feature, test => {
  let response: request.Response;
  const userId = "7f3deb50-3bd8-4d26-94b1-59fd0eedabba";
  const groupId = 1;

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

  test('Accept a pending invitation', ({ given, when, then }) => {
    given('an invitation with ID "1" exists and is pending', async () => {

      await insertUser(userId, "test user", "test@test.com");
      await insertGroup(groupId, "test group", "test description");
      await insertInvitation(1, InvitationStatus.PENDING, userId, groupId);
    });

    when('I accept the invitation with ID "1"', async () => {
      response = await request(app)
        .post(`/invitations/1/accept`)
        .send();
    });

    then('the response status should be 200', () => {
      expect(response.status).toEqual(200);
    });

    then('the invitation status should be "accepted"', async () => {
      const invitation = await getInvitation(1);
      expect(invitation).not.toBeNull();
      expect(invitation?.status).toEqual(InvitationStatus.ACCEPTED);
    });

    then("the invitation accepted_at should not be null", async () => {
      const invitation = await getInvitation(1);
      expect(invitation).not.toBeNull();
      expect(invitation?.acceptedAt).not.toBeNull();
    });

    then('a new member should be created for the group', async () => {
      const members = await getGroupMembers(groupId);
      expect(members).toHaveLength(1);
      expect(members[0].group.id).toEqual(groupId);
      expect(members[0].user.id).toEqual(userId);
    });
  });

  test('Accept a non-pending invitation', ({ given, when, then }) => {
    given('an invitation with ID "1" exists and is not pending', async () => {

      await insertUser(userId, "test user", "test@test.com");
      await insertGroup(groupId, "test group", "test description");
      await insertInvitation(1, InvitationStatus.ACCEPTED, userId, groupId);
    });

    when('I accept the invitation with ID "1"', async () => {
      response = await request(app)
        .post(`/invitations/1/accept`)
        .send();
    });

    then('the response status should be 412', () => {
      expect(response.status).toEqual(412);
    });
  });

  test('Reject a pending invitation', ({ given, when, then }) => {
    given('an invitation with ID "1" exists and is pending', async () => {

      await insertUser(userId, "test user", "test@test.com");
      await insertGroup(groupId, "test group", "test description");
      await insertInvitation(1, InvitationStatus.PENDING, userId, groupId);
    });

    when('I reject the invitation with ID "1"', async () => {
      response = await request(app)
        .post(`/invitations/1/reject`)
        .send();
    });

    then('the response status should be 200', () => {
      expect(response.status).toEqual(200);
    });

    then('the invitation status should be "rejected"', async () => {
      const invitation = await getInvitation(1);
      expect(invitation).not.toBeNull();
      expect(invitation?.status).toEqual(InvitationStatus.REJECTED);
    });
  });

  test('Invite a user to a group', ({ given, when, then }) => {
    given('a user with ID "7f3deb50-3bd8-4d26-94b1-59fd0eedabba" exists', async () => {
      await insertUser(userId, "test user", "test@test.com");
    });

    given('a group with ID "1" exists', async () => {
      await insertGroup(groupId, "test group", "test description");
    });

    when('I invite the user with ID "7f3deb50-3bd8-4d26-94b1-59fd0eedabba" to the group with ID "1"', async () => {
      response = await request(app)
        .post(`/groups/${groupId}/invite`)
        .send({ userId });
    });

    then('the response status should be 200', () => {
      expect(response.status).toEqual(200);
    });

    then('a new invitation should be created for the user', async () => {
      const invitations = await getUserInvitations(userId);
      expect(invitations).toHaveLength(1);
      expect(invitations[0].group.id).toEqual(groupId);
      expect(invitations[0].user.id).toEqual(userId);
    });
  });
});
