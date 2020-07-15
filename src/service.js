import axios from 'axios';

/**
 * Method for calling APIs.
 * @param {String} method : Method using which the api is called(GET, POST, etc.)
 * @param {String} url : URL of the API
 * @param {Object} obj : Object/data to be sent as input.
 * @returns {Promise} Promise
 */

const call = (method, url, obj = {}) => {
  return new Promise((resolve, reject) => {
    //let token;
    let args = {
      method: method,
      url: url,
      data: obj
    }
    try {
      axios(args).then(response => {
        console.log("response console in called api:", response)
        if (response.status === 200)
          resolve(response);
        else
          response.message ? reject(response.status) : reject(response.error)
      }).catch(e => {
        reject(e);
      });

    } catch (error) {
      console.log('error is here ', error);
      reject(error)
    }
  })
}

export default call;
