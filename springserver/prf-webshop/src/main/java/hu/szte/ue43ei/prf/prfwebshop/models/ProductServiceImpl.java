package hu.szte.ue43ei.prf.prfwebshop.models;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService{
    ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void addProduct(Product product) {
        this.productRepository.save(product);
    }

    @Override
    public List<Product> getProducts() {
        return this.productRepository.findAll();
    }

    @Override
    public Product getProductById(String id) {
        final Optional<Product> byId = this.productRepository.findById(id);
        return byId.orElse(null);
    }

    @Override
    public void deleteProductById(String id) {
        this.productRepository.deleteById(id);
    }
}
