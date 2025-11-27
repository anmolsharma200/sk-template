import Generator from "yeoman-generator";

interface Answers {
  moduleName: string;
}

export default class ModuleGenerator extends Generator {
  answers!: Answers;

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "moduleName",
        message: "Module's name.",
      },
    ]);
  }

  async writing() {
    const options: any = this.options;
    let destinationPath = options.generatedPath ? options.generatedPath : "./";
    
    
    this.fs.copyTpl(
      this.templatePath(),
      destinationPath,
      this.answers
    );
  }
}
