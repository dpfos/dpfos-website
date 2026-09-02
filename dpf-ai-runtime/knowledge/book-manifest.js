/*
============================================================
DPF OS — CANONICAL BOOK MANIFEST
============================================================

Purpose:
Define the canonical DPF OS knowledge sources.

IMPORTANT:
- Books are the source of truth.
- This file contains metadata only.
- It does NOT contain book content.
- It does NOT duplicate knowledge.
- Full editions remain private.
============================================================
*/

export const dpfBookManifest = [

  {
    id: "constitution",
    title: "The DPF Constitution",
    folder: "constitution",
    authority: "canonical",
    access: "private",
  },

  {
    id: "the-way",
    title: "The Way",
    folder: "the-way",
    authority: "canonical",
    access: "private",
  },

  {
    id: "blueprint",
    title: "The Blueprint",
    folder: "blueprint",
    authority: "canonical",
    access: "private",
  },

  {
    id: "architectural-principles",
    title: "Architectural Principles",
    folder: "architectural-principles",
    authority: "canonical",
    access: "private",
  },

  {
    id: "institutional-framework",
    title: "Institutional Framework",
    folder: "institutional-framework",
    authority: "canonical",
    access: "private",
  },

  {
    id: "game-model",
    title: "The Game Model",
    folder: "game-model",
    authority: "canonical",
    access: "private",
  },

  {
    id: "playbook",
    title: "The Playbook",
    folder: "play-book",
    authority: "canonical",
    access: "private",
  },

  {
    id: "role-atlas",
    title: "Role Atlas",
    folder: "role-atlas",
    authority: "canonical",
    access: "private",
  },

  {
    id: "coaching-manual",
    title: "Coaching Manual",
    folder: "coaching-manual",
    authority: "canonical",
    access: "private",
  },

  {
    id: "academy",
    title: "Academy & Youth Development",
    folder: "academy",
    authority: "canonical",
    access: "private",
  },

  {
    id: "player-development",
    title: "Player Development",
    folder: "player-development",
    authority: "canonical",
    access: "private",
  },

  {
    id: "scouting-manual",
    title: "Scouting Manual",
    folder: "scouting-manual",
    authority: "canonical",
    access: "private",
  },

  {
    id: "individual-skills",
    title: "Individual Skills & Technical Toolkit",
    folder: "individual-skills",
    authority: "canonical",
    access: "private",
  },

  {
    id: "dpf-os",
    title: "DPF OS",
    folder: "dpf-os",
    authority: "canonical",
    access: "private",
  },

];


export function getBookById(id) {
  return dpfBookManifest.find(
    (book) => book.id === id
  );
}