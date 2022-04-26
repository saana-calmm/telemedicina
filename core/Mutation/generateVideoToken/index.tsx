/* eslint-disable react-hooks/rules-of-hooks */
import { gql, useMutation } from "@apollo/client";
import React from "react";

export const SCHEMA = gql`
  mutation CreateRoomVideoCall($input: inputCreateRoom!) {
    createRoomVideoCall(input: $input) {
      token
    }
  }
`;

const generateVideoToken = () => {
  const [generateTokenRoom, { loading, reset }] = useMutation(SCHEMA);

  return {
    loading,
    generateTokenRoom,
  };
};

export default generateVideoToken;
