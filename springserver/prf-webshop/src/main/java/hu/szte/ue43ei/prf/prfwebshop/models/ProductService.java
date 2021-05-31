package hu.szte.ue43ei.prf.prfwebshop.models;


import java.util.List;

public interface ProductService {

    void addProduct(Product product);
    List<Product> getProducts();
    Product getProductById(String id);
    void deleteProductById(String id);
}
