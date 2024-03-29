// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
const express = require('express');
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('../servicekey.json')
const port = 3001;
const { Storage } = require('@google-cloud/storage');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://paperexplainer-f71b1.appspot.com', // Replace with your Firebase Storage bucket URL
});

const bucket = admin.storage().bucket();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const db = admin.firestore();


app.post('/sectionCreate', async(req, res) => {
  const {sectionName, description} = req.body;
  if(!sectionName || !description){
    return res.status(400).send('No section or description provided.');
  }
  try {
    // Save the section data to Firestore
    await db.collection('sections').add({
      sectionName,
      description,
    });

    console.log('Section data saved to Firestore.');
    res.send('Section data saved to Firestore.');
  } catch (error) {
    console.error('Error saving section data to Firestore:', error);
    res.status(500).send('Error saving section data to Firestore.');
  }
})



app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const fileName = req.file.originalname;
    const cardName = req.body.cardName
    // Create a write stream to Firebase Storage
    const fileStream = bucket.file(fileName).createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
        metadata: {
          cardName : cardName,
        }
      },
    });

    fileStream.on('error', (err) => {
      console.error('Error uploading file to Firebase Storage:', err);
      res.status(500).send('Error uploading file to Firebase Storage.');
    });

    fileStream.on('finish', () => {
      console.log('File uploaded to Firebase Storage.');
      res.send('File uploaded to Firebase Storage.');
    });

    fileStream.end(req.file.buffer);
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Error handling file upload.');
  }
});

app.get('/cards', async (req, res) => {
  try {
    // Reference to the 'sections' collection
    const sectionsRef = db.collection('sections');

    // Get all documents in the 'sections' collection
    const snapshot = await sectionsRef.get();

    // Extract section names from the documents
    const sectionNames = snapshot.docs.map(doc => ({
      sectionName: doc.data().sectionName,
      description: doc.data().description
    }));

    // Send the section names as a JSON response
    res.json(sectionNames);
  } catch (error) {
    console.error('Error fetching section names:', error);
    res.status(500).send('Internal Server Error');
  }

})

app.get('/files/:selectedCard/:fileName', async (req, res) => {
  try{
    const specifiedCardName = req.params.selectedCard;
    const fileName = req.params.fileName;
    const [file] = await bucket.file(`${specifiedCardName}/${fileName}`).download();
    res.send(file)
  }
  catch{
    console.log("Error retrieving data")
  }
})

app.get('/files/:selectedCard', async (req, res) => {
  try {
    console.log("Running")
    const [files] = await bucket.getFiles();
    const specifiedCardName = req.params.selectedCard;
    const fileDetails = await Promise.all(
      files.map(async (file) => {
          const [metadata] = await file.getMetadata();
          const [fileContent] = await bucket.file(`${file.name}`).download();
          if(metadata && metadata.metadata && metadata.metadata.cardName === specifiedCardName){
          return {
              name: file.name,
              cardName: metadata.metadata.cardName,
              fileContent: fileContent
          };
        }
        return null
      })
  );

  console.log(fileDetails);
  res.json(fileDetails);
  } catch (error) {
    console.error('Error getting files:', error);
    res.status(500).send('Internal Server Error');
  }

  
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});