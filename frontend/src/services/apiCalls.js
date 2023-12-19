import axios from "axios";

export const logUser = async (body) => {
  console.log(body);
  let search = await axios.post(`http://localhost:3000/user/login`, body);
  return search.data.token;
};

export const logArtist = async (body) => {
  console.log(body);
  let search = await axios.post(`http://localhost:4004/artist/login`, body);
  return search.data.token;
};

export const registerUser = async (body) => {
  console.log(body);
  return await axios.post(`http://localhost:3000/user/register`, body);
};

export const newAppointment = async (body, credentials) => {
  console.log(body);
  return await axios.post(`http://localhost:4004/appointments/create`, body, {
    headers: { Authorization: `Bearer ${credentials}` },
  });
};

export const bringTattooArtists = async () => {
  return await axios.get(`http://localhost:4004/artist/all`);
};

export const bringTattoo = async () => {
  return await axios.get(`http://localhost:4004/tattoo/all`);
};

export const updateProfile = async (profile, credentials) => {
  return await axios.put("http://localhost:3000/user/update", profile, {
    headers: { Authorization: `Bearer ${credentials}` },
  });
};

export const updateAppointment = async (appointmentId, editedValues, credentials) => {
    try {
      const response = await axios.put(
        'http://localhost:4004/appointments/update',
        { id: appointmentId, ...editedValues },
        { headers: { Authorization: `Bearer ${credentials}` } }
      );
  
      console.log('Response from updateAppointment:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in updateAppointment:', error);
      throw error;
    }
  };
  

export const myappointments = async (credentials) => {
  return await axios.get("http://localhost:4004/user/myAppointments", {
    headers: { Authorization: `Bearer ${credentials}` },
  });
};

export const superadminappointments = async (credentials) => {
  return await axios.get("http://localhost:4004/user/allAppointments", {
    headers: { Authorization: `Bearer ${credentials}` },
  });
};

export const superadminallusers = async (credentials) => {
  return await axios.get("http://localhost:4004/user/all", {
    headers: { Authorization: `Bearer ${credentials}` },
  });
};

export const artistappointments = async (credentials) => {
  return await axios.get("http://localhost:4004/artist/myAppointments", {
    headers: { Authorization: `Bearer ${credentials}` },
  });
};

export const deletemyappointments = async (credentials) => {
  return await axios.delete("http://localhost:4004/appointments/delete", {
    headers: { Authorization: `Bearer ${credentials}` },
  });
};

export const deletemyappointmentsArtist = async (appointmentId, editedValues, credentials) => {
  return await axios.delete("http://localhost:4004/appointments/delete", 
  { id: appointmentId, ...editedValues },
  {headers: { Authorization: `Bearer ${credentials}` },
  });
};
