import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { cwd, chdir } from 'node:process';
import { dirname, resolve } from 'node:path'
const argument = process.argv.slice(2);
const username = argument[1].split('=')[1];
console.log('Welcome to the File Manager,', username);

const exit = () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
}

const up = () => {
    const currentDir = cwd();
    const parentDir = dirname(currentDir);
    if (currentDir !== parentDir) {
        chdir(parentDir);
    }
}

const ls = async () => {
    try {
        const files = await readdir(cwd(), { withFileTypes: true });
        const folders = files.filter(file => file.isDirectory()).map(dir => dir.name);
        const fileNames = files.filter(file => file.isFile()).map(file => file.name);
        console.log('FILES:', files);
        
        folders.sort();
        fileNames.sort();

        console.log('Folders:');
        folders.forEach(name => console.log(name));
        console.log('Files:');
        fileNames.forEach(name => console.log(name));
    } catch (err) {
        console.log('Operation failed');
    }
}

function executor(command) {
    try {
        const commands = {
            '.exit': exit,
            'up': up,
            'ls': ls
        }

        (async () => 
          await commands[command]()
        )();
        console.log(`You are currently in ${cwd()}`);
    } catch (err) {
        console.log('Invalid input');
    }
}



 const rl = readline.createInterface({
    input,
    output,
    prompt: '> '
})

rl.on('line', (value) => {
    console.log(value);
    executor(value.trim());
    rl.prompt();
}).on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
}).prompt();
 



