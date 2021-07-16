import { getAsync, patchAsync, postAsync } from "./ConnectApi";
import * as actionTypes from "../actions/actionTypes";

const path = "/favorite";
const pathFavoritos = "/favoritos";
const pathDelete = "/delete-favorite";

let favoritesDataAWS = [];
let favoritosDataAWS = [];
let favoritosProductsAWS = [];

let isProduct = false;
let isCatalogue = false;

export const favoritesData = () => {
  return favoritesDataAWS;
};

export const favoritosData = () => {
  return favoritosDataAWS;
};

export const favoritosProducts = () => {
  return favoritosProductsAWS;
};

const setFavorites = (favorite) => {
  return {
    type: actionTypes.FAVORITE,
    favorite,
  };
};

const setProducts = (product) => {
  return {
    type: actionTypes.PRODUCT,
    product,
  };
};

//get favorites for user
export const FavoriteService = (params, callback) => (dispatch) => {
  getAsync(
    path,
    {
      onSuccess: (response) => {
        console.log(" action get data on prosd");
        console.log(response[0].descripcion);
        favoritesDataAWS = [];
        response.forEach((p) => {
          console.log(p.id);
          favoritesDataAWS.push({
            id: p.id,
            usuario_id: p.usuario_id,
            producto_id: p.producto_id,
            usuario_id_catalogo: p.usuario_id_catalogo,
          });
        });
        dispatch(setFavorites(favoritesDataAWS));
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

export const addProductfavoriteService = (params, callback) => (dispatch) => {
  console.log("==== params ====");
  console.log(params);
  postAsync(
    path,
    {
      onSuccess: (response) => {
        console.log(" action add product success message");
        console.log(response);
      },
      onError: (error) => {
        //callback(false)
        console.log(error);
      },
      data: {
        usuario_id: params.userId, // Session.user.id
        producto_id: params.idProduct,
      },
    },
    null
  );
};

export const addCatalogfavoriteService = (params, callback) => (dispatch) => {
  console.log("==== params ====");
  console.log(params);
  postAsync(
    path,
    {
      onSuccess: (response) => {
        console.log(" action add catalog success message");
        console.log(response);
      },
      onError: (error) => {
        //callback(false)
        console.log(error);
      },
      data: {
        usuario_id: params.userId, // Session.user.id
        usuario_id_catalogo: params.idCatalog,
      },
    },
    null
  );
};

export const deletefavoriteService = (params, callback) => (dispatch) => {
  console.log("==== params ====");
  console.log(params);
  postAsync(
    pathDelete,
    {
      onSuccess: (response) => {
        console.log(" action get favorites success message");
        console.log(response);
      },
      onError: (error) => {
        //callback(false)
      },
      data: {
        usuario_id: params.userId, // Session.user.id
        producto_id: params.idProduct,
        usuario_id_catalogo: params.idCatalog,
      },
    },
    null
  );
};

export const patchfavoriteService = (params, callback) => (dispatch) => {
  patchAsync(
    path,
    {
      onSuccess: (response) => {
        console.log(" action patch favorites success message");
        console.log(response);
      },
      onError: (error) => {
        //callback(false)
      },
      data: {
        id: params, // Session.user.id
        usuario_id: 1,
      },
    },
    null
  );
};

export const FavoritosService = (params, callback) => (dispatch) => {
  postAsync(
    pathFavoritos,
    {
      onSuccess: (response) => {
        console.log("======== action get data on prosd ========");
        console.log(response);
        favoritosDataAWS = [];
        favoritosProductsAWS = [];
        response.forEach((p) => {
          console.log(p.id);

          if (p.producto_id) {
            isProduct = true;
            isCatalogue = false;
          } else {
            isProduct = false;
            isCatalogue = true;
          }

          favoritosDataAWS.push({
            id: p.id,
            usuario_id: p.usuario_id,
            producto_id: p.producto_id,
            usuario_id_catalogo: p.usuario_id_catalogo,
            hierarchyLevel: p.hierarchyLevel,
            parentId: p.parentId,
            usuarioId: p.usuarioId,
            productoId: p.productoId,
            producto: p.producto,
            isProduct: isProduct,
            isCatalogue: isCatalogue,
          });

          favoritosProductsAWS.push({
            id: p.producto.id,
            secondDescription: p.producto.nombre,
            shortName: p.producto.nombreCorto,
            description: p.producto.descripcion,
            title: p.producto.descripcion,
            image: [p.producto.imagen1, p.producto.imagen2, p.producto.imagen3],
            politics: p.producto.politicas,
            coin: p.producto.moneda,
            price: p.producto.precio,
            salePrice: "S/" + p.producto.precio,
            //costPrice: "S/" + p.producto.precio,
            metadata: p.producto.metadata,
            sku: p.producto.quryId,
            productId: p.producto.productoId,
            hash: p.producto.hash,
            status: p.producto.estado,
            user_id: p.producto.usuario_id,
            type_id: p.producto.tipo_id,
            isProduct: isProduct,
            isCatalogue: isCatalogue,
          });
        });
        dispatch(setProducts(favoritosProductsAWS));
      },
      onError: (error) => {
        //callback(false)
      },
      data: {
        usuario_id: params, // Session.user.id
      },
    },
    null
  );
};
