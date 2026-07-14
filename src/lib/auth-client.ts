import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

// Singleton Client Instance
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || process.env.BETTER_AUTH_URL,
  plugins: [jwtClient()],
});

// Destructure methods from the exact same instance to avoid duplicate instance bug
export const { signIn, signUp, signOut, useSession, getSession } = authClient;
