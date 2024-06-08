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
  }).index("by_city", ["city"]),

  photo: defineTable({
    url: v.string(),
    restaurant: v.id("restaurant"),
  }).index("by_restaurant", ["restaurant"]),

  testimony: defineTable({
    username: v.string(),
    comment: v.string(),
    restaurant_id: v.id("restaurant"),
  }),
});
