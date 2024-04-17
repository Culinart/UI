const fs = require('fs')
const { google } = require('googleapis')

const GOOGLE_API_FOLDER_ID = '1psHGUSw7iOXCv3vl7wTdaoxNdoX5g8Fx';

async function uploadFile(file) {
    if (!fs.existsSync(filePath)) {
        console.log(`O arquivo '${filePath}' não foi encontrado.`);
        return; 
    }
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: './src/api/google-api/googledrive.json',
            scopes: ['https://www.googleapis.com/auth/drive']
        });

        const driveService = google.drive({
            version: 'v3',
            auth
        });

        const fileMetaData = {
            'name': file.name,
            'parents': [GOOGLE_API_FOLDER_ID]
        };

        const media = {
            mimeType: 'image/jpg',
            body: fs.createReadStream(file.path)
        };

        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id'
        });

        console.log("RESPONSE", response);

        // return response.data.id;
    } catch (err) {
        console.log('Upload file error', err);
    }
}

export default uploadFile;