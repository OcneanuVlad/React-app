import { useState } from "react";
let index = 0;

function ChangeColors() {
  if (index > colorThemes.length - 2) {
    index = 0;
  } else {
    index++;
  }

  document.documentElement.style.setProperty("--main", colorThemes[index].main);
  document.documentElement.style.setProperty("--secondary", colorThemes[index].secondary);
  document.documentElement.style.setProperty("--accent1", colorThemes[index].accent1);
  document.documentElement.style.setProperty("--accent2", colorThemes[index].accent2);
  document.documentElement.style.setProperty("--shadow-color2", colorThemes[index].shadowColor2);
}

const colorThemes = [
  {
    main: "#0c2940",
    secondary: "#163147",
    accent1: "#582133",
    accent2: "#867f91",
    shadowColor2: "#867f91",
  },
  {
    main: "#1f1f1f",
    secondary: "#2d2d2d",
    accent1: "#f56fe3",
    accent2: "#3363e9",
    shadowColor2: "#8563ee",
  },
  {
    main: "#051519",
    secondary: "#0f1e22",
    accent1: "#87301b",
    accent2: "#bf5929",
    shadowColor2: "#bf5929",
  },
  {
    main: "#041113",
    secondary: "#0f1a1d",
    accent1: "#ae3553",
    accent2: "#d39251",
    shadowColor2: "#d39251",
  },
  {
    main: "#4d4c4a",
    secondary: "#545351",
    accent1: "#b89658",
    accent2: "#59c7d5",
    shadowColor2: "#59c7d5",
  },
  {
    main: "#283138",
    secondary: "#393d3f",
    accent1: "#762528",
    accent2: "#edb786",
    shadowColor2: "#edb786",
  },
  {
    main: "#041113",
    secondary: "#0f1a1d",
    accent1: "#e98d94",
    accent2: "#da9e69",
    shadowColor2: "#da9e69",
  },
];

export default ChangeColors;
