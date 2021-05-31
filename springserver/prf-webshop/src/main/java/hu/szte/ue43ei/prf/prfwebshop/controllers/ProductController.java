package hu.szte.ue43ei.prf.prfwebshop.controllers;

import hu.szte.ue43ei.prf.prfwebshop.models.Product;
import hu.szte.ue43ei.prf.prfwebshop.models.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@CrossOrigin(origins = "")
public class ProductController {

    ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/")
    public String helloWorld() {
        return "Hello World!";
    }

    @PostMapping(path="/product", consumes = "application/json")
    public String addProduct(@RequestBody Product product) {
        try {
            System.out.println(product);
            this.productService.addProduct(product);
            return "Success";
        } catch (Exception e) {
            e.printStackTrace();
            return product.toString();
        }
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        try {
            return this.productService.getProducts();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/product")
    public Product getProductById(@RequestParam String id) {
        try {
            return this.productService.getProductById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @DeleteMapping("/product")
    public String deleteProductById(@RequestParam String id) {
        try {
            this.productService.deleteProductById(id);
            return "Delete Successful";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error during deletion";
        }
    }

}
