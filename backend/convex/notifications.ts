import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// Fetch unread notifications for a user
export const getNotifications = query({
  args: { userId: v.id('users') },
  handler: async ({ db }, { userId }) => {
    return await db
      .query('notifications')
      .filter(q => q.and(q.eq(q.field('userId'), userId), q.eq(q.field('read'), false)))
      .collect();
  },
});

// Mark a notification as read
export const markAsRead = mutation({
  args: { notificationId: v.id('notifications') },
  handler: async ({ db }, { notificationId }) => {
    await db.patch(notificationId, { read: true });
  },
});
