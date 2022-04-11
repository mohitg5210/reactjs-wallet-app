import http from "../http-common";

const getAll = () => {
  return http.get("/transaction");
};

const get = (id) => {
  return http.get(`/transaction/${id}`);
};

const create = (data) => {
  return http.post("/transaction", data);
};

const update = (id, data) => {
  return http.put(`/transaction/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/transaction/${id}`);
};

const removeAll = () => {
  return http.delete(`/transaction`);
};

const findByTitle = (title) => {
  return http.get(`/transaction?title=${title}`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TutorialService;
