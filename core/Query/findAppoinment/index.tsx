/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, gql } from "@apollo/client";

export const SCHEMA = gql`
  query AppointmentByIdMeet($appointmentByIdMeetId: ID!) {
    appointmentByIdMeet(id: $appointmentByIdMeetId) {
      _id
      schedulingDate
      hour
      hourFinish
      meetDoctor
      meetUser
      specialty {
        name
      }
      doctor {
        img_url
        name
      }
      user {
        firstName
      }
    }
  }
`;

interface AppointmentUI {
  _id: string;
  schedulingDate: string;
  hour: string;
  hourFinish: string;
  meetDoctor: string;
  meetUser: string;
  specialty: {
    name: string;
  };
  doctor: {
    img_url: string;
    name: string;
  };
  user: {
    firstName: string;
  };
}
interface Response {
  loading: boolean;
  appointment: AppointmentUI;
}
const findAppointment = (id: string): Response => {
  const { loading, data } = useQuery(SCHEMA, {
    variables: {
      appointmentByIdMeetId: id,
    },
    skip: !id,
  });
  return {
    loading,
    appointment: data?.appointmentByIdMeet,
  };
};

export default findAppointment;
