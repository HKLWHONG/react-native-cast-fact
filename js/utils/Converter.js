/**
 * @format
 * @flow strict-local
 */

export const blobToBase64Data = (blob) => {
  return new Promise((resolve, reject) => {
    const fileReaderInstance = new window.FileReader();

    fileReaderInstance.readAsDataURL(blob);

    fileReaderInstance.onload = () => {
      const base64data = fileReaderInstance.result;

      if (base64data) {
        resolve(base64data);
      } else {
        reject('Cannot convert to base64 data format.');
      }
    };
  });
};
