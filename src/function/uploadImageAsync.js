import firebase from 'firebase'

export const uploadImageAsync = async (image,id) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", image, true);
    xhr.send(null);
  });
  const ref = firebase.storage().ref(`/orders/${id}/${id}-0.jpg`);
  const snapshot = await ref.put(blob);
  return await snapshot.ref.getDownloadURL();
}
