import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  formatCurrency,
  formatTransactionAmount,
  getInitialLetter,
} from "../../../helpers";

import { AccountData, Transaction } from "../../../store/useAccountStore";
import { COLORS } from "../../../shared/constants";
import BankLogo from "../../../assets/BankLogo";

type AccountDetailsProps = {
  account: AccountData;
};

const AccountDetails: React.FC<AccountDetailsProps> = ({ account }) => {
  const renderTransactionItem = (transaction: Transaction, index: number) => {
    const isLast = index === account.transactions.length - 1;

    return (
      <View
        key={index}
        style={[styles.transactionItem, isLast && styles.noBorder]}
      >
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
    );
  };

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
          <Ionicons
            name="chevron-forward"
            size={16}
            color={COLORS.TEXT_PRIMARY}
          />
        </View>

        {account.transactions.map(renderTransactionItem)}
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
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,

    marginBottom: 24,
    shadowColor: COLORS.SHADOW_COLOR,
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
    color: COLORS.SECONDARY,
  },
  accountValue: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  balanceText: {
    fontSize: 14,
    color: COLORS.SUCCESS,
    fontWeight: "500",
  },
  transactionsContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: COLORS.SHADOW_COLOR,
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
    borderBottomColor: COLORS.BORDER_LIGHT,
  },
  transactionsTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LIGHT,
  },
  noBorder: {
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
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
    backgroundColor: COLORS.BACKGROUND_PAPER,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
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
    color: COLORS.SECONDARY,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "500",
  },
  positiveAmount: {
    color: COLORS.SUCCESS,
  },
  negativeAmount: {
    color: COLORS.TEXT_PRIMARY,
  },
});

export default AccountDetails;
