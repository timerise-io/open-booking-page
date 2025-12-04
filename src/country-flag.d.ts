declare module "react-country-flag" {
  const ReactCountryFlag: React.ComponentType<{
    countryCode: string;
    svg?: boolean;
    style?: React.CSSProperties;
    title?: string;
    cdnUrl?: string;
    cdnSuffix?: string;
    className?: string;
  }>;
  export default ReactCountryFlag;
}
