import Amplify from "@aws-amplify/core";
import Storage from "@aws-amplify/storage";
import config from "../../aws-exports";
import * as mime from "react-native-mime-types";

Amplify.configure(config);

const uploadImageToS3 = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob(); // format the data for images
  //const folder = "images";
  // generate a unique random name for every single image 'fixed length'
  const contentType = mime.lookup(uri);
  // const fileName = Math.random().toString(18).slice(3).substr(0, 10) + ".jpeg";
  const now = Date.now();
  const fileName = now + ".jpg";

  return await Storage.put(fileName, blob, {
    contentType: contentType,
    level: "public",
    progressCallback(progress) {
      let prog = (progress.loaded / progress.total) * 100.0;
      console.log(prog);
      console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
    },
  });
};

export const getImageOnS3 = async (file) => {
  console.log(file);
  return await Storage.get(file);
};

export default uploadImageToS3;
