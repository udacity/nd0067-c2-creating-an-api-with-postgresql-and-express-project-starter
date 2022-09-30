import { User, UserModel } from "../../models/userModel";

describe("Suite for user model:", (): void => {
  const newUser = {
    firstname: "ahmed",
    lastname: "hisham",
    hash: "passwordHash",
  };
  const { firstname, lastname } = newUser;

  it("test user model methods: ", async (): Promise<void> => {
    //test for create method
    const createResult = await new UserModel().create(newUser);
    //index method
    const indexResult = await new UserModel().index();
    //show method
    const showResult = await new UserModel().show(
      (createResult as User).id!.toString()
    );
    expect(createResult).toEqual(
      jasmine.objectContaining({ firstname, lastname })
    );
    expect((indexResult as User[])[0]).toEqual(
      jasmine.objectContaining({ firstname, lastname })
    );
    expect(showResult).toEqual(
      jasmine.objectContaining({ firstname, lastname })
    );
  });
});
