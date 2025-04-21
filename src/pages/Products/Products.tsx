import { useQuery } from "react-query";

import { Link } from "react-router-dom";
import { ServerTypes } from "../../components/servertypes/serverTypes";
import { dataProducts } from "../../components/services/api";
import ProductItems from "../../components/ProductItem/ProductItems";

function Products() {
  const { data, isError, isLoading } = useQuery<ServerTypes[]>({
    queryKey: ["prosucts"],
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
  return (
    <div>
      <div className="flex flex-wrap justify-around gap-7 mt-20">
        {data?.map((item) => (
          <div key={item.id}>
            <Link to={`/products/productDetail/${item.id}`}>
              <ProductItems {...item} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
