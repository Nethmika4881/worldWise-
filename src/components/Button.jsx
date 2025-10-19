import styles from "./Button.module.css";
function Button({ children, handleClick, type }) {
  return (
    <button onClick={handleClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
