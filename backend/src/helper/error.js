class ProjectError extends Error {
  constructor(message) {
    super(message);
    this._status = 0;
    this._data = {};
  }

  get statusCode() {
    return this._status;
  }
  set statusCode(code) {
    this._status = code;
  }
  get data() {
    return this._data;
  }
  set data(errorData) {
    this._data = errorData;
  }
}

module.exports = ProjectError;
