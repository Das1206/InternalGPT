import axios from "axios";

let sessionUser = {};

if (typeof sessionStorage !== "undefined") {
  sessionUser = JSON.parse(sessionStorage.getItem("user"));
}
class ModalService {
  /**
   * Get all models
   * @returns
   */
  getAllModels() {
    return axios.get("https://energetic-mite-hem.cyclic.app/api/models", {
      headers: {
        Authorization: `${sessionUser?.token}`,
      },
    });
  }
  getAllFavoriteModels() {
    return axios.get("https://energetic-mite-hem.cyclic.app/api/favorite", {
      headers: {
        Authorization: `${sessionUser?.token}`,
      },
    });
  }
  addFavoriteModel(data) {
    return axios.post(
      "https://energetic-mite-hem.cyclic.app/api/favorite",
      data,
      {
        headers: {
          Authorization: `${sessionUser?.token}`,
        },
      }
    );
  }
  /**
   * Get By Id
   * @returns
   */

  /**
   *To Update a Model
   * @returns
   */
  
  updateModel(data) {
    console.log(data)
    return axios.post("https://energetic-mite-hem.cyclic.app/api/models/update/"+data?.id, data,{
      headers: {
        Authorization: `${sessionUser?.token}`,
      },
    });
  }
  /**
   *To Add a Model
   * @returns
   */
  async addModel(data) {
    const res = await axios.post(
      "https://energetic-mite-hem.cyclic.app/api/models",
      data,
      {
        headers: {
          Authorization: `${sessionUser?.token}`,
        },
      }
    );
    if (res.status === 200)
      Swal.fire({
        title: "Created!",
        text: "Model Created Sucessfully.",
        icon: "success",
      });
    return res;
  }


  /**
   *To Delete a Model
   * @returns
   */
  async deleteModel() {
    const res = await axios.delete(
      "https://energetic-mite-hem.cyclic.app/api/models/1",
      {
        method: "DELETE",
      }
    );
    return res;
  }
}

export default ModalService;
