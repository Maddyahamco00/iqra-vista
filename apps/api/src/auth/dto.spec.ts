import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { RegisterDto } from "./dto";

describe("RegisterDto Password Validation", () => {
  it("should fail when password is less than 8 characters", async () => {
    const dto = plainToInstance(RegisterDto, {
      email: "test@example.com",
      password: "123",
      name: "Test",
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    const passwordError = errors.find((e) => e.property === "password");
    expect(passwordError).toBeDefined();
    expect(passwordError?.constraints).toHaveProperty("minLength");
  });

  it("should fail when password has no uppercase letter", async () => {
    const dto = plainToInstance(RegisterDto, {
      email: "test@example.com",
      password: "password123",
      name: "Test",
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    const passwordError = errors.find((e) => e.property === "password");
    expect(passwordError).toBeDefined();
    expect(passwordError?.constraints?.matches).toBe(
      "Password must contain at least 1 uppercase letter",
    );
  });

  it("should fail when password has no number", async () => {
    const dto = plainToInstance(RegisterDto, {
      email: "test@example.com",
      password: "PasswordNoNumber",
      name: "Test",
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    const passwordError = errors.find((e) => e.property === "password");
    expect(passwordError).toBeDefined();
    expect(passwordError?.constraints?.matches).toBe(
      "Password must contain at least 1 number",
    );
  });

  it("should pass when password meets all criteria", async () => {
    const dto = plainToInstance(RegisterDto, {
      email: "test@example.com",
      password: "StrongPass123",
      name: "Test",
    });
    const errors = await validate(dto);
    const passwordError = errors.find((e) => e.property === "password");
    expect(passwordError).toBeUndefined();
  });
});
