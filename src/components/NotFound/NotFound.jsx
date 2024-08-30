import React from 'react';
import classes from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={`${classes.notFoundContaine} h-screen flex items-center justify-center flex-col`}>
      <i class="fa-solid fa-triangle-exclamation text-red-600 fa-4x text-end"></i>
      <h1 className={classes.heading}>404</h1>
      <p className={classes.description}>Oops! The page you're looking for doesn't exist.</p>
    </div>
  );
}