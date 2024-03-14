import { access, mkdir } from 'fs/promises';

const createFolder = async (dirPath) => {
  try {
    await access(dirPath);
    console.log('The directory exists');
  } catch (error) {
    console.log(error.message);

    if (error.code === 'ENOENT') {
      console.log('The directory does NOT exist');

      try {
        await mkdir(dirPath);
        console.log('Folder successfully created');
      } catch (err) {
        console.log(error.err);
      }
    }
  }
};

export default createFolder;
