import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

type Transaction = {
  id: number;
  type: "deposit" | "withdraw" | "transfer";
  amount: number;
  sender: string;
  receiver: string;
  status: "completed" | "pending";
};

const PaymentSection: React.FC = () => {
  const [balance, setBalance] = useState<number>(5000);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: "deposit",
      amount: 2000,
      sender: "Investor A",
      receiver: "You",
      status: "completed",
    },
    {
      id: 2,
      type: "transfer",
      amount: 500,
      sender: "You",
      receiver: "Vendor",
      status: "pending",
    },
  ]);

  const [amount, setAmount] = useState<number>(0);

  // Mock Actions
  const handleDeposit = () => {
    if (!amount) return;
    const newTx: Transaction = {
      id: Date.now(),
      type: "deposit",
      amount,
      sender: "Investor",
      receiver: "You",
      status: "completed",
    };

    setBalance(balance + amount);
    setTransactions([newTx, ...transactions]);
    setAmount(0);
  };

  const handleWithdraw = () => {
    if (!amount || amount > balance) return;

    const newTx: Transaction = {
      id: Date.now(),
      type: "withdraw",
      amount,
      sender: "You",
      receiver: "Bank",
      status: "completed",
    };

    setBalance(balance - amount);
    setTransactions([newTx, ...transactions]);
    setAmount(0);
  };

  const handleTransfer = () => {
    if (!amount || amount > balance) return;

    const newTx: Transaction = {
      id: Date.now(),
      type: "transfer",
      amount,
      sender: "Investor",
      receiver: "Entrepreneur",
      status: "completed",
    };

    setBalance(balance + amount); // simulate investor funding
    setTransactions([newTx, ...transactions]);
    setAmount(0);
  };

  return (
    <div className="space-y-6">
      {/* WALLET BALANCE */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Wallet Balance</h2>
        </CardHeader>
        <CardBody>
          <p className="text-3xl font-semibold text-green-600">
            ${balance.toLocaleString()}
          </p>
        </CardBody>
      </Card>

      {/* ACTION PANEL */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Quick Actions</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full border rounded-lg p-2"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <div className="flex gap-3 flex-wrap">
            <Button onClick={handleDeposit}>Deposit</Button>
            <Button onClick={handleWithdraw} variant="secondary">
              Withdraw
            </Button>
            <Button onClick={handleTransfer} variant="outline">
              Investor Funding
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* TRANSACTION HISTORY */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Transaction History</h2>
        </CardHeader>
        <CardBody>
          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Type</th>
                    <th>Amount</th>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b">
                      <td className="py-2 capitalize">{tx.type}</td>
                      <td>${tx.amount}</td>
                      <td>{tx.sender}</td>
                      <td>{tx.receiver}</td>
                      <td>
                        <Badge
                          variant={
                            tx.status === "completed"
                              ? "success"
                              : "warning"
                          }
                        >
                          {tx.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No transactions yet
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
export default PaymentSection;