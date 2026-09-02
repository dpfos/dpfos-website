# DPF OS Workspace Architecture

## Current Scope

This folder contains the initial Premium Workspace and Club OS architecture.

### Premium

- `/premium`
- `/premium/library`
- `/premium/books`
- `/premium/resources`
- `/premium/workspace`

### Club OS

- `/club`
- `/club/club-01`
- `/club/club-02`
- `/club/club-03`

Each demo club is an isolated demo environment using the same DPF OS application core.

## Important

The Search Engine is intentionally NOT modified by this architecture.

Search files such as:

- searchIndex.js
- knowledgeIndex.js
- searchGlossary.js
- dpfMasterKnowledgeRegistry.js

remain untouched.

## Next Architecture Layers

1. Authentication
2. Subscription / Entitlement
3. Club tenancy
4. Role-based permissions
5. Real database
6. Club-specific data
7. Performance Labs
8. Knowledge integration
9. Search integration
