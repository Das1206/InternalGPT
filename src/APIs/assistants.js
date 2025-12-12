import axios from "axios";
let sessionUser = {};

if (typeof sessionStorage !== "undefined") {
  sessionUser = JSON.parse(sessionStorage.getItem("user"));
}
class AssistantServices {
  /**
   * Get all models
   * @returns
   */
  getAllAssistantList() {
    return axios.get("https://energetic-mite-hem.cyclic.app/api/assistant", {
      headers: {
        Authorization: `${sessionUser?.token}`,
      },
    });
  }

  async addAssistant(data) {
    return axios.post(
      "https://energetic-mite-hem.cyclic.app/api/assistant/add",
      data,
      {
        headers: {
          Authorization: sessionUser?.token,
        },
      }
    );
  }
}
export default AssistantServices;
