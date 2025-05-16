const fs = require('fs-extra');
const path = require('path');

async function copyDist() {
    const source = path.join(__dirname, './dist');
    const destination = path.join(__dirname, '../../dist/wwwroot');

    try {
        // Remove existing publish directory
        await fs.remove(destination);

        // Copy dist to publish
        await fs.copy(source, destination);

        console.log('Successfully copied dist to publish folder!');
        console.log(`Copied ${await fs.readdir(source)}`);
    } catch (err) {
        console.error('Error copying files:', err);
        process.exit(1);
    }
}

copyDist();