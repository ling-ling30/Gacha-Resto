import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const create = mutation({
  args: {
    name: v.string(),
    price_range_min: v.string(),
    price_range_max: v.string(),
    city: v.id("city"),
  },
  handler: async (ctx, args) => {
    const restaurant = await ctx.db.insert("restaurant", {
      name: args.name,
      price_range_min: args.price_range_min,
      price_range_max: args.price_range_max,
      city: args.city,
    });

    return restaurant;
  },
});

export const getAll = query({
  handler: async (ctx) => {
    const restaurants = await ctx.db.query("restaurant").order("asc").collect();

    return restaurants;
  },
});

export const fetchRandomRestaurantByCity = query({
  args: {
    city_id: v.id("city"),
  },
  handler: async (ctx, args) => {
    const restaurants = await ctx.db
      .query("restaurant")
      .withIndex("by_city", (q) => q.eq("city", args.city_id))
      .collect();
    if (restaurants.length === 0) {
      return null; // No restaurants found for the given city_id
    }

    return restaurants[randomIndex];
  },
});

export const fetchAllRestaurantByCity = query({
  args: {
    city_id: v.optional(v.id("city")),
  },
  handler: async (ctx, args) => {
    if (args.city_id) {
      const restaurants = await ctx.db
        .query("restaurant")
        .withIndex("by_city", (q) => q.eq("city", args.city_id!))
        .collect();
      return restaurants;
    } else {
      const restaurants = await ctx.db.query("restaurant").collect();
      return restaurants;
    }
  },
});
