import axios from "axios";
import Swal from "sweetalert2";
let sessionUser = {};

if (typeof sessionStorage !== "undefined") {
  
  sessionUser = JSON.parse(sessionStorage.getItem("user"));

}
class ChatServices {
  /**
   * Get all models
   * @returns
   */
  getAllChatList() {
    return axios.get("https://energetic-mite-hem.cyclic.app/api/chats", {
      headers: {
        Authorization: `${sessionUser?.token}`,
      },
    });
  }
  getAllChatHistory(id) {
    return axios.get(
      "https://energetic-mite-hem.cyclic.app/api/chats/history/" + id,
      {
        headers: {
          Authorization: `${sessionUser?.token}`,
        },
      }
    );
  }
  deleteChatByID(id) {
    Swal.fire({
      title: "Are you sure to delete chat?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await axios.delete(
          "https://energetic-mite-hem.cyclic.app/api/chats/" + id,
          {
            headers: {
              Authorization: `${sessionUser?.token}`,
            },
          }
        );
        if (data.status === 200)
          Swal.fire({
            title: "Deleted!",
            text: "Your chat has been deleted.",
            icon: "success",
          });
        return data;
      }
    });
  }clearChatHistory(id) {
    Swal.fire({
      title: "Are you sure to delete chat history?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await axios.delete(
          "https://energetic-mite-hem.cyclic.app/api/chats/clear-history/" ,
          {
            headers: {
              Authorization: `${sessionUser?.token}`,
            },
          }
        );
        if (data.status === 200)
        Swal.fire({
          title: "Cleared!",
          text: "Your conversations have been Cleared.",
          icon: "success",
        });
        return data;
      }
    });
  }
  async addMessage(data) {
    return axios.post(
      "https://energetic-mite-hem.cyclic.app/api/chats/create",
      data,
      {
        headers: {
          Authorization: sessionUser?.token,
        },
      }
    );
  }
  async updateChatTitle(data) {
    const response = await axios.post(
      "https://energetic-mite-hem.cyclic.app/api/chats/title-update",
      data,
      {
        headers: {
          Authorization: `${sessionUser?.token}`,
        },
      }
    );
    if (response.status === 200)
      Swal.fire({
        title: "Updated!",
        text: "Chat Title Updated Sucessfully.",
        icon: "success",
      });
    return response;
  }
}

export default ChatServices;
