// components/Toast.tsx
import React, { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import styles from "./Notify.module.css";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case "success":
        return "Success";
      case "error":
        return "Error";
      case "info":
        return "Information";
      default:
        return "Information";
    }
  };

  const borderColor = type === "success" ? "border-green-500" : type === "error" ? "border-red-500" : "border-yellow-500"

  return (
    <div className={`${styles.notify} ${styles[`notify__${type}`]} border-l-4 ${borderColor}`}>
      <div className={styles.notify__icon} >
        {getIcon()}
      </div>
      <div className={styles.notify__content}>
        <h4 className={styles.notify__title}>{getTitle()}</h4>
        <p className={styles.notify__message}>{message}</p>
      </div>
      <button className={styles.notify__close} onClick={onClose}>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
