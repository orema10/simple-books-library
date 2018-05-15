import axios from 'axios';

function query() {
  return axios.get('book.json')
  .then(res => {
    return res.data;
  });
}

function getBookId() {
  return Date.now();
}

function getEmptyBook() {
  return {
    id: getBookId(),
    img: '',
    title: '',
    author: '',
    published: ''
  };
}

export default {
  query,
  getEmptyBook
};
