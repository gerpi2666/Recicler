 class ResponseModel {
    constructor() {
      this.StatusCode = '';
      this.Message = '';
      this.Data = null;
    }
  }

  class Direccion{
    constructor() {
      this.Id = '';
      this.Name = '';
    }
  }

module.exports = { ResponseModel,Direccion };
