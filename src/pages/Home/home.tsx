import { useQuery } from "react-query";
import { ServerTypes } from "../../components/servertypes/serverTypes";
import { dataProducts } from "../../components/services/api";
import ProductBanner from "../../components/ProductBanner/ProductBanner";

function Home() {
  const { data, isLoading, isError } = useQuery<ServerTypes[]>({
    queryKey: ["products"],
    queryFn: dataProducts,
  });

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin inline-block h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-600">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p>Please try again later</p>
      </div>
    );
  }
  const featuredProducts = data.slice(0, 8);

  return (
    <div className="p-4 mt-20 flex flex-col justify-center ">
      <ProductBanner products={featuredProducts} />
    </div>
  );
}

export default Home;
