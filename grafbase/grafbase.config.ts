import { g, auth, config } from "@grafbase/sdk";

// Welcome to Grafbase!
// Define your data models, integrate auth, permission rules, custom resolvers, search, and more with Grafbase.
// Integrate Auth
// https://grafbase.com/docs/auth
//
// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })
//
// Define Data Models
// https://grafbase.com/docs/database

const post = g.model("Post", {
  title: g.string(),
  slug: g.string().unique(),
  content: g.string(),
  likes: g.int().default(0),
  category: g.relation(() => category),
  tags: g.string().optional().list().length({ max: 5 }),
  author: g.relation(() => user),
  comments: g
    .relation(() => comment)
    .optional()
    .list()
    .optional(),
});

const category = g.model("Category", {
  name: g.string(),
  // posts: g.relation(post).optional().list().optional(),
});

const comment = g.model("Comment", {
  message: g.string(),
  post: g.relation(post),
  author: g.relation(() => user),
});

const user = g.model("User", {
  firstName: g.string(),
  lastName: g.string(),
  email: g.email().unique(),
  // posts: g.relation(post).optional().list().optional(),
  // comments: g.relation(comment).optional().list().optional(),

  // Extend models with resolvers
  // https://grafbase.com/docs/edge-gateway/resolvers
  // gravatar: g.url().resolver('user/gravatar')
});

export default config({
  schema: g,
  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [authProvider],
  //   rules: (rules) => {
  //     rules.private()
  //   }
  // }
});
