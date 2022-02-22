import { User, UserStore } from '../user';

const store = new UserStore();

export let testUser: User = {
  id: 1,
  firstname: "Adel",
  lastname: "Malik",
  password: "password",
}

describe("User Model", () => {
  let password_digest: string;

  beforeAll(async () => {
    const result = await store.create(testUser);
    expect(result.firstname).toEqual(testUser.firstname);
    expect(result.lastname).toEqual(testUser.lastname);
    password_digest = result.password_digest as string;
  })

  it('should have an signup method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an signin method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have an show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should authenticate the user created', async () => {
    const result = await store.authenticate(testUser.firstname, testUser.lastname, testUser.password);
    expect(result).not.toBeNull()
  });

  it('should get all users', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  afterAll(async () => {
    const result1 = await store.index();
    const result = await store.show(2);
    expect(result.password_digest).toEqual(password_digest);
  })
});