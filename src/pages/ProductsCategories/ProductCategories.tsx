import { Link, useParams } from "react-router-dom";
import { dataProducts } from "../../components/services/api";
import { ServerTypes } from "../../components/servertypes/serverTypes";
import { useQuery } from "react-query";

const ProductCategories = () => {
  const { category } = useParams<{ category: string }>();

  const { data, isLoading, isError } = useQuery<ServerTypes[]>({
    queryKey: ["products", category], 
    queryFn: async () => {
      const products = await dataProducts();
      return products.filter((p: ServerTypes) => p.category === category);
    },
    staleTime: 5 * 60 * 1000, 
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
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold text-center mb-10 capitalize">
        {category || "Products"}
      </h1>
      <div className="flex flex-wrap justify-around gap-6 space-y-10">
        {data?.map((item) => (
          <Link
            key={item.id}
            to={`/products/productDetail/${item.id}`}
            className="border rounded-lg  shadow-md hover:shadow-lg  w-64 hover:scale-105 transition-transform"
            aria-label={`View ${item.title}`}
          >
            <img
              className="w-full h-64 object-cover"
              src={item.image}
              alt={`${item.title} image`}
              loading="lazy"
            />
            <div className="p-4 text-center">
              <h2 className="font-semibold text-lg line-clamp-2">
                {item.title}
              </h2>
              <p className="text-gray-600 mt-2">${item.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductCategories;
