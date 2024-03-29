import axios from "axios";

class ProductService {
    constructor() {
        this.baseUrl = "https://5fc9346b2af77700165ae514.mockapi.io/products";
    }

    async getAllProducts() {
        return await axios.get(this.baseUrl).then((response) => response.data);
    }

    async getOneProduct(id) {
        return await axios.get(`${this.baseUrl}/${id}`).then((response) => response.data);
    }
}

export default ProductService;
