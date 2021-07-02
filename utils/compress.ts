import compressFiles from "@noshot/utils/compressFiles";

(async (): Promise<void> => {
  try {
    const dirs = ["ComponentBranch", ""].map(
      file => `${file ? `${file}/` : ""}/index.js`
    );

    await compressFiles(dirs);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
