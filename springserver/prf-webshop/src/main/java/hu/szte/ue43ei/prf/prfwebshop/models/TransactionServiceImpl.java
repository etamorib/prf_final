package hu.szte.ue43ei.prf.prfwebshop.models;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionServiceImpl implements TransactionService {

    TransactionRepository transactionRepository;

    @Autowired
    public TransactionServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    public void addTransaction(Transaction transaction) {
        this.transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getTransaction() {
        return this.transactionRepository.findAll();
    }

    @Override
    public Transaction getTransactionById(int id) {
        Optional<Transaction> byId = this.transactionRepository.findById(id);
        return byId.orElse(null);
    }

    @Override
    public void deleteTransactionById(int id) {
        this.transactionRepository.deleteById(id);
    }
}
