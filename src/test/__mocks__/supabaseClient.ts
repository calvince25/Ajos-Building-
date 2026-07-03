/**
 * Supabase mock — prevents any real network calls during tests.
 * All Supabase methods return successful empty results by default.
 */
const mockFrom = () => ({
  select: () => mockFrom(),
  insert: () => mockFrom(),
  update: () => mockFrom(),
  delete: () => mockFrom(),
  upsert: () => mockFrom(),
  eq: () => mockFrom(),
  order: () => ({ data: [], error: null }),
  single: () => ({ data: null, error: null }),
});

export const supabase = {
  from: vi.fn(mockFrom),
  auth: {
    getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
    onAuthStateChange: vi.fn().mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    }),
    signInWithPassword: vi.fn().mockResolvedValue({ error: null }),
    signUp: vi.fn().mockResolvedValue({ error: null }),
    signOut: vi.fn().mockResolvedValue({}),
  },
  storage: {
    from: vi.fn(() => ({
      upload: vi.fn().mockResolvedValue({ error: null }),
      getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'https://example.com/file.jpg' } }),
    })),
  },
};
