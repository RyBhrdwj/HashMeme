class crudRepository {
  constructor(model) {
    this.model = model;
  }

  create = async (data) => {
    try {
      const doc = await this.model.create(data);
      return doc;
    } catch (error) {
      console.log("crud error : " + error);
      throw error;
    }
  };

  readAll = async () => {
    try {
      const doc = await this.model.find({});
      return doc;
    } catch (error) {
      console.log("crud error : " + error);
      throw error;
    }
  };

  readOne = async (id) => {
    try {
      const doc = await this.model.findById(id);
      return doc;
    } catch (error) {
      console.log("crud error : " + error);
      throw error;
    }
  };

  destroy = async (id) => {
    try {
      const doc = await this.model.findByIdAndDelete(id);
      return doc;
    } catch (error) {
      console.log("crud error : " + error);
      throw error;
    }
  };
}

module.exports = crudRepository;
