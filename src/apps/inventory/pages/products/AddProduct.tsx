import PageMeta from "@/shared/components/common/PageMeta";
import AddProductForm from "@/apps/inventory/components/AddProductForm";

export default function AddProduct() {
  const pageTitle = "Add Product";

  return (
    <>
      <PageMeta title={`${import.meta.env.VITE_COMPANY_NAME} | ${pageTitle}`}/>
      <AddProductForm />
    </>
  );
}
