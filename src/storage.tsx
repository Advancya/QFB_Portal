import React from "react";

import CustomHeader from "./components/header/CustomHeader";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import AppBox from "./components/AppBox";
import ProductsAndOffers from "./components/ProductsAndOffers/ProductsAndOffersLanding";
import ContactUsLanding from "./components/ContactUs/ContactUsLanding";

import "./translations/i18n";

export function setStorage(key: any, value: any) {
  localStorage.setItem(key, value);
}

export function getStorage(key: any) {
  const defaults: any = {
    theme: "bootstrap",
    language: "en",
  };

  const defaultValue = defaults[key] || null;

  const itemValue = localStorage.getItem(key);
  if (itemValue == null && defaultValue != null) {
    localStorage.setItem(key, defaultValue);
    return defaultValue;
  }

  return itemValue;
}
