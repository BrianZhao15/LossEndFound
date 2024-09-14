// backend/convex/schema.ts
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    email: v.string(),
    username: v.string(),
    passwordHash: v.string(),
    createdAt: v.number(),
  }),
  items: defineTable({
    userId: v.id('users'),
    type: v.string(), // 'lost' or 'found'
    description: v.string(),
    imageUrl: v.string(),
    location: v.string(),
    timestamp: v.number(),
    embeddingId: v.string(), // Reference to Chroma embedding
    matchedItemIds: v.array(v.id('items')),
  }),
  messages: defineTable({
    fromUserId: v.id('users'),
    toUserId: v.id('users'),
    content: v.string(),
    timestamp: v.number(),
  }),
  notifications: defineTable({
    userId: v.id('users'),
    message: v.string(),
    timestamp: v.number(),
    read: v.boolean(),
  }),
});
