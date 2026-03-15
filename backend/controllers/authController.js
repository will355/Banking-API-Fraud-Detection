import { registerSchema, loginSchema } from "../utils/validate.js";
import { registerUser, loginUser } from "../services/authService.js";

export async function register(req, res) {
  const parse = registerSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid input", errors: parse.error.errors });
  }

  const result = await registerUser(parse.data);
  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  return res.status(201).json({
    token: result.token,
    user: {
      id: result.user.id,
      email: result.user.email,
      fullName: result.user.fullName,
      account: result.user.account
    }
  });
}

export async function login(req, res) {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid input", errors: parse.error.errors });
  }

  const result = await loginUser(parse.data);
  if (result.error) {
    return res.status(401).json({ message: result.error });
  }

  return res.status(200).json({
    token: result.token,
    user: {
      id: result.user.id,
      email: result.user.email,
      fullName: result.user.fullName,
      account: result.user.account,
      role: result.user.role
    }
  });
}
