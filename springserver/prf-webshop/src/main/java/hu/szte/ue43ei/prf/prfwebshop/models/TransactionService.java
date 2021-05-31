package hu.szte.ue43ei.prf.prfwebshop.models;


import java.util.List;

public interface TransactionService {
    void addTransaction(Transaction transaction);
    List<Transaction> getTransaction();
    Transaction getTransactionById(int id);
    void deleteTransactionById(int id);
}
