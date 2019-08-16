/*
 * File: index.ts
 * Desc: 描述
 * File Created: 2019-08-16 18:15:37
 * Author: chenghao
 * ------
 * Copyright 2019 - present, chenghao
 */
import commander, { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

const pk: any = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json')).toString());

let projectName: string = '';

const program: Command = new commander.Command(pk.name)
    .allowUnknownOption()
    .description('init react-lib project')
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action((name: string) => {
        projectName = name;
    })
    .version(pk.version)
    .option('--overwrite', 'overwrite the project-directory if it exists')
    .on('--help', function() {
        console.log(`    Only ${chalk.green('<project-directory>')} is required.`);
        console.log('');
    })
    .parse(process.argv);

if (!projectName) {
    console.log(chalk.yellow('Please specify the project directory:'));
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`);
    console.log();
    process.exit(1);
}

if (fs.existsSync(projectName) && !program.overwrite) {
    console.log(
        chalk.red(`we cannot crate a project called ${projectName},
because a project with the same name exists.
Please check and choose another project name.`
        )
    );
    process.exit(1);
}

copyTemplate(projectName);

function copyTemplate(appname: string): void {
    const libPath: string = path.join(__dirname, '..');
    const templatePath: string = path.join(libPath, 'template');
    const projectPath: string = path.resolve(appname)
    fs.copySync(templatePath, projectPath);

    console.log('╔═.' + chalk.red('♥') + '. ═════════════════════════════════════╗');
    console.log(` ${chalk.green('Success!')}`)
    console.log(' https://github.com/yezihaohao/react-lib-creator');
    console.log(' happy coding~~~');
    console.log('╚══════.' + chalk.red('♥') + '. ════════════════════════════════╝');
}
