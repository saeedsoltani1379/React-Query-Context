import { Link } from "react-router-dom";
import { Tcategories } from "../../components/servertypes/serverTypes";
import { dataCategory } from "../../components/services/api";
import { useQuery } from "react-query";

const Categories = () => {
  const { data, isLoading, isError } = useQuery<Tcategories[]>({
    queryKey: ["categories"],
    queryFn: dataCategory,
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
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold text-center mb-10">Categories</h1>
      <div className="flex flex-wrap justify-around gap-28">
        {data?.map((item) => (
          <Link
            key={item.id}
            to={`/category/${item.category}`}
            className="border rounded-lg  shadow-md hover:shadow-2xl hover:scale-110 transition-shadow  w-64 "
          >
            <img
              className="w-full h-64 object-cover"
              src={item.image}
              alt={`${item.category} image`}
              loading="lazy"
            />
            <h2 className="text-center p-4 font-semibold">{item.category}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
