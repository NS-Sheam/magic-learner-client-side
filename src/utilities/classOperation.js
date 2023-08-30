import axios from "axios";

const allClass = async () => {
  try {
    const response = await axios.get(
      "https://summer-camp-server-side-alpha.vercel.app/classes"
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

const createClass = async (classDetails, email) => {
  try {
    const response = await axios.post(
      "https://summer-camp-server-side-alpha.vercel.app/classes",
      classDetails
    );

    if (response.data.insertedId) {
      const updateResponse = await axios.put(
        `https://summer-camp-server-side-alpha.vercel.app/users?email=${email}`,
        { classes: classDetails.title }
      );
      return updateResponse;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const enrollUserInClass = async (userEmail, classId) => {
  try {
    console.log("hitting 1st", userEmail, classId);
    const response = await axios.put(
      `https://summer-camp-server-side-alpha.vercel.app/users?email=${userEmail}`,
      { status: "enrolled", classId: classId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const deleteClass = async (id) => {
  try {
    const response = await axios.delete(
      `https://summer-camp-server-side-alpha.vercel.app/classes/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export { allClass, createClass, deleteClass, enrollUserInClass };
