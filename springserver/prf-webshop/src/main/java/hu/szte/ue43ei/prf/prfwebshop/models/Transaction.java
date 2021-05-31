package hu.szte.ue43ei.prf.prfwebshop.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String product;
    private int price;
    private Date date;

    public Transaction() {
    }

    public Transaction(int id, String product, int price, Date date) {
        this.id = id;
        this.product = product;
        this.price = price;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", product='" + product + '\'' +
                ", price=" + price +
                ", date=" + date +
                '}';
    }
}
