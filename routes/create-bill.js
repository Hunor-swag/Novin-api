const express = require("express");

const { db } = require("../util/admin");

exports.create_bill = async (req, res) => {
  //add new bill to firestore database
  try {
    const {
      customer_name,
      date_of_issue,
      due_date,
      item_name,
      comment,
      price,
    } = req.body;

    if (
      !(
        customer_name &&
        date_of_issue &&
        due_date &&
        item_name &&
        comment &&
        price
      )
    ) {
      return res.status(400).send("All input is required");
    }

    const bill = {
      customer_name: customer_name,
      date_of_issue: date_of_issue,
      due_date: due_date,
      item_name: item_name,
      comment: comment,
      price: price,
    };

    await db.collection("Bills").doc(customer_name).set(bill);

    return res.status(200).json(bill);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Invalid Credentials");
  }
};
