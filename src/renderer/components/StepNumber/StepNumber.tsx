import styled from "@emotion/styled";

interface StepNumberProperties {
  number: number;
}

const StepNumberWrapper = styled.div`
  font-size: 82px;
  background: linear-gradient(to left, #22577a, #38a3a5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StepNumber = ({ number }: StepNumberProperties) => {
  return <StepNumberWrapper>{number}.</StepNumberWrapper>;
};

export default StepNumber;
