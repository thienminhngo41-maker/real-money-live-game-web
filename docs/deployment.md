# Deployment

The project is deployed through Netlify connected to GitHub.

## Current workflow

Netlify Build status is intentionally **Stopped** during active development. GitHub commits therefore should not automatically publish to the production site.

When a version is ready, use a manual Netlify deployment.

## Build configuration

- Base directory: `/`
- Build command: `npm run build`
- Publish directory: `.`
- Functions directory: `netlify/functions`

Keep production deployment separate from development commits.
