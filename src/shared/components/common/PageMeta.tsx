import { Helmet, HelmetProvider } from "react-helmet-async";

const PageMeta = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description || import.meta.env.VITE_COMPANY_ADDRESS} />
  </Helmet>
);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;
