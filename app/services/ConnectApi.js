//import axios from 'axios';

import { API } from "aws-amplify";

const awsmobile = {
  aws_project_region: "us-east-1",
  aws_cognito_identity_pool_id:
    "us-east-1:7c74d9d8-61c8-4743-a4d8-469f234a1d2d",
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: "us-east-1_0ZebuUEfD",
  aws_user_pools_web_client_id: "5llftvm1pvd4ibm98be9b69n7s",
  oauth: {},
  API: {
    endpoints: [
      {
        name: "QuryAppApi",
        endpoint:
          "https://e7by1tyafa.execute-api.us-east-1.amazonaws.com/latest",
        //"https://8te09mewpk.execute-api.us-east-1.amazonaws.com/latest",
      },
    ],
  },
  Storage: {
    AWSS3: {
      bucket: "qurybucket",
      region: "us-east-1",
    },
  },
};
API.configure(awsmobile);

// Amplify.configure({
//   Auth: {
//       identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab', //REQUIRED - Amazon Cognito Identity Pool ID
//       region: 'XX-XXXX-X', // REQUIRED - Amazon Cognito Region
//       userPoolId: 'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito User Pool ID
//       userPoolWebClientId: 'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito Web Client ID
//   },
//   Storage: {
//     AWSS3: {
//       bucket: '', //REQUIRED -  Amazon S3 bucket name
//       region: 'XX-XXXX-X', //OPTIONAL -  Amazon service region
//     }
//   }
// });

const apiName = "QuryAppApi";

const onSuccess = (response, url) => {
  console.log({ url: url, onSuccess: response });
};

const onError = (error, url) => {
  console.log({ url: url, onError: error });
};

const configReq = (data, headers) => {
  var params = {
    headers: {
      "Cache-Control": "no-cache",
      "X-CP-Origen": "app-lambda",
    },
    body: data,
  };
  if (!headers) {
    headers = {};
  }
  params.headers = Object.assign(params.headers, headers);
  return params;
};

const configReqGet = (data, headers) => {
  var params = {
    headers: {
      "Cache-Control": "no-cache",
      "X-CP-Origen": "app-lambda",
    },
    pathParams: data,
  };
  if (!headers) {
    headers = {};
  }
  params.headers = Object.assign(params.headers, headers);
  //console.log(params.headers);

  //console.log("ON HEADERS REQUEST");
  return params;
};

export const getAsync = async (path, params, headers) => {
  let reqConfig = configReqGet(params.data, headers);
  await API.get(apiName, path, reqConfig)
    .then((response) => {
      if (!response) {
        response = {};
      }
      onSuccess(response, path);
      params.onSuccess(response);
    })
    .catch((error) => {
      onError(error, path);
      params.onError(error);
    });
};

export const postAsync = async (path, params, headers) => {
  let reqConfig = configReq(params.data, headers);
  await API.post(apiName, path, reqConfig)
    .then((response) => {
      if (!response) {
        response = {};
      }
      onSuccess(response, path);
      params.onSuccess(response);
    })
    .catch((error) => {
      onError(error, path);
      params.onError(error);
    });
};

export const patchAsync = async (path, params, headers) => {
  let reqConfig = configReq(params.data, headers);
  await API.patch(apiName, path, reqConfig)
    .then((response) => {
      if (!response) {
        response = {};
      }
      onSuccess(response, path);
      params.onSuccess(response);
    })
    .catch((error) => {
      onError(error, path);
      params.onError(error);
    });
};

export const deleteAsync = async (path, params, headers) => {
  let reqConfig = configReq(params.data, headers);
  await API.del(apiName, path, reqConfig)
    .then((response) => {
      if (!response) {
        response = {};
      }
      onSuccess(response, path);
      params.onSuccess(response);
    })
    .catch((error) => {
      onError(error, path);
      params.onError(error);
    });
};

// async function deleteAsync(path, params, port, headers) {
//   if (isLocal) {
//     if (!port) {
//       port = path;
//     }
//     let URL_LOCAL =
//       Constants.API_LOCAL.replace("[PORT]", LocalPorts.obtainPort(port)) + path;
//     await axios
//       .delete(URL_LOCAL + "?" + Utilities.toParams(params.data), {
//         headers: headers,
//       })
//       .then((response) => {
//         onSuccess(response, path);
//         params.onSuccess(response);
//       })
//       .catch((error) => {
//         onError(error, path);
//         params.onError(error);
//       });
//   } else {
//     let reqConfig = configReq(undefined, headers);
//     await API.del(
//       Constants.API_NAME,
//       path + "?" + Utilities.toParams(params.data),
//       reqConfig
//     )
//       .then((response) => {
//         if (!response) {
//           response = {};
//         }
//         onSuccess(response, path);
//         params.onSuccess(response);
//       })
//       .catch((error) => {
//         onError(error, path);
//         params.onError(error);
//       });
//   }
// }
