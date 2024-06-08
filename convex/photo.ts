import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    url: v.string(),
    restaurant_id: v.id("restaurant"),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.insert("photo", {
      url: args.url,
      restaurant: args.restaurant_id,
    });

    return document;
  },
});

export const fetchPhotoByRestaurant = query({
  args: {
    restaurant_id: v.id("restaurant"),
  },
  handler: async (ctx, args) => {
    const photos = await ctx.db
      .query("photo")
      .withIndex("by_restaurant", (q) =>
        q.eq("restaurant", args.restaurant_id!)
      )
      .collect();
    return photos;
  },
});
