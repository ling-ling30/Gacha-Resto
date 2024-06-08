import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  city: defineTable({
    name: v.string(),
  }).index("by_name", ["name"]),

  restaurant: defineTable({
    name: v.string(),
    price_range_min: v.string(),
    price_range_max: v.string(),
    city: v.id("city"),
    photo: v.id("photos"),
    rating: v.number(),
  }),

  photos: defineTable({
    url: v.string(),
  }),
});
