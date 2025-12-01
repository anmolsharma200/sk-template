import { fileURLToPath } from "url";
import Generator from "yeoman-generator";
import path from "path";

interface Answers {
    appPackage: string;
    appName: string;
    generateUI: boolean;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class RootGenerator extends Generator {
    answers!: Answers;

    async prompting() {
        this.answers = await this.prompt({
            prompts: [
                {
                    type: "input",
                    name: "appPackage",
                    message: "Application's root package name.",
                },
                {
                    type: "input",
                    name: "appName",
                    message: "Application's name.",
                },
                {
                    type: "confirm",
                    name: "generateUI",
                    message: "Generate a React UI?",
                    default: true,
                },
            ],
        });
    }

    async writing() {
        const options: any = this.options;

        const sourcePath = path.join(__dirname, "templates");
        let destinationPath = options.generatedPath ? options.generatedPath : "./";

        console.log("sourcePath", destinationPath);
        this.fs.copyTpl(sourcePath, destinationPath, this.answers);
    }
}
