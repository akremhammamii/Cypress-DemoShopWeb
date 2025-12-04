// cypress/fixtures/data/builders/user.builder.ts
import { faker } from "@faker-js/faker";

export function buildUser(
  overrides: Partial<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }> = {},
) {
  return {
    firstName: overrides.firstName ?? faker.person.firstName(),
    lastName: overrides.lastName ?? faker.person.lastName(),
    email: overrides.email ?? faker.internet.email(),
    password: overrides.password ?? "P@ssw0rd123!",
    ...overrides,
  };
}
