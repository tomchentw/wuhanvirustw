"use strict";

module.exports = {
  /**
   * Set basePath, assetPrefix for GitHub pages.
   */
  basePath: "/wuhanvirustw",
  assetPrefix: "/wuhanvirustw/",
  optimizeFonts: false,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
    };
  },
};
