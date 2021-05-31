package hu.szte.ue43ei.prf.prfwebshop.controllers;

import hu.szte.ue43ei.prf.prfwebshop.models.Transaction;
import hu.szte.ue43ei.prf.prfwebshop.models.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@CrossOrigin(origins = "")
public class TransactionController {

    TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping(path="/transaction", consumes = "application/json")
    public String addTransaction(@RequestBody Transaction transaction) {
        try {
            System.out.println(transaction);
            this.transactionService.addTransaction(transaction);
            return "Success";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error during the create operation";
        }
    }

    @GetMapping("/transactions")
    public List<Transaction> getTransaction() {
        try {
            return this.transactionService.getTransaction();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/transaction")
    public Transaction getTransactionById(@RequestParam int id) {
        try {
            return this.transactionService.getTransactionById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @DeleteMapping("/transaction")
    public String deleteTransactionById(@RequestParam int id) {
        try {
            this.transactionService.deleteTransactionById(id);
            return "Delete Successful";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error during deletion";
        }
    }

}
