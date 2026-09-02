/*
============================================================
DPF OS — LOCAL REPOSITORY
============================================================

Purpose
------------------------------------------------------------
Generic repository implementation backed by the canonical
local store.

Architecture
------------------------------------------------------------
Domain
   ↓
Repository Contract
   ↓
Local Repository
   ↓
Local Store
   ↓
IndexedDB

Principles
------------------------------------------------------------
- Generic
- Offline-first
- No UI dependencies
- No authentication
- No authorization
- No domain-specific duplication
- Uses the canonical Local Store contract
- Storage keys are internal implementation details
- Domain entities never expose storage prefixes
============================================================
*/

import {
  isLocalStoreContract,
} from "../contracts/local-store.js";

import {
  isRepositoryContract,
} from "../contracts/repository.js";


/*
============================================================
FACTORY
============================================================
*/

export function createLocalRepository({
  store,
  prefix = "",
} = {}) {
  if (!isLocalStoreContract(store)) {
    throw new Error(
      "A valid Local Store contract is required."
    );
  }


  /*
  ==========================================================
  STORAGE → DOMAIN
  ==========================================================
  */

  const toDomainEntity = (record) => {
    if (!record || !prefix) {
      return record;
    }

    const prefixValue = `${prefix}:`;

    if (
      typeof record.id !== "string" ||
      !record.id.startsWith(prefixValue)
    ) {
      return record;
    }

    return {
      ...record,
      id: record.id.slice(prefixValue.length),
    };
  };


  /*
  ==========================================================
  DOMAIN → STORAGE
  ==========================================================
  */

  const toStorageRecord = (entity) => {
    if (!entity || !prefix) {
      return entity;
    }

    return {
      ...entity,
      id: `${prefix}:${entity.id}`,
    };
  };


  /*
  ==========================================================
  OPERATIONS
  ==========================================================
  */

  const operations = {

    /*
    --------------------------------------------------------
    GET BY ID
    --------------------------------------------------------
    */

    async getById(id) {
      if (!id) {
        return null;
      }

      const key =
        prefix
          ? `${prefix}:${id}`
          : id;

      const record =
        await store.get(key);

      return toDomainEntity(record);
    },


    /*
    --------------------------------------------------------
    LIST
    --------------------------------------------------------
    */

    async list() {
      const records =
        await store.list();

      if (!prefix) {
        return records;
      }

      const prefixValue =
        `${prefix}:`;

      return records
        .filter(
          (record) =>
            typeof record?.id === "string" &&
            record.id.startsWith(
              prefixValue
            )
        )
        .map(toDomainEntity);
    },


    /*
    --------------------------------------------------------
    CREATE
    --------------------------------------------------------
    */

    async create(entity) {
      if (
        !entity ||
        typeof entity !== "object"
      ) {
        throw new Error(
          "Repository entity must be an object."
        );
      }

      if (!entity.id) {
        throw new Error(
          "Repository entity requires an id."
        );
      }

      const existing =
        await this.getById(entity.id);

      if (existing) {
        throw new Error(
          `Entity "${entity.id}" already exists.`
        );
      }

      const record =
        toStorageRecord(entity);

      await store.put(record);

      return entity;
    },


    /*
    --------------------------------------------------------
    UPDATE
    --------------------------------------------------------
    */

    async update(entity) {
      if (
        !entity ||
        typeof entity !== "object"
      ) {
        throw new Error(
          "Repository entity must be an object."
        );
      }

      if (!entity.id) {
        throw new Error(
          "Repository entity requires an id."
        );
      }

      const existing =
        await this.getById(entity.id);

      if (!existing) {
        throw new Error(
          `Entity "${entity.id}" does not exist.`
        );
      }

      const record =
        toStorageRecord(entity);

      await store.put(record);

      return entity;
    },


    /*
    --------------------------------------------------------
    REMOVE
    --------------------------------------------------------
    */

    async remove(id) {
      if (!id) {
        return false;
      }

      const key =
        prefix
          ? `${prefix}:${id}`
          : id;

      return store.remove(key);
    },


    /*
    --------------------------------------------------------
    UPSERT
    --------------------------------------------------------
    */

    async upsert(entity) {
      if (
        !entity ||
        typeof entity !== "object"
      ) {
        throw new Error(
          "Repository entity must be an object."
        );
      }

      if (!entity.id) {
        throw new Error(
          "Repository entity requires an id."
        );
      }

      const record =
        toStorageRecord(entity);

      await store.put(record);

      return entity;
    },
  };


  /*
  ==========================================================
  CONTRACT VALIDATION
  ==========================================================
  */

  if (!isRepositoryContract(operations)) {
    throw new Error(
      "Local repository does not satisfy the Repository contract."
    );
  }


  /*
  ==========================================================
  PUBLIC REPOSITORY
  ==========================================================
  */

  return Object.freeze(
    operations
  );
}


/*
============================================================
DEFAULT EXPORT
============================================================
*/

export default createLocalRepository;