import jwt from "jsonwebtoken";

export function withAuth(handler) {
  return async (context) => {
    const { req } = context;
    const token = req.cookies?.token;

    if (!token) return { redirect: { destination: "/", permanent: false } };

    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return handler(context);
    } catch {
      return { redirect: { destination: "", permanent: false } };
    }
  };
}
