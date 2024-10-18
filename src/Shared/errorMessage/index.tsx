import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { FC } from "react";

const ErrorMessageBox = styled(Box)(
  () => `
    color: var(--zs-errorRed);
    height: 25px;
    font-size: 12px;
    `
);

type ErrorMessageProps = {
  message: string | null;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return <ErrorMessageBox>{message}</ErrorMessageBox>;
};
