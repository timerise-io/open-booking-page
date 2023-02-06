import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface StyledLabelProps {
  htmlFor?: string;
  children: any;
}

const Label = styled.label`
  margin-bottom: calc(0.5 * ${({ theme }) => theme.spacing});
  font-size: ${({ theme }) => theme.typography.label.size};
  font-weight: ${({ theme }) => theme.typography.label.weight};
  line-height: ${({ theme }) => theme.typography.label.lineHeight};
  color: ${({ theme }) => theme.colors.dark};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  width: 0;
  min-width: 100%;
`;

const StyledLabel: React.FC<StyledLabelProps> = ({
  htmlFor,
  children,
}) => {
  const labelRef = useRef() as React.MutableRefObject<HTMLLabelElement>;
  const [isEllipsis, setIsEllipsis] = useState(false);

  useEffect(() => {
    const hasEllipsis = labelRef.current.offsetWidth < labelRef.current.scrollWidth;

    setIsEllipsis(hasEllipsis);
  }, [htmlFor, children]);

  return (
    <Label htmlFor={htmlFor} ref={labelRef} title={isEllipsis ? children : null}>{children}</Label>
  )
};

export default StyledLabel;
