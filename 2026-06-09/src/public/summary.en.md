Vite processes requests between a project's files and the browser, transforming modules as they are requested and bundling the application for production. This talk uses images and other non-JavaScript imports to show why the browser receives JavaScript instead of the original source format.

It then introduces the three main plugin hooks, `resolveId`, `load`, and `transform`, and shows how multiple plugins pass module data through the pipeline. The final section explains virtual modules and how a plugin can generate code that does not exist on disk.
