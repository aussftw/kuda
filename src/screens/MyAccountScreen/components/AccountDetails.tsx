import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  formatCurrency,
  formatTransactionAmount,
  getInitialLetter,
} from "../../../helpers";

import { AccountData } from "../../../store/useAccountStore";
import BankLogo from "../../../assets/BankLogo";

type AccountDetailsProps = {
  account: AccountData;
};

const AccountDetails: React.FC<AccountDetailsProps> = ({ account }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bankContainer}>
        <View style={styles.bankLogo}>
          <BankLogo />
        </View>
        <Text style={styles.bankName}>Kuda Bank</Text>
      </View>

      <View style={styles.accountDetailsCard}>
        <View style={styles.accountDetailRow}>
          <Text style={styles.accountLabel}>Type of account</Text>
          <Text style={styles.accountValue}>Savings</Text>
        </View>

        <View style={styles.accountDetailRow}>
          <Text style={styles.accountLabel}>Account No</Text>
          <Text style={styles.accountValue}>{account.accountType}</Text>
        </View>

        <View style={styles.accountDetailRow}>
          <Text style={styles.accountLabel}>Available Balance</Text>
          <Text style={[styles.accountValue, styles.balanceText]}>
            {account.currency}
            {formatCurrency(account.availableBalance)}.00
          </Text>
        </View>

        <View style={styles.accountDetailRow}>
          <Text style={styles.accountLabel}>Date added</Text>
          <Text style={styles.accountValue}>{account.dateAdded}</Text>
        </View>
      </View>

      <View style={styles.transactionsContainer}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          <Ionicons name="chevron-forward" size={16} color="#333" />
        </View>

        {account.transactions.map((transaction, index) => (
          <View key={index} style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <View style={styles.transactionAvatar}>
                <Text style={styles.avatarText}>
                  {getInitialLetter(transaction.name)}
                </Text>
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionName}>{transaction.name}</Text>
                <Text style={styles.transactionBank}>
                  {transaction.bank} {transaction.time}
                </Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.amount > 0
                    ? styles.positiveAmount
                    : styles.negativeAmount,
                ]}
              >
                {formatTransactionAmount(account.currency, transaction.amount)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  bankContainer: {
    alignItems: "center",
    marginTop: 28,
    marginBottom: 40,
  },
  bankLogo: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  bankLogoText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  bankName: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 17,
  },
  accountDetailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,

    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  accountDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  accountLabel: {
    fontSize: 14,
    color: "#6C727F",
  },
  accountValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#131313",
  },
  balanceText: {
    fontSize: 14,
    color: "#009218",
    fontWeight: "500",
  },
  transactionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  transactionsTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#131313",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "#F5F7FF",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C14DD",
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  transactionBank: {
    fontSize: 14,
    color: "#6C727F",
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "500",
  },
  positiveAmount: {
    color: "#009218",
  },
  negativeAmount: {
    color: "#333",
  },
});

export default AccountDetails;
