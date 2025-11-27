import { fileURLToPath } from "url";
import Generator from "yeoman-generator";
import path from "path";

interface Answers {
    appPackage: string;
    appName: string;
    generateUI: boolean
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

export default class RootGenerator extends Generator {
    answers!: Answers;

    async prompting() {
        const options: any = this.options;
        
        const version = options.version || "default";
        const schemaPath = path.join(__dirname, "templates", version, "schema.json");
        console.log("schemaPath", schemaPath);
        const prompts = (await import(schemaPath, {with: {type: "json"}}));
        console.log("prompts", prompts);
        
        this.answers = await this.prompt(prompts.default.prompts)
    }

    async writing() {
        const options: any = this.options;
        
        const version = options.version || "default";
        const sourcePath = path.join(__dirname, "templates", version, "files");
        let destinationPath = options.generatedPath ? options.generatedPath : "./";
        
        console.log("sourcePath", destinationPath);
        this.fs.copyTpl(
            sourcePath,
            destinationPath,
            this.answers
        )
    }
}