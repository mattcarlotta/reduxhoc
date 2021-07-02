import removeFiles from "@noshot/utils/removeFiles";

(async (): Promise<void> => {
  try {
    const dirs = ["ComponentBranch", ""].map(
      file => `${file ? `${file}/` : ""}/index.d.ts`
    );

    await removeFiles(dirs);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
