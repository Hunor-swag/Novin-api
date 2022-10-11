const express = require("express");

const { db } = require("../util/admin");

exports.bills = async (req, res) => {
  try {
    // get bills from firestore database
    const snapshot = await db.collection("Bills").get();
    const list = snapshot.docs.map((doc) => doc.data());
    return res.status(200).json(list);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Invalid Credentials");
  }
};
