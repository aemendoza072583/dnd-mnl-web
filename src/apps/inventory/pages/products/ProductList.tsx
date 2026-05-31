import PageMeta from "@/shared/components/common/PageMeta";
import ProductListTable from "@/apps/inventory/components/ProductListTable";

export default function ProductList() {
  const pageTitle = "Product";

  return (
    <>
      <PageMeta title={`${import.meta.env.VITE_COMPANY_NAME} | ${pageTitle}`}/>
      <ProductListTable />
    </>
  );
}
