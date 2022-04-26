import findAppointment from "core/Query/findAppoinment";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.css";

const Lobby = ({
  handleSubmit,
  connecting,
}: {
  handleSubmit: (e: any) => void;
  connecting: boolean;
}) => {
  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const { loading, appointment } = findAppointment(id as string);
  if (loading) {
    return <h2>Loading....</h2>;
  }
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.cardInformation}>
        <h2>
          {"Bienvenido a saana,"} {appointment?.user?.firstName}
        </h2>
        <div className={styles.separator} />
        <ul className={styles.list}>
          <li>Tu cita es: {appointment?.schedulingDate}</li>
          <li>A las: {appointment?.hour}</li>
          <li>De la especialidad: {appointment?.specialty?.name}</li>
          <li>Con el doctor(a): {appointment?.doctor?.name}</li>
          <li>Nota: Por favor tener a la mano lápiz y papel</li>
        </ul>
        <div className={styles.separator} />
        <div className={styles.footerButton}>
          <button
            className={connecting ? styles.disabledButton : styles.button}
            type="submit"
            disabled={connecting}
          >
            {connecting ? "Conectando" : "Iniciar"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Lobby;
