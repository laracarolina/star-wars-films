import api from './api';

export const resources = {
  getFilms: (param) => {
    return api.get(`/films/${param}`);
  },
  getPeople: (param) => {
    return api.get(`/people/${param}`);
  }
}