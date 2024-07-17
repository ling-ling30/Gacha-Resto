import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.insert("city", {
      name: args.name,
    });

    return document;
  },
});

export const getAll = query({
  handler: async (ctx) => {
    const cities = await ctx.db
      .query("city")
      .withIndex("by_name")
      .order("asc")
      .collect();

    return cities;
  },
});
