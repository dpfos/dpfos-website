/* =========================================================
   DPF OS — VIDEO PRODUCTS
   FUTURE PRODUCT
   ========================================================= */

export const videoProducts = [
  {
    id: "video-training-series",
    name: "DPF Training Video Series",

    type: "video-series",

    status: "planned",

    price: null,
    currency: "USD",

    access: "purchase",

    description:
      "Future DPF training video collections organized around football principles, methodologies and training applications.",
  },

  {
    id: "video-tactical-series",
    name: "DPF Tactical Video Series",

    type: "video-series",

    status: "planned",

    price: null,
    currency: "USD",

    access: "purchase",

    description:
      "Future tactical video resources connected to DPF football concepts and game principles.",
  },
];

export function getVideoProductById(id) {
  return videoProducts.find(
    (video) => video.id === id
  );
}