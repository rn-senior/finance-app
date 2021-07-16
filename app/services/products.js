import { getAsync, postAsync, patchAsync } from "./ConnectApi";

import * as actionTypes from "../actions/actionTypes";
import { URLS3 } from "../utils/environment";

const catalogue = "/catalogue";
const pathSearch = "/busqueda";
const products = "/products";

let ProductsDataAWS = [];
let listSearchCatalogue = [];
let dataUsurio = {};

const setCatalogo = (catalogo) => {
  return {
    type: actionTypes.CATALOGO,
    catalogo,
  };
};

const setProducts = (product) => {
  return {
    type: actionTypes.PRODUCT,
    product,
  };
};

export const ProductsData = () => {
  return ProductsDataAWS;
};

//get products for user
export const ProductService = (params, callback) => (dispatch) => {
  postAsync(
    catalogue,
    {
      onSuccess: (response) => {
        ProductsDataAWS = [];
        response.forEach((p) => {
          ProductsDataAWS.push({
            id: p.id,
            description: p.descripcion,
            secondDescription: p.nombre,
            title: p.nombre,
            image: setImagesArr(p),
            salePrice: "S/" + p.precio,
            isFavorite: !!p.favorito,
            state: p.estado,
            price: p.precio,
            sku: p.quryId,
            metadata: p.metadata,
          });
        });
        dispatch(setProducts(ProductsDataAWS));
      },
      onError: (error) => {
        //callback(false)
      },
      data: {
        usuario_id: 1, // Session.user.id
      },
    },
    null
  );
};

export const SetProductService = (params, callback) => (dispatch) => {
  patchAsync(
    products,
    {
      onSuccess: (response) => {
        //dispatch(setProducts(ProductsDataAWS));
      },
      onError: (error) => {
        //callback(false)
      },
      data: {
        params, // Session.user.id
      },
    },
    null
  );
};

export const SearchCatalogueData = () => {
  return listSearchCatalogue;
};

export const DataUsuario = () => {
  return dataUsurio;
};

//   export const SearchCatalogueService = (params, callback) => {
//     getAsync(pathSearch+"/"+params, {
//       onSuccess: (response) => {
//           console.log(" action get data on prosd");
//           console.log(response);
//           listSearchCatalogue = []
//           if(response[0].productos){

//             dataUsurio = {
//               name:response[0].nombres +" "+ response[0].apellidos,
//               user: response[0].userLogin,
//               quryId: response[0].quryId};

//             response[0].productos.forEach(
//               p => {
//                 console.log(p.id);
//                 listSearchCatalogue.push({
//                   id: p.id,
//                   description: p.descripcion,
//                   secondDescription: p.nombre,
//                   title: p.descripcion,
//                   image: [p.imagen1, p.imagen2, p.imagen3],
//                   salePrice: "S/"+p.precio,
//                   isFavorite: !!p.favorito,
//                   price:  p.precio,
//                   sku: p.quryId
//                 });

//               }
//             );
//           }else{
//             response.forEach(
//               p => {
//                 listSearchCatalogue.push({
//                   id: p.id,
//                   description: p.descripcion,
//                   secondDescription: p.nombre,
//                   title: p.descripcion,
//                   image: [p.imagen1, p.imagen2, p.imagen3],
//                   salePrice: "S/"+p.precio,
//                   isFavorite: !!p.favorito,
//                   price:  p.precio,
//                   sku: p.quryId
//                 });

//               }
//             );
//           }
//       },
//       onError: (error) => {
//         //callback(false)
//       }
//     }, null)
// }

export const SearchCatalogueService = (search, callback) => (dispatch) => {
  getAsync(
    pathSearch + "/" + search,
    {
      onSuccess: (response) => {
        let listSearchCatalogue = [];
        if (response[0].productos) {
          dataUsurio = {
            id: response[0].id,
            // name: response[0].nombres + " " + response[0].apellidos,
            name: response[0].nombres,
            surname: response[0].apellidos,
            user: response[0].userLogin,
            quryId: response[0].quryId,
          };

          response[0].productos.forEach((p) => {
            listSearchCatalogue.push({
              id: p.id,
              description: p.descripcion,
              secondDescription: p.nombre,
              title: p.descripcion,
              image: setImagesArr(p),
              salePrice: "S/" + p.precio,
              isFavorite: !!p.favorito,
              price: p.precio,
              sku: p.quryId,
              metadata: p.metadata,
            });
          });
        } else {
          response.forEach((p) => {
            listSearchCatalogue.push({
              id: p.id,
              description: p.descripcion,
              secondDescription: p.nombre,
              title: p.descripcion,
              image: setImagesArr(p),
              salePrice: "S/" + p.precio,
              isFavorite: !!p.favorito,
              price: p.precio,
              sku: p.quryId,
              metadata: p.metadata,
            });
          });
        }
        dispatch(setCatalogo(listSearchCatalogue));
      },
      onError: (error) => {
        //callback(false)
      },
    },
    null
  );
};

const setImagesArr = (p) => {
  let arr = [p.imagen1, p.imagen2, p.imagen3];
  return arr
    .filter((i) => {
      return i != "";
    })
    .filter((i) => {
      return i != null;
    })
    .map((i) => URLS3 + i);
};
