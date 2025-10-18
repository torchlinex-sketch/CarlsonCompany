// Base44Client.js (Example of a Stubbable Client File)
// The original code probably looked like: import { createClient } from '@base44/sdk'; 

// Replace ALL client creation logic with this mock client:
const mockClient = {
  // Add all the methods your front-end calls (even if they just do nothing)
  entities: { 
    Product: { list: async () => ({ data: [] }) },
    User: { get: async () => ({ data: { id: 1, name: 'Mock User' } }) },
  },
  integrations: {
    Core: { SendEmail: async () => {} },
  },
  // Add other methods that crash your app
  someMethodThatCrashes: () => {
    console.warn("Base44 Stub: someMethodThatCrashes was called.");
    return null;
  }
};

export const createClient = () => mockClient;
export default mockClient;
