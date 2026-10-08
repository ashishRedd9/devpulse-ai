export const SAMPLES = {
  java: {
    name: 'Java - UserAuth & OrderProcessor',
    code: `package com.devpulse.service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OrderService {
    private static final String DB_SECRET = "sk_live_99481ad8f74a019b84a"; // Security Flaw: Hardcoded Secret

    // OWASP Flaw: Vulnerable SQL Injection
    public List<String> getUserOrders(String userId) throws Exception {
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/shopdb", "root", "admin123");
        Statement stmt = conn.createStatement();
        // Danger: Direct String Concatenation!
        String query = "SELECT order_id, amount FROM orders WHERE user_id = '" + userId + "'";
        ResultSet rs = stmt.executeQuery(query);
        
        List<String> orders = new ArrayList<>();
        while (rs.next()) {
            orders.add(rs.getString("order_id"));
        }
        return orders;
    }

    // Performance Issue: O(N^2) inefficient nested lookup
    public boolean checkDuplicateItems(List<String> items) {
        for (int i = 0; i < items.size(); i++) {
            for (int j = 0; j < items.size(); j++) {
                if (i != j && items.get(i).equalsIgnoreCase(items.get(j))) {
                    return true; // Duplicate found
                }
            }
        }
        return false;
    }
}`
  },

  python: {
    name: 'Python - Data Pipeline & Recursive Compute',
    code: `# DevPulse AI Analysis Target: Data Ingestion & Analytics Pipeline

import os
import sqlite3

AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE" # Vulnerability: Exposed Secret Key

# Security Vulnerability: Raw string query execution
def fetch_user_profile(user_input):
    conn = sqlite3.connect("app.db")
    cursor = conn.cursor()
    # Flaw: SQL Injection Risk
    query = f"SELECT * FROM users WHERE username = '{user_input}'"
    cursor.execute(query)
    return cursor.fetchall()

# Algorithmic Complexity Bottleneck: Exponential O(2^N) Recursion
def calculate_fibonacci_risk(n):
    if n <= 1:
        return n
    # Un-memoized recursive Fibonacci calls lead to call stack overflow for large N
    return calculate_fibonacci_risk(n - 1) + calculate_fibonacci_risk(n - 2)

def process_large_dataset(records):
    duplicates = []
    # O(N^3) Nested Loop Complexity
    for i in range(len(records)):
        for j in range(len(records)):
            for k in range(len(records)):
                if i != j and j != k and records[i] == records[j] == records[k]:
                    duplicates.append(records[i])
    return duplicates
`
  },

  javascript: {
    name: 'JavaScript - Express API & Token Handler',
    code: `const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'super-secret-key-12345'; // OWASP Flaw: Hardcoded Secret

// Security Flaw: Evaluates arbitrary code string
router.post('/execute-script', (req, res) => {
  const { userScript } = req.body;
  // Danger: Remote Code Execution (RCE) via eval()
  const result = eval(userScript);
  res.json({ output: result });
});

// Performance Bottleneck: Blocking sync file read inside request handler
const fs = require('fs');
router.get('/metrics', (req, res) => {
  // Flaw: Synchronous I/O blocks Node.js Event Loop!
  const data = fs.readFileSync('/var/log/audit.log', 'utf8');
  res.send(data);
});

module.exports = router;
`
  },

  cpp: {
    name: 'C++ - Memory Allocator & Buffer Operations',
    code: `#include <iostream>
#include <cstring>

class BufferManager {
private:
    char* dataBuffer;
public:
    BufferManager(int size) {
        // Flaw: Potential memory leak if destructor missing or exception thrown
        dataBuffer = new char[size];
    }

    // Security Vulnerability: Buffer Overflow via strcpy
    void copyUserInput(const char* input) {
        // Dangerous! No bound checking on input length
        strcpy(dataBuffer, input);
    }

    // Algorithmic Bottleneck: Unnecessary array copy in O(N^2) loop
    void processMatrix(int n) {
        int** matrix = new int*[n];
        for (int i = 0; i < n; i++) {
            matrix[i] = new int[n];
            for (int j = 0; j < n; j++) {
                for (int k = 0; k < n; k++) {
                    matrix[i][j] += (i * j * k); // O(N^3) time complexity
                }
            }
        }
    }
};
`
  }
};
