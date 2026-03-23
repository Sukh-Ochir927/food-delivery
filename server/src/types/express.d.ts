declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        userId: number;
        role: "USER" | "ADMIN" | "MODERATOR" | "GUEST" | "SUPERADMIN";
      };
    }
  }
}
export {};
