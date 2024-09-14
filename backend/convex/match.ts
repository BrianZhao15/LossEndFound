// import { internalMutation } from './_generated/server';
// import { ChromaClient } from 'chromadb';
// import dotenv from 'dotenv';
// import { v } from 'convex/values';

// dotenv.config();

// // Initialize Chroma client
// const chromaClient = new ChromaClient({
//   path: process.env.CHROMA_API_URL, // Should be 'http://localhost:8000'
// });

// // Define the matchItems mutation
// export const matchItems = internalMutation({
//   args: {
//     itemId: v.id('items'), // Ensure itemId is a valid ID from the 'items' table
//     embedding: v.array(v.number()), // Assume embedding is an array of numbers
//   },
//   handler: async ({ db }, { itemId, embedding }) => {
//     // Get the item from the database
//     const item = await db.get(itemId);

//     // Check if the item exists (i.e., it is not null)
//     if (!item) {
//       throw new Error(`Item with id ${itemId} not found.`);
//     }

//     // Determine the opposite type (lost vs found)
//     const oppositeType = item.type === 'lost' ? 'found' : 'lost';

//     // Access the collection
//     const collection = await chromaClient.getOrCreateCollection({
//       name: 'item_embeddings', // The name of the collection
//       metadata: {
//         description: 'Embedding collection for lost and found items',
//       },
//     });

//     // Perform similarity search
//     const queryResult = await collection.query({
//       queryEmbeddings: [embedding],
//       nResults: 5,
//       where: { type: oppositeType },
//     });

//     const matchedIds = queryResult.ids[0]; // Assuming ids are returned as a nested array

//     for (const matchedId of matchedIds) {
//       const matchedUserId = matchedId; // Since we used userId as the embedding ID
//       const matchedItem = await db
//         .query('items')
//         .filter(q => q.eq(q.field('userId'), matchedUserId))
//         .first();

//       if (matchedItem) {
//         // Update matched items
//         await db.patch(itemId, {
//           matchedItemIds: [...item.matchedItemIds, matchedItem._id],
//         });
//         await db.patch(matchedItem._id, {
//           matchedItemIds: [...matchedItem.matchedItemIds, itemId],
//         });

//         // Send notifications
//         await db.insert('notifications', {
//           userId: item.userId,
//           message: `Potential match found for your ${item.type} item.`,
//           timestamp: Date.now(),
//           read: false,
//         });

//         await db.insert('notifications', {
//           userId: matchedItem.userId,
//           message: `Your ${matchedItem.type} item may match with another user's item.`,
//           timestamp: Date.now(),
//           read: false,
//         });
//       }
//     }
//   },
// });
