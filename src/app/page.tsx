import CatetgoryWiseProducts from "@/components/CatetgoryWiseProducts";
import ProductCarousel from "@/components/ProductCarousel";

export default function Home() {
  return (
    <main className="">
      <ProductCarousel />
      <CatetgoryWiseProducts category="men's clothing" />
      <CatetgoryWiseProducts category="jewelery" />
      <CatetgoryWiseProducts category="electronics" />
      <CatetgoryWiseProducts category="women's clothing" />
    </main>
  );
}
