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

// export const getById = query({
//   args: { documentId: v.id("documents") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     const userId = await identity?.subject;
//     const document = await ctx.db.get(args.documentId);

//     if (!document) {
//       throw new Error("Not Found");
//     }

//     if (document.isPublished && !document.isArchived) {
//       return document;
//     }

//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     if (document.userId !== userId) {
//       throw new Error("Unauthorized");
//     }
//     return document;
//   },
// });

// export const update = mutation({
//   args: {
//     id: v.id("documents"),
//     title: v.optional(v.string()),
//     content: v.optional(v.string()),
//     coverImage: v.optional(v.string()),
//     icon: v.optional(v.string()),
//     isPublished: v.optional(v.boolean()),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }
//     const userId = identity.subject;

//     const { id, ...rest } = args;

//     const existingDocument = await ctx.db.get(id);

//     if (existingDocument?.userId != userId) {
//       throw new Error("Unauthorized");
//     }

//     const document = await ctx.db.patch(id, { ...rest });
//     return document;
//   },
// });

// export const removeIcon = mutation({
//   args: { id: v.id("documents") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }
//     const userId = identity.subject;
//     const { id, ...rest } = args;

//     const existingDocument = await ctx.db.get(args.id);

//     if (!existingDocument) {
//       throw new Error("Document not found");
//     }

//     if (existingDocument.userId !== userId) {
//       throw new Error("Unauthorized");
//     }

//     const document = await ctx.db.patch(args.id, {
//       icon: undefined,
//     });
//     return document;
//   },
// });

// export const removeCoverImage = mutation({
//   args: { id: v.id("documents") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const userId = identity.subject;

//     const existingDocument = await ctx.db.get(args.id);
//     if (!existingDocument) {
//       throw new Error("document not found");
//     }
//     if (existingDocument.userId !== userId) {
//       throw new Error("Unauthorized");
//     }

//     const document = await ctx.db.patch(args.id, {
//       coverImage: undefined,
//     });

//     return document;
//   },
// });
