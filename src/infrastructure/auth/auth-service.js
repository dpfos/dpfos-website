import { supabase } from "../../lib/supabase.js";

export const authService = {
  async signUp({ email, password } = {}) {
    return supabase.auth.signUp({
      email,
      password,
    });
  },

  async signIn({ email, password } = {}) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  async signInWithOAuth(provider, { redirectTo } = {}) {
    return supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    });
  },

  async sendPasswordReset(email, { redirectTo } = {}) {
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
  },

  async updatePassword(password) {
    return supabase.auth.updateUser({
      password,
    });
  },

  async signOut() {
    return supabase.auth.signOut();
  },

  async getSession() {
    return supabase.auth.getSession();
  },

  async getUser() {
    return supabase.auth.getUser();
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  },
};

export default authService;
