import axios from "axios";

export const logUser = async (body) => {
  console.log(body);
  let search = await axios.post(`http://localhost:3000/user/login`, body);
  return search.data.token;
};

export const registerUser = async (body) => {
  console.log(body);
  return await axios.post(`http://localhost:3000/user/register`, body);
};

export const updateProfile = async (profile, credentials) => {
  return await axios.put("http://localhost:3000/user/update", profile, {
    headers: { Authorization: `Bearer ${credentials}` },
  });
};

export const myStrategy = async (credentials) => {
  return await axios.get("http://localhost:3000/strategy/getMyStrategies", {
    headers: { Authorization: `Bearer ${credentials}` },
  });
};

export const superAdminStrategies = async (credentials) => {
  return await axios.get("http://localhost:3000/strategy/allStrategies", {
    headers: { Authorization: `Bearer ${credentials}` },
  });
};

export const allUsers = async (credentials) => {
  return await axios.get("http://localhost:3000/superadmin/all", {
    headers: { Authorization: `Bearer ${credentials}` },
  });
};

export const allTechnicals = async (credentials) => {
  return await axios.get(
    "http://localhost:3000/technicalresource/getAllTechnicalResources",
    {
      headers: { Authorization: `Bearer ${credentials}` },
    }
  );
};

export const updateTechnical = async (technicalId, data, credentials) => {
  return await axios.put(
    "http://localhost:3000/technicalresource/updateTechnicalResource",
    { id: technicalId, ...data },
    {
      headers: { Authorization: `Bearer ${credentials}` },
    }
  );
};

export const updateUserRole = async (technicalId, data, credentials) => {
  return await axios.put(
    "http://localhost:3000/superadmin/update",
    { id: technicalId, ...data },
    {
      headers: { Authorization: `Bearer ${credentials}` },
    }
  );
};

export const deleteTechnical = async (technicalId, credentials) => {
  return await axios.delete(
    "http://localhost:3000/technicalresource/deleteTechnicalResource",
    {
      data: { id: technicalId },
      headers: { Authorization: `Bearer ${credentials}` },
    }
  );
};

export const createTechnical = async (data, credentials) => {
  return await axios.post(
    `http://localhost:3000/technicalresource/createTechnicalResource`,
    data,
    {
      headers: { Authorization: `Bearer ${credentials}` },
    }
  );
};

export const allTimeFrames = async (credentials) => {
  return await axios.get("http://localhost:3000/timeframe/getAllTimeFrames", {
    headers: { Authorization: `Bearer ${credentials}` },
  });
};

export const createTimeFrame = async (data, credentials) => {
  return await axios.post(
    `http://localhost:3000/timeframe/createTimeFrame`,
    data,
    {
      headers: { Authorization: `Bearer ${credentials}` },
    }
  );
};

export const deleteTimeFrame = async (timeId, credentials) => {
  try {
    const response = await axios.delete(
      "http://localhost:3000/timeframe/deleteTimeFrame",
      {
        headers: { Authorization: `Bearer ${credentials}` },
        data: { id: timeId }, // Coloca el ID en la propiedad data
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStrategy = async (strategyId, editedValues, credentials) => {
  try {
    const response = await axios.put(
      "http://localhost:3000/strategy/updateStrategy",
      { id: strategyId, ...editedValues },
      { headers: { Authorization: `Bearer ${credentials}` } }
    );

    console.log("Response from updateAppointment:", response.data.data);
    return response.data;
  } catch (error) {
    console.error("Error in updateAppointment:", error);
    throw error;
  }
};

export const deleteMyStrategy = async (strategyId, credentials) => {
  return await axios.delete("http://localhost:3000/strategy/deleteStrategy", {
    data: { id: strategyId },
    headers: { Authorization: `Bearer ${credentials}` },
  });
};

export const newStrategy = async (body, credentials) => {
  console.log(body);
  return await axios.post(
    `http://localhost:3000/strategy/createStrategy`,
    body,
    {
      headers: { Authorization: `Bearer ${credentials}` },
    }
  );
};
