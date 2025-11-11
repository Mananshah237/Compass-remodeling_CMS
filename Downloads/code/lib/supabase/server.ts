export async function createClient() {
  // Return a minimal stub - actual data fetching should use rest-api.ts functions
  return {
    from: (table: string) => ({
      select: () => ({
        order: () => ({
          ascending: () => Promise.resolve({ data: [] }),
        }),
        eq: () => Promise.resolve({ data: [] }),
        single: () => Promise.resolve({ data: null }),
      }),
    }),
    auth: {
      getUser: async () => {
        return { data: { user: null }, error: new Error("Use client-side auth") }
      },
    },
  }
}
